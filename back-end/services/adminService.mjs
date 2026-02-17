import User from "../models/User.mjs";
import Film from "../models/Films.mjs";
import Selection from "../models/Selection.mjs";
import Workshop from "../models/Workshop.mjs"; // Import ajouté
import { Sequelize, Op } from "sequelize"; 

const fetchDashboardStats = async () => {
  // Calcul des nouveaux inscrits du jour
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const newUsersToday = await User.count({
    where: {
      createdAt: {
        [Op.gte]: startOfDay,
      },
    },
  });

  // Statistiques Utilisateurs
  const totalUsers = await User.count();
  const activeUsers = await User.count({ where: { isActive: true } });

  // pour linstant jai mis sa en attente
  const finishedJuries = await User.count({ 
    where: { role: 'committee', isActive: true } 
  });

  // Statistiques Films & Sélections
  const totalFilms = await Film.count();
  const totalSelected = await Selection.count();
  const totalViews = (await Film.sum("views")) || 0;
  const totalShares = (await Film.sum("shares")) || 0;

  // Calcul dynamique du Taux d'occupation Workshop
  const totalInscrits = await Workshop.sum("participants") || 0;
  const totalPlaces = await Workshop.sum("resatotales") || 0;
  
  // Calcul du % global (évite la division par zéro)
  const workshopOccupation = totalPlaces > 0 
    ? Math.round((totalInscrits / totalPlaces) * 100) 
    : 0;

  // Répartitions (Pays & IA)
  const filmsByCountry = await Film.findAll({
    attributes: ["country", [Sequelize.fn("COUNT", Sequelize.col("id")), "count"]],
    group: ["country"],
  });

  const toolsUsage = await Film.findAll({
    attributes: ["generate_Ai", [Sequelize.fn("COUNT", Sequelize.col("generate_Ai")), "count"]],
    group: ["generate_Ai"],
  });

  return {
    totalUsers,
    activeUsers,
    totalFilms,
    totalViews,
    toolsUsage,
    filmsByCountry,
    totalShares,
    totalSelected,
    newUsersToday,
    totalJuries: 12,
    finishedJuries,
    workshopOccupation, 
    totalInscrits,      
    totalPlaces         
  };
};

const fetchAllUsers = async () => {
  return await User.findAll();
};

const fetchAllFilms = async () => {
  return await Film.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

const changeUserRole = async (id, role) => {
  const allowedRoles = ["visitor", "director", "admin", "committee"];

  if (!allowedRoles.includes(role)) {
    throw new Error("Rôle invalide");
  }

  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  user.role = role;
  await user.save();
};

export default {
  fetchDashboardStats,
  fetchAllUsers,
  fetchAllFilms,
  changeUserRole,
};