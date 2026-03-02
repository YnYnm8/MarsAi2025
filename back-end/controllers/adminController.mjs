import adminService from "../services/adminService.mjs";
import User from "../models/User.mjs";
import Film from "../models/Films.mjs";
import {
  notifyFilmApproved,
  notifyFilmRejectedAdmin,
  notifyFilmSelected,
  notifyFilmBanned,
} from "../services/notificationService.mjs";

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
    const userToUpdate = await User.findByPk(id);
    if (!userToUpdate) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }
    if (userToUpdate.role === 'admin' && role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Le rôle Administrateur ne peut pas être retiré."
      });
    }
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
    res.status(500).json({ success: false, message: "Erreur" });
  }
};

// GET /admin/films/selected
export const getSelectedFilms = async (req, res) => {
  try {
    const films = await adminService.fetchSelectedFilms();
    res.json({ success: true, data: films });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /admin/films/rejected
export const getRejectedFilms = async (req, res) => {
  try {
    const films = await adminService.fetchRejectedFilms();
    res.json({ success: true, data: films });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /admin/films/pending
export const getPendingFilms = async (req, res) => {
  try {
    const films = await adminService.fetchFilmsToDiscuss();
    res.json({ success: true, data: films });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /admin/:id/status
export const updateFilmStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { playlistId, reason } = req.body; // ajout de reason 

    // On passe playlistId au service
    const result = await adminService.updateFilmStatus(id, playlistId);

    // Notification au réalisateur selon le nouveau statut -----------------
    try {
      const film = await Film.findByPk(id, { include: [{ model: User }] });
      if (film && film.User) {
        const deps = { models: req.app.locals.models, io: req.app.locals.io };
        if (status === "approved") {
          await notifyFilmApproved({ director: film.User, film, deps });
        } else if (status === "selected") {
          await notifyFilmSelected({ director: film.User, film, deps });
        } else if (status === "rejected") {
          await notifyFilmRejectedAdmin({
            director: film.User,
            film,
            reason: reason || "Votre film ne correspond pas aux critères de sélection.",
            deps,
          });
        } else if (status === "banned") {
          await notifyFilmBanned({ director: film.User, film, deps });
        }
      }
    } catch (notifError) {
      console.error("[adminController] Notification error:", notifError.message);
    }
    // ----------------------------------------------------------------------------

    
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Erreur contrôleur status:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET /admin/playlist/:id
export const getPlaylistDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    const playlist = await adminService.getFilmsByPlaylistId(id);
    
    if (!playlist) {
      return res.status(404).json({ 
        success: false, 
        message: "Playlist non trouvée ou vide" 
      });
    }
    
    res.json({ 
      success: true, 
      data: playlist 
    });

  } catch (error) {
    console.error("Erreur contrôleur playlist:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Erreur serveur", 
      error: error.message 
    });
  }
};