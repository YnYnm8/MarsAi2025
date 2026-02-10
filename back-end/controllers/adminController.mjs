import adminService from "../services/adminService.mjs";
import User from "../models/User.mjs";

// GET /admin/stats
export const getStats = async (req, res) => {
  try {
    const stats = await adminService.fetchDashboardStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// GET /admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.fetchAllUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// PATCH /admin/users/:id/role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) return res.status(400).json({ message: "Role requis" });

    // 1. On récupère l'utilisateur en base pour voir son rôle actuel
    const userToUpdate = await User.findByPk(id);

    if (!userToUpdate) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }

    // Si l'utilisateur est déjà admin, on bloque toute modification vers un autre rôle
    if (userToUpdate.role === 'admin' && role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Le rôle Administrateur ne peut pas être retiré."
      });
    }


    // changement role
    await adminService.changeUserRole(id, role);

    res.json({ success: true, message: `Rôle mis à jour avec succès vers : ${role}` });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllFilms = async (req, res) => {
  try {
    const films = await adminService.fetchAllFilms();
    res.json({ success: true, data: films });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des films" });
  }
};





