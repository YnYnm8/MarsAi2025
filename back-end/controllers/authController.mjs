import User from "../models/User.mjs";
import Notification from "../models/Notification.mjs"; 
import jwt from "jsonwebtoken";
import { verify } from "argon2";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
};


/** @POST /user/register */

export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // SUPPRIMER hash(password)
    const user = await User.create({
      email,
      password,
      firstName: firstName || "",
      lastName: lastName || "",
      role: "visitor",
      isActive: true,
    });

    res.status(201).json({ message: "Inscription réussie" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


/** @POST /user/login */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Champs requis" });

    const user = await User.findOne({ where: { email } });
    if (!user || !(await verify(user.password, password))) {
      return res.status(400).json({ message: "Identifiants incorrects" });
    }

    const token = generateToken(user);

    // Configuration du cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // True uniquement en HTTPS
      sameSite: "lax",
      maxAge: 3600000 // 1 heure
    });

    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName }
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};



/** @POST /user/logout */

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Déconnexion réussie" });
};


/** @GET /user/me */

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GetCurrentUser error:", error);
    res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch user",
    });
  }
};


/** @PUT /user/profile */

export const updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    const { firstName, lastName, bio, school, socialLinks } = req.body;

    // Mise à jour conditionnelle avec validation
    if (firstName !== undefined && typeof firstName === 'string') {
      user.firstName = firstName.trim().substring(0, 100);
    }
    
    if (lastName !== undefined && typeof lastName === 'string') {
      user.lastName = lastName.trim().substring(0, 100);
    }
    
    if (bio !== undefined) {
      user.bio = bio ? String(bio).substring(0, 500) : null;
    }
    
    if (school !== undefined) {
      user.school = school ? String(school).substring(0, 200) : null;
    }
    
    if (socialLinks !== undefined && typeof socialLinks === 'object') {
      user.socialLinks = JSON.stringify(socialLinks);
    }

    await user.save();

    // Retourner le user nettoyé (sans password)
    const cleanUser = user.toJSON();
    delete cleanUser.password;

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour',
      user: cleanUser
    });

  } catch (error) {
    console.error('UpdateProfile error:', error);
    res.status(500).json({ 
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Profile update failed'
    });
  }
};


/** @GET /notifications */

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      limit: 20 // On limite pour ne pas surcharger
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/** @PATCH /notifications/read-all */

export const markReadAll = async (req, res) => {
  try {
    // 1. On utilise update() pour modifier plusieurs lignes d'un coup
    const [updatedCount] = await Notification.update(
      { isRead: true }, // Ce qu'on veut changer
      { 
        where: { 
          userId: req.user.id, // Uniquement pour l'utilisateur connecté
          isRead: false        // Optionnel : uniquement celles qui ne sont pas encore lues
        } 
      }
    );

    res.json({ 
      success: true,
      message: `${updatedCount} notifications marquées comme lues`,
      updatedCount 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Erreur lors de la mise à jour" 
    });
  }
};