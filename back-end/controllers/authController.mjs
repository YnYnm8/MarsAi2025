import User from "../models/User.mjs";
import Notification from "../models/Notification.mjs";
import { notify } from "../services/notificationService.mjs";
import Film from "../models/Films.mjs";
import File from "../models/File.mjs";
import jwt from "jsonwebtoken";
import { verify } from "argon2";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// --- UTILITAIRES ---

/**
 * Génère un token JWT valide pour 24h
 */
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "24h",
  });
};

// --- AUTHENTIFICATION (LOGIN / REGISTER / LOGOUT) ---

/** * @POST /register
 * Inscription d'un nouvel utilisateur
 */
export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // 1. Validation basique des champs requis
    if (!email || !password) {
      return res.status(400).json({ message: "ERR_MISSING_CREDENTIALS" });
    }

    // 2. Vérification si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "ERR_EMAIL_EXISTS" });
    }

    // 3. Création de l'utilisateur
    const user = await User.create({
      email,
      password,
      firstName: firstName || "",
      lastName: lastName || "",
      role: "visitor",
      isActive: true,
      country: "France",
    });

    const models = req.app.locals.models;
    const io = req.app.locals.io;

    await notify({
      type: "SYSTEM",
      userId: user.id,
      emailTo: user.email,
      data: {
        title: "Bienvenue sur MarsAI 🎬",
        message: `Bonjour ${user.firstName}, votre compte a bien été créé. Bonne chance pour le festival !`,
      },
      models,
      io,
    });

    res.status(201).json({ message: "SUCCESS_REGISTER" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "ERR_SERVER" });
  }
};

/** * @POST /login
 * Connexion utilisateur et génération du cookie/token
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Recherche de l'utilisateur par email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "ERR_INVALID_CREDENTIALS" });
    }

    // 2. Vérification du mot de passe (via méthode du modèle User qui utilise Argon2)
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "ERR_INVALID_CREDENTIALS" });
    }

    // 3. Vérification si le compte est actif
    if (!user.isActive) {
      return res.status(403).json({ message: "ERR_ACCOUNT_DISABLED" });
    }

    // 4. Mise à jour de la date de dernière connexion
    user.lastLoginAt = new Date();
    await user.save();

    // 5. Génération du token JWT
    const token = generateToken(user);

    // 6. Envoi du token dans un cookie sécurisé (HttpOnly)
    // Cela protège contre les attaques XSS (le JS front ne peut pas lire ce cookie)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS obligatoire en production
      sameSite: "strict", // Protection CSRF
      maxAge: 24 * 60 * 60 * 1000, // 24h
    });

    // 7. Préparation de la réponse (on retire le mot de passe hashé)
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(200).json({
      message: "SUCCESS_LOGIN",
      user: userResponse,
      token, // On renvoie aussi le token si le front veut le stocker autrement (ex: header Authorization)
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "ERR_SERVER" });
  }
};

/** * @POST /logout
 * Déconnexion (Suppression du cookie)
 */
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "SUCCESS_LOGOUT" });
};

// --- GESTION DU PROFIL ---

/** * @PUT /profile
 * Mise à jour du profil utilisateur (Infos textuelles + Avatar)
 * Cette fonction gère aussi l'upload de fichier via Multer (req.files)
 */
export const updateProfile = async (req, res) => {
  try {
    // 1. Vérification de sécurité (req.user est rempli par le middleware authMiddleware)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "ERR_UNAUTHORIZED" });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "ERR_USER_NOT_FOUND" });
    }

    // GESTION DE L'AVATAR (via Multer)
    if (req.files && req.files["avatar"] && req.files["avatar"][0]) {
      const fileName = req.files["avatar"][0].filename;

      user.avatar = `uploads/${fileName}`;
    }

    // AJOUT DES NOUVEAUX RESEAU
    const {
      firstName,
      lastName,
      bio,
      school,
      country,
      instagram,
      youtube,
      linkedin,
      facebook,
      tiktok,
      x,
    } = req.body;

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (bio !== undefined) user.bio = bio;
    if (school !== undefined) user.school = school;
    if (country !== undefined) user.country = country;

    // On récupère les réseaux existants (ou un objet vide par défaut)
    const currentSocials = user.socialNetworks || {};

    // On met à jour l'objet JSON avec les nouvelles valeurs envoyées par le Front
    user.socialNetworks = {
      ...currentSocials,
      instagram: instagram !== undefined ? instagram : currentSocials.instagram,
      youtube: youtube !== undefined ? youtube : currentSocials.youtube,
      linkedin: linkedin !== undefined ? linkedin : currentSocials.linkedin,
      facebook: facebook !== undefined ? facebook : currentSocials.facebook,
      tiktok: tiktok !== undefined ? tiktok : currentSocials.tiktok,
      x: x !== undefined ? x : currentSocials.x,
    };

    await user.save();

    const cleanUser = user.toJSON();
    delete cleanUser.password;

    res.status(200).json({
      success: true,
      message: "SUCCESS_PROFILE_UPDATE",
      user: cleanUser,
    });
  } catch (error) {
    console.error("UpdateProfile error:", error);
    res.status(500).json({ message: "ERR_SERVER_UPDATE" });
  }
};

/** * @GET /me
 * Récupérer les infos de l'utilisateur connecté via son token
 */
export const getCurrentUser = async (req, res) => {
  try {
    // req.user.id vient du middleware d'authentification
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }, // On ne renvoie jamais le mot de passe
    });

    if (!user) return res.status(404).json({ message: "ERR_USER_NOT_FOUND" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("Me Error:", error);
    res.status(500).json({ message: "ERR_SERVER" });
  }
};

/**
 * @GET /my-films
 * Récupère la liste des films soumis par l'utilisateur connecté
 */
export const getMyFilms = async (req, res) => {
  try {
    const currentUserId = req.user?.id;

    if (!currentUserId) {
      return res.status(401).json({ message: "ERR_UNAUTHORIZED" });
    }

    // Requête Sequelize avec Jointure (Include)
    const FilmData = await Film.findAll({
      where: { UserId: currentUserId }, // Filtre par ID utilisateur
      include: [
        {
          model: File, // On joint la table 'File' pour avoir les URLs (poster, vidéo...)
          attributes: [
            "id",
            "film_url",
            "poster_url",
            "galerie_url",
            "creativeMethodology",
            "subtitle",
            "outil_Ai",
          ],
        },
      ],
      order: [["createdAt", "DESC"]], // Les plus récents en premier
    });

    // On retourne un tableau vide [] si aucun film, pour éviter des erreurs côté front
    return res.status(200).json(FilmData || []);
  } catch (err) {
    console.error("Erreur getMyFilms:", err);
    return res.status(500).json({ message: "ERR_SERVER", error: err.message });
  }
};
