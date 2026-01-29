import express from "express";
import User from "../models/user.mjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// SECRET pour JWT
const JWT_SECRET = "secret"; 

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Création utilisateur (password sera hashé via hook)
    const user = await User.create({ email, password, firstName, lastName });

    // Renvoi sans mot de passe
    res.status(201).json({ message: "Utilisateur créé ✅", user: user.toJSON() });

  } catch (err) {
    console.error("Erreur serveur /register :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message, stack: err.stack });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

    const valid = await user.validatePassword(password);
    if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

    // générer JWT
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user }); // user sans password grâce à toJSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// LOGOUT (optionnel, pour JWT côté front)
router.post("/logout", (req, res) => {
  // côté JWT pas besoin de supprimer le token, côté front il suffit de le retirer
  res.json({ message: "Déconnecté ✅" });
});

export default router;


