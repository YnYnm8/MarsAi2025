import jwt from "jsonwebtoken";
import User from "../models/User.mjs";


export const authMiddleware = async (req, res, next) => {
  try {
    // On cherche le token dans les cookies OU dans le header Authorization
    let token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization.slice(7)
        : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Accès non autorisé - aucun token fourni",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    } catch (jwtError) {
      const message =
        jwtError.name === "TokenExpiredError"
          ? "Token expiré"
          : "Token invalide";
      const code =
        jwtError.name === "TokenExpiredError"
          ? "TOKEN_EXPIRED"
          : "INVALID_TOKEN";
      return res.status(401).json({ success: false, message, code });
    }

    if (!decoded.id) {
      return res
        .status(401)
        .json({ success: false, message: "Token invalide - ID absent" });
    }

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password", "isEmailVerified"] },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Utilisateur introuvable" });
    }

    if (!user.isActive) {
      return res
        .status(403)
        .json({ success: false, message: "Compte désactivé" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erreur authentification" });
  }
};

/** Middleware de Rôle (Exemple pour Admin) */
export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. On vérifie si req.user existe (rempli par authMiddleware)
    if (!req.user) {
      return res.status(401).json({ message: "Authentification requise" });
    }

    // 2. On vérifie si le rôle de l'utilisateur est dans la liste autorisée
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Accès refusé. Rôle requis : ${allowedRoles.join(' ou ')}` 
      });
    }

    next();
  };
};
