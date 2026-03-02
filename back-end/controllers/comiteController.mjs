import Playlist from "../models/Playlist.mjs";
import PlaylistFilm from "../models/PlaylistFilm.mjs";
import Film from "../models/Films.mjs";
import Note from "../models/Note.mjs";
import { catchError } from "../helpers/errorHandler.mjs";
import Selection from "../models/Selection.mjs";
import { notifyFilmNotSelected } from "../services/notificationService.mjs";
import User from "../models/User.mjs";

//  POST /comite/select
// 公式セレクションに選ばれた映画の限定リスト。（選考済み作品）
// ACCEPTEDに登録されると自動で登録される

export async function getAllOfficialSelection(req, res) {
  try {
    const { UserId } = req.body;
    if (!UserId) {
      return res.status(401).json({ message: "ユーザーが認証されていません" });
    }

    const selectedPlaylistId = 2; // ACCEPTED
    const selectedFilms = await PlaylistFilm.findAll({
      where: { UserId, PlaylistId: selectedPlaylistId },
      include: [{ model: Film }],
      order: [["createdAt", "DESC"]],
    });

    if (!selectedFilms.length) {
      return res.status(404).json({ message: "公式セレクションが存在しません" });
    }

    // Selection に登録
    const selectionData = selectedFilms.map((pf) => ({
      FilmId: pf.Film.id,
      UserId,
    }));

    const savedSelections = await Selection.bulkCreate(selectionData, {
      ignoreDuplicates: true, // 既存の場合は無視
    });

    return res.status(200).json({
      message: "公式セレクションを登録しました",
      selections: savedSelections,
    });
  } catch (err) {
    return catchError(res, err);
  }
}
export async function reviewFilm(req, res) {
  try {
    const { UserId, score, comment, status } = req.body;
    const { FilmId } = req.params;

    const film = await Film.findByPk(FilmId, { include: [{ model: User }] });
    if (!film) {
      return res.status(404).json({ message: "映画が存在しません" });
    }
    if (!score || score < 1) {
      return res.status(400).json({
        message: "Score is required and must be >= 1",
      });
    }
    // ① Note を更新または作成
    await Note.upsert({
      UserId,
      FilmId,
      score,
      comment,
    });

    // ② status → PlaylistId に変換
    let PlaylistId;
    if (status === "ACCEPTED") PlaylistId = 2;
    else if (status === "REFUSED") PlaylistId = 3;
    else if (status === "TO_DISCUSS") PlaylistId = 4;
    else PlaylistId = 1;

    // ③ すでに登録されているか確認
    const existing = await PlaylistFilm.findOne({
      where: { FilmId },
    });

    if (existing) {
      // 更新
      await existing.update({ PlaylistId });
    } else {
      // 新規作成
      await PlaylistFilm.create({
        UserId,
        FilmId,
        PlaylistId,
      });
    }
    // Notification si REFUSED -----------------------------------------
    // ⚠️ Pas de notif FILM_SELECTED ici — réservé à PATCH /admin/lock/selection
    if (status === "REFUSED" && film.User) {
      try {
        const deps = { models: req.app.locals.models, io: req.app.locals.io };
        await notifyFilmNotSelected({ director: film.User, film, deps });
      } catch (notifError) {
        console.error("[comiteController] reviewFilm notification error:", notifError.message);
      }
    }
    // ---------------------------------------------------------------------

    return res.json({ message: "レビューとステータスを保存しました" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /comite/allplaylists
// プレイリストを取得するためのもの
export async function getAllPlaylists(req, res) {
  try {
    const playlists = await Playlist.findAll();

    if (!playlists)
      return res.status(404).json({ message: "リストが存在しません" });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//POST /comite/create/playlist
//選考委員が自分のプレイリストを作成するAPI

export async function createPlaylist(req, res) {
  try {
    const { UserId, status, FilmId } = req.body;
    if (!status) {
      return res.status(400).json({ message: "プレイリスト名は必須です" });
    }

    // プレイリストの作成
    const newPlaylist = await Playlist.create({
      UserId,
      status: status,
    });

    return res.status(201).json({
      message: "プレイリストを作成し、フィルムを追加しました",
      playlist: newPlaylist,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// REFUSED映画一覧API
// GET/commite/refused

export async function getAllRefusedFilms(req, res) {
  try {
    // REFUSED プレイリストのIDを取得しておく
    const refusedPlaylistId = 2; // 例えばID=2がREFUSED

    const refusedFilms = await PlaylistFilm.findAll({
      where: { PlaylistId: refusedPlaylistId },
      include: [
        {
          model: Film,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(refusedFilms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// REFUSED映画一覧API
// GET/commite/refused/:userid

export async function getRefusedFilmsById(req, res) {
  const { UserId } = req.param;

  try {
    // REFUSED プレイリストのIDを取得しておく
    const refusedPlaylistId = 2; // 例えばID=2がREFUSED

    const refusedFilms = await PlaylistFilm.findAll({
      where: { PlaylistId: refusedPlaylistId },
      include: [
        {
          model: Film,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(refusedFilms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// POST /comite/note
// 委員会基準ごとの評価（1〜10）および／またはコメントを保存する。

// export async function addNote(req, res) {
//   try {
//     const { UserId, FilmId, score, comment } = req.body;

//     const existsNote = await Note.findOne({ where: { UserId, FilmId } });

//     if (existsNote) {
//       // 更新
//       existsNote.score = score;
//       existsNote.comment = comment;
//       await existsNote.save();
//       return res.json({ message: "評価を更新しました", note: existsNote });
//     }

//     // 新規作成
//     const newNote = await Note.create({ UserId, FilmId, score, comment });
//     res.status(201).json(newNote);
//   } catch (error) {
//     return catchError(res, error);
//   }
// }
export async function addNote(req, res) {
  try {
    const { UserId, FilmId, score, comment } = req.body;

    const existsNote = await Note.findOne({ where: { UserId, FilmId } });

    if (existsNote) {
      // 更新：score が null の場合は変更しない
      if (score !== null && score !== undefined) existsNote.score = score;
      if (comment !== undefined) existsNote.comment = comment;
      await existsNote.save();
      return res.json({ message: "Note mise à jour", note: existsNote });
    }

    // 新規作成
    const newNote = await Note.create({ UserId, FilmId, score, comment });
    res.status(201).json(newNote);

  } catch (error) {
    return catchError(res, error);
  }
}


// プレイリストを削除し中身をTO＿DISCUSSに移動させる
// PATCH/comite/delitestatus

export async function deletePlaylist(req, res) {
  try {
    const { targetPlaylistId } = req.body;

    // ① プレイリストに入っている映画を取得
    const playlistFilms = await PlaylistFilm.findAll({
      where: { PlaylistId: targetPlaylistId },
    });

    // ② 映画がある場合 → TO_DISCUSS(4) に移動
    if (playlistFilms.length > 0) {
      await PlaylistFilm.update(
        { PlaylistId: 4 }, // TO_DISCUSS
        { where: { PlaylistId: targetPlaylistId } }
      );
    }

    // ③ プレイリスト自体を削除
    await Playlist.destroy({
      where: {
        id: targetPlaylistId,
      },
    });

    return res.json({ message: "Playlist deleted successfully" });
  } catch (error) {
    return catchError(res, error);
  }
}
// POST /comite/select/:FilmId
// 映画を公式セレクションに追加
export async function acceptedFilm(req, res) {
  try {
    const { UserId } = req.body;
    const { FilmId } = req.params;

    // // committeeのみ許可
    // const user = await User.findByPk(UserId);
    // if (!user || user.role !== "committee") {
    //   return res.status(403).json({ message: "権限がありません" });
    // }

    const film = await Film.findByPk(FilmId);
    if (!film) return res.status(404).json({ message: "映画が存在しません" });

    // ACCEPTED は PlaylistId = 2 と決め打ち
    const PlaylistId = 2;

    let playlistFilm = await PlaylistFilm.findOne({
      where: { FilmId, UserId },
    });

    if (playlistFilm) {
      playlistFilm.PlaylistId = PlaylistId;
      await playlistFilm.save();
    } else {
      playlistFilm = await PlaylistFilm.create({ FilmId, UserId, PlaylistId });
    }

    return res.json({
      message: "映画を ACCEPTED に更新しました",
      data: playlistFilm,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
// POST /comite/refused/:FilmId // 映画を却下リストに追加
export async function refuseFilm(req, res) {
  console.log("BODY:", req.body);
  // console.log("targetPlaylistId:", targetPlaylistId);
  try {
    const { UserId } = req.body;
    const { FilmId } = req.params;

    // // committeeのみ許可
    // const user = await User.findByPk(UserId);
    // if (!user || user.role !== "committee") {
    //   return res.status(403).json({ message: "権限がありません" });
    // }

    const film = await Film.findByPk(FilmId, { include: [{ model: User }] });
    if (!film) return res.status(404).json({ message: "映画が存在しません" });

    // REFUSED は PlaylistId = 3 と決め打ち
    const PlaylistId = 3;

    let playlistFilm = await PlaylistFilm.findOne({
      where: { FilmId, UserId },
    });

    if (playlistFilm) {
      playlistFilm.PlaylistId = PlaylistId;
      await playlistFilm.save();
    } else {
      playlistFilm = await PlaylistFilm.create({ FilmId, UserId, PlaylistId });
    }

        // Notification refus --------------------------------------------------------
    if (film.User) {
      try {
        const deps = { models: req.app.locals.models, io: req.app.locals.io };
        await notifyFilmNotSelected({ director: film.User, film, deps });
      } catch (notifError) {
        console.error("[comiteController] refuseFilm notification error:", notifError.message);
      }
    }
    // ------------------------------------------------------------------------------

    return res.json({
      message: "映画を REFUSED に更新しました",
      data: playlistFilm,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
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
      await PlaylistFilm.update({ PlaylistId }, { where: { FilmId, UserId } });
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
    const { UserId, FilmId, targetPlaylistId } = req.body;

    if (!UserId || !FilmId || !targetPlaylistId) {
      return res.status(400).json({
        errors: [
          {
            field: "global",
            message: "UserId, FilmId, targetPlaylistId are required",
          },
        ],
      });
    }

    // 🔥 既存の PlaylistFilm を削除（古いステータスをクリア）
    await PlaylistFilm.destroy({
      where: { FilmId, UserId },
    });

    // 新しい Playlist に追加
    const item = await PlaylistFilm.create({
      PlaylistId: targetPlaylistId,
      FilmId,
      UserId,
    });

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

/**
 *  選考委員の映画仕分け履歴取得
 * GET /playlistfilm/sort/history
 */
export async function getComiteSortHistory(req, res) {
  try {
    // const userId = req.user.id; // JWT 前提

    const { UserId } = req.body; // JWT 前提
    const history = await PlaylistFilm.findAll({
      where: { UserId },
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