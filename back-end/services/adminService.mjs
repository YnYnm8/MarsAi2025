import User from "../models/User.mjs";
import Film from "../models/Films.mjs";
import Selection from "../models/Selection.mjs";
import Workshop from "../models/Workshop.mjs";
import { Sequelize, Op } from "sequelize"; 

const fetchDashboardStats = async () => {
  
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const newUsersToday = await User.count({
    where: { createdAt: { [Op.gte]: startOfDay } },
  });

  const totalUsers = await User.count();
  const activeUsers = await User.count({ where: { isActive: true } });
  const finishedJuries = await User.count({ where: { role: 'committee', isActive: true } });

  const totalFilms = await Film.count();
  const totalSelected = await Selection.count();
  const totalViews = (await Film.sum("views")) || 0;
  const totalShares = (await Film.sum("shares")) || 0;

  const totalInscrits = await Workshop.sum("participants") || 0;
  const totalPlaces = await Workshop.sum("resatotales") || 0;
  const workshopOccupation = totalPlaces > 0 ? Math.round((totalInscrits / totalPlaces) * 100) : 0;

  const filmsByCountry = await Film.findAll({
    attributes: [
      // On récupère le pays de l'utilisateur lié au film
      [Sequelize.literal("IFNULL(`User`.`country`, 'Non renseigné')"), "country"], 
      [Sequelize.fn("COUNT", Sequelize.col("Film.id")), "count"]
    ],
    include: [{
      model: User,
      attributes: [], 
      required: true  // INNER JOIN : on ne compte que les films qui ont un utilisateur
    }],
    group: [Sequelize.col("User.country")], // On groupe par le pays de l'utilisateur
    raw: true // Pour obtenir un tableau d'objets simple
  });

  
  // === Répartition IA ===
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