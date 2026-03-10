import User from "../models/User.mjs";
import Film from "../models/Films.mjs";
// import Selection from "../models/Selection.mjs";
import Workshop from "../models/Workshop.mjs";
import { Sequelize, Op } from "sequelize";
import File from "../models/File.mjs";
import Playlist from "../models/Playlist.mjs";


const fetchDashboardStats = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // Utilisateurs
  const newUsersToday = await User.count({ where: { createdAt: { [Op.gte]: startOfDay } } });
  const totalUsers = await User.count();
  const activeUsers = await User.count({ where: { isActive: true } });
  const finishedJuries = await User.count({ where: { role: 'committee', isActive: true } });

  // Films 
  const totalFilms = await Film.count();
  const totalSelected = await Film.count({ where: { status: 'selected' } });
  const totalRejected = await Film.count({ where: { status: 'rejected' } });
  const totalPending = await Film.count({ where: { status: 'pending' } });
  const totalSubmitted = await Film.count({ where: { status: 'submitted' } });
  
  const totalFilmsRated = await Film.count({
    where: {
        status: { [Op.in]: ['selected', 'rejected', 'pending'] }
    }
});

  const totalViews = (await Film.sum("views")) || 0;
  const totalShares = (await Film.sum("shares")) || 0;

  // outils ia utiliser
  const toolsUsage = await Film.findAll({
    attributes: ["generateAi", [Sequelize.fn("COUNT", Sequelize.col("generateAi")), "count"]],
    group: ["generateAi"],
  });

  // Stats
  const totalInscrits = await Workshop.sum("participants") || 0;
  const totalPlaces = await Workshop.sum("resatotales") || 0;
  const workshopOccupation = totalPlaces > 0 ? Math.round((totalInscrits / totalPlaces) * 100) : 0;

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

  return {
    totalUsers,
    activeUsers,
    totalFilms,
    totalViews,
    filmsByCountry,
    totalShares,
    totalSelected,
    totalRejected,
    totalPending,
    newUsersToday,
    totalJuries: 12,
    finishedJuries,
    workshopOccupation,
    totalInscrits,
    totalPlaces,
    toolsUsage,
    totalFilmsRated,
    totalSubmitted
  };
};


// Uniquement les films validés 
const fetchSelectedFilms = async () => {
  return await Film.findAll({
    where: { status: 'selected' },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email", "country"]
      },

      { model: File }
    ]
  });
};

// Uniquement les films refusés
const fetchRejectedFilms = async () => {
  return await Film.findAll({
    where: { status: 'rejected' },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email", "country"]
      },
      { model: File }
    ],
    order: [["updatedAt", "DESC"]],
  });
};

// Uniquement les films à discuter
const fetchFilmsToDiscuss = async () => {
  return await Film.findAll({
    where: { status: 'pending' },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email", "country"]
      },
      { model: File }
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Recupère tous les films 
const fetchAllFilms = async () => {
  return await Film.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email", "country"]
      },
      { model: File }
    ],
    order: [["createdAt", "DESC"]],
  });
};

// User manageement
const fetchAllUsers = async () => {
  return await User.findAll();
};

const changeUserRole = async (id, role) => {
  const allowedRoles = ["visitor", "director", "admin", "committee"];
  if (!allowedRoles.includes(role)) throw new Error("Rôle invalide");
  const user = await User.findByPk(id);
  if (!user) throw new Error("Utilisateur introuvable");
  user.role = role;
  await user.save();
};

// changer le statut du film
const updateFilmStatus = async (id, playlistId) => {
  const film = await Film.findByPk(id); 
  if (!film) throw new Error("Film introuvable");

  const pId = parseInt(playlistId); 

  if (pId === 2) film.status = 'selected';
  else if (pId === 3) film.status = 'rejected';
  else if (pId === 4) film.status = 'pending';
  else film.status = 'submitted';

  await film.save();
  return film;
};


const getFilmsByPlaylistId = async (playlistId) => {
  try {
    // On cherche la playlist par son ID (souvent la table Playlist ou Category)
    const playlist = await Playlist.findByPk(playlistId, {
      include: [
        {
          model: Film,
          as: 'Films',
          include: [
            { model: File },
            { model: User }
          ]
        }
      ]
    });

    return playlist;
  } catch (error) {
    console.error("Erreur dans adminService.getFilmsByPlaylistId:", error.message);
    throw error;
  }
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
  getFilmsByPlaylistId
};