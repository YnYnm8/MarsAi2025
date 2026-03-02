import User from "../models/User.mjs";
import Film from "../models/Films.mjs";
import Workshop from "../models/Workshop.mjs";
import File from "../models/File.mjs";
import PlaylistFilm from "../models/PlaylistFilm.mjs";
import { Sequelize, Op } from "sequelize";
import Playlist from "../models/Playlist.mjs"


// Mapping des ID de ta table Playlist
const ID = { SELECTED: 2, REJECTED: 3, PENDING: 4 };

const fetchDashboardStats = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // Pour les stats, on compte les lignes dans la table pivot PlaylistFilm
  const [totalSelected, totalRejected, totalPending, totalSubmitted] = await Promise.all([
    PlaylistFilm.count({ where: { PlaylistId: ID.SELECTED } }),
    PlaylistFilm.count({ where: { PlaylistId: ID.REJECTED } }),
    PlaylistFilm.count({ where: { PlaylistId: ID.PENDING } }),
    Film.count({ where: { status: 'submitted' } })
  ]);

  // Autres statistiques
  const newUsersToday = await User.count({ where: { createdAt: { [Op.gte]: startOfDay } } });
  const totalUsers = await User.count();
  const activeUsers = await User.count({ where: { isActive: true } });
  const totalFilms = await Film.count();
  const totalViews = (await Film.sum("views")) || 0;
  const totalShares = (await Film.sum("shares")) || 0;
  const finishedJuries = await User.count({ where: { role: 'committee', isActive: true } });

  // Outils IA
  const toolsUsage = await Film.findAll({
    attributes: ["generateAi", [Sequelize.fn("COUNT", Sequelize.col("generateAi")), "count"]],
    group: ["generateAi"],
  });

  // Répartition par pays
  const filmsByCountry = await Film.findAll({
    attributes: [
      [Sequelize.literal("IFNULL(`User`.`country`, 'Non renseigné')"), "country"],
      [Sequelize.fn("COUNT", Sequelize.col("Film.id")), "count"]
    ],
    include: [{ model: User, attributes: [], required: true }],
    group: [Sequelize.col("User.country")],
    raw: true
  });

  const totalInscrits = await Workshop.sum("participants") || 0;
  const totalPlaces = await Workshop.sum("resatotales") || 0;
  const workshopOccupation = totalPlaces > 0 ? Math.round((totalInscrits / totalPlaces) * 100) : 0;

  return {
    totalUsers, activeUsers, totalFilms, totalViews, totalShares, finishedJuries, filmsByCountry,
    totalSelected, totalRejected, totalPending, totalSubmitted,
    newUsersToday, workshopOccupation, totalInscrits, totalPlaces, toolsUsage
  };
};

// récupère les films liés à une Playlist via PlaylistFilm
export const getFilmsByPlaylistId = async (id) => {
  const playlist = await Playlist.findByPk(id, {
    include: [
      {
        model: Film,
        through: { attributes: [] },
        include: [
          { model: User, attributes: ['firstName', 'lastName'] },
          { model: File }
        ]
      }
    ]
  });

  if (!playlist) return null;

  return {
    id: playlist.id,
    status: playlist.status,
    Films: (playlist.Films || []).map(f => {
      const filmData = f.get({ plain: true });

      // Sequelize peut nommer cette clé 'Files' ou 'files'
      const allFiles = filmData.Files || filmData.files || [];

      let fileName = null;

      if (allFiles.length > 0) {
        const file = allFiles[0];
        // On cherche le nom du fichier dans n'importe quelle colonne possible
        const pathValue = file.path || file.url || file.filename || file.fileName;

        if (pathValue) {
          // On nettoie pour ne garder que le nom du fichier (ex: photo.jpg)
          fileName = pathValue.replace(/\\/g, '/').split('/').pop();
        }
      }

      return {
        id: f.id,
        title: f.title,
        directorName: f.User ? `${f.User.firstName} ${f.User.lastName}` : "Inconnu",
        // L'URL 
        posterUrl: fileName ? `http://localhost:3000/uploads/${fileName}` : null
      };
    })
  };
};


const fetchSelectedFilms = () => getFilmsByStatus(ID.SELECTED);
const fetchRejectedFilms = () => getFilmsByStatus(ID.REJECTED);
const fetchFilmsToDiscuss = () => getFilmsByStatus(ID.PENDING);

const fetchAllFilms = async () => {
  return await Film.findAll({
    include: [
      { model: User, attributes: ["id", "firstName", "lastName", "email", "country"] },
      { model: File }
    ],
    order: [["createdAt", "DESC"]]
  });
};

const updateFilmStatus = async (id, playlistId) => {
  const pId = Number(playlistId);

  const film = await Film.findByPk(id);
  if (!film) throw new Error("Film introuvable");

  //  On associe l'ID au statut exact
  const statusMap = {
    2: 'selected',
    3: 'rejected',
    4: 'pending'
  };

  // On vérifie si l'ID envoyé existe dans notre mapping
  if (!statusMap[pId]) {
    throw new Error(`ID de playlist invalide : ${pId}`);
  }

  // Mise à jour du statut textuel sur le film
  film.status = statusMap[pId];
  await film.save();

  // Mise à jour de la table (PlaylistFilm)
  // On supprime l'appartenance aux autres playlists de décision pour éviter les doublons
  await PlaylistFilm.destroy({
    where: {
      FilmId: id,
      PlaylistId: [2, 3, 4]
    }
  });

  // On crée la nouvelle liaison
  await PlaylistFilm.create({
    FilmId: id,
    PlaylistId: pId
  });

  // Retourner le film avec ses relations pour le front
  return await Film.findByPk(id, {
    include: [
      { model: User, attributes: ["id", "firstName", "lastName", "email", "country"] },
      { model: File }
    ]
  });
};

// Fonctions utilisateurs inchangées
const fetchAllUsers = () => User.findAll();
const changeUserRole = async (id, role) => {
  const allowedRoles = ["visitor", "director", "admin", "committee"];
  if (!allowedRoles.includes(role)) throw new Error("Rôle invalide");
  const user = await User.findByPk(id);
  if (!user) throw new Error("Utilisateur introuvable");
  user.role = role;
  await user.save();
};

export default {
  fetchDashboardStats,
  fetchAllUsers,
  fetchSelectedFilms,
  fetchRejectedFilms,
  fetchFilmsToDiscuss,
  fetchAllFilms,
  changeUserRole,
  updateFilmStatus,
  getFilmsByPlaylistId,
};