import Playlist from "../models/Playlist.mjs";
import PlaylistFilm from "../models/PlaylistFilm.mjs";
import Film from "../models/Films.mjs";
import Note from "../models/Note.mjs";
import { catchError } from "../helpers/errorHandler.mjs";

//  GET /comite/select
// 公式セレクションに選ばれた映画の限定リスト。（選考済み作品）
export async function getOfficialSelection(req, res) {
  try {
    const userId = req.body.UserId;

    // Playlist の情報だけ取得
    const playlists = await Playlist.findAll({
      where: { UserId, status: "SELECTED" },
      attributes: ["id", "status"],
    });

    res.json(playlists);
  } catch (err) {
    return catchError(res, err);
  }
}

// POST /comite/note
// 委員会基準ごとの評価（1〜10）および／またはコメントを保存する。

export async function addNote(req, res) {
  try {
  //  const UserId = req.user.id; // JWT
  
    const {UserId,FilmId, score, comment } = req.body;
    const exsitsNote = await Note.findOne({
      where: {  UserId, FilmId },
    });
    if (exsitsNote) {
      // 既存の評価がある場合は更新
      exsitsNote.score = score;
      exsitsNote.comment = comment;
      await exsitsNote.save();
      return res.json({
        message: "評価を更新しました",
        note: exsitsNote,
      });
    }
    const newNote = await Note.create({
      UserId,
      FilmId,
      score,
      comment,
    });
    res.json(newNote);
  } catch (error) {
    return catchError(res, error);
  }
}

/**
 * POST /comite/select/:PlaylistId
 * 映画を却下リストに追加 * 映画を公式セレクションに追加
 */
export async function modifyPlaylistStatus(req, res) {
  try {
    const { UserId, FilmId, PlaylistId } = req.body;
    // JWT 前提

    if (!FilmId) {
      return sendErrors(res, [
        { field: "global", message: "Erreur, FilmId manquant" },
      ]);
    }

    const film = await Film.findByPk(FilmId);
    if (!film) {
      return res.status(404).json({ message: "映画が存在しません" });
    }
    const playlist = await Playlist.findByPk(PlaylistId);
    if (!playlist) {
      return sendErrors(res, [
        {
          field: "PlaylistId",
          message: "Playlist introuvable",
        },
      ]);
    }
    // Check si movie déjà ajouté dans la même playlist
    const existsInSamePlaylist = await PlaylistFilm.findOne({
      where: { FilmId, PlaylistId, UserId },
    });
    if (existsInSamePlaylist) {
      return sendErrors(res, [
        {
          field: "global",
          message: "Vous avez déjà ajouté ce film dans cette playlist",
        },
      ]);
    }
    // Check si le film est déjà dans une autre Playlist pour l'utilisateur connecté
    const existsInOtherPlaylist = await PlaylistFilm.findOne({
      where: { FilmId, UserId },
    });

    if (existsInOtherPlaylist) {
      // Si le film existe déjà dans une autre playlist on update la ligne
      await PlaylistFilm.update(
        { PlaylistId },
        { where: { FilmId, UserId } },
      );
      return res.json({
        message: "映画のプレイリストを更新しました",
        filmtitle: film.title,
      });
    }
    // Sinon on crée une nouvelle entrée
    const playlistFilm = await PlaylistFilm.create({
      FilmId,
      PlaylistId,
      UserId,
    });
    return res
      .status(201)
      .json({ message: "Film ajouté à la playlist", data: playlistFilm });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 *  映画をプレイリストに追加
 * POST /comite/film/list
 */
export async function addFilmToPlaylist(req, res) {
  try {
    // const {UserId} = req.user.id; // JWT

    const { UserId, FilmId, PlaylistId } = req.body;

    let targetPlaylistId = PlaylistId;

    // 1️ PlaylistId が指定されていなければ、デフォルトの「検討中」リストを探す
    if (!targetPlaylistId) {
      let playlist = await Playlist.findOne({
        where: {
          UserId,
          play: "TO_DISCUSS",
        },
      });

      // 2️ デフォルト playlist がなければ作成
      if (!playlist) {
        playlist = await Playlist.create({
          UserId,
          PlaylistId: null, // auto-increment
        });
      }

      targetPlaylistId = playlist.id;
    }

    // 3️ PlaylistFilm に追加（重複を防ぐ）
    const [item, created] = await PlaylistFilm.findOrCreate({
      where: {
        PlaylistId: targetPlaylistId,
        FilmId,
        UserId,
      },
    });

    res.status(201).json(item);
  } catch (err) {
    return catchError(res, err);
  }
}
/**
 *  選考委員の映画仕分け履歴取得
 * GET /playlistfilm/sort/history
 */
export async function getComiteSortHistory(req, res) {
  try {
    // const userId = req.user.id; // JWT 前提

    const { UserId } = req.params; // JWT 前提
    const history = await PlaylistFilm.findAll({
      where: { UserId},
      include: [
        {
          model: Playlist,
          attributes: ["id", "status", "year"],
        },
        {
          model: Film,
          attributes: ["id", "title"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(history);
  } catch (err) {
    return catchError(res, err);
  }
}
