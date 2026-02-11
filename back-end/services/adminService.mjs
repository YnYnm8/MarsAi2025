import User from "../models/User.mjs";
import Film from "../models/Films.mjs";
import { Sequelize } from "sequelize";

const fetchDashboardStats = async () => {
  // Nombre total et actifs d’utilisateurs
  const totalUsers = await User.count();
  const activeUsers = await User.count({ where: { isActive: true } });

  // Nombre total de films
  const totalFilms = await Film.count();

  // Nombre total de vues sur tous les films
  const totalViews = (await Film.sum("views")) || 0;
  
  // Répartition par country
  const filmsByCountry = await Film.findAll({
    attributes: ["country", [Sequelize.fn("COUNT", Sequelize.col("id")), "count"]],
    group: ["country"]
  });

  //  sum parcour la table / Si la share vide alors retourne 0
  const totalShares = (await Film.sum("shares")) || 0;

  // Outils IA les plus utilisés (generate_Ai)
  const toolsUsage = await Film.findAll({
    attributes: ["generate_Ai", [Sequelize.fn("COUNT", Sequelize.col("generate_Ai")), "count"]],
    group: ["generate_Ai"]
  });

  return {
    totalUsers,
    activeUsers,
    totalFilms,
    totalViews,
    toolsUsage,
    filmsByCountry,
    totalShares
  };
};

const fetchAllUsers = async () => {
  return await User.findAll();
};

const fetchAllFilms = async () => {
  return await Film.findAll({
    include: [{
      model: User,
      attributes: ['id','firstName', 'lastName', 'email'] 
    }],
    order: [['createdAt', 'DESC']]
  });
};

const changeUserRole = async (id, role) => {
  const allowedRoles = ["visitor","realisator", "admin", "committee"];

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

