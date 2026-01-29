import { User } from '../models/user.mjs';
import jwt from 'jsonwebtoken';
import { hash, verify } from 'argon2';

// Vérifie qu'on a bien un secret pour JWT
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

/** Crée un token JWT */
const generateToken = (user) => {
    return jwt.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
};

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: decoded.userId,
      role: decoded.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

/** Inscription */
export const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // SUPPRIMER hash(password)
        const user = await User.create({
            email,
            password, 
            firstName: firstName || '',
            lastName: lastName || '',
            role: 'visitor',
            isActive: true
        });

        res.status(201).json({ message: 'Inscription réussie' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: 'Email et mot de passe requis' });

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

        const validPassword = await verify(user.password, password);
        if (!validPassword) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

        // génère le token
        const token = generateToken(user);


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        res.json({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

/** Récupérer l'utilisateur connecté */
// export const getCurrentUser = async (req, res) => {
//     try {
//         const userId = req.user?.id;
//         if (!userId) return res.status(401).json({ message: 'Non authentifié' });

//         const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
//         if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

//         res.status(200).json({ user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// export const updateProfile = async (req, res) => {
//     try {
//         const userId = req.user?.id;
//         if (!userId) return res.status(401).json({ message: 'Non authentifié' });

//         const user = await User.findByPk(userId);
//         if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

//         const { firstName, lastName } = req.body;
//         if (firstName !== undefined) user.firstName = firstName;
//         if (lastName !== undefined) user.lastName = lastName;

//         await user.save();

//         const cleanUser = user.toJSON();
//         delete cleanUser.password;

//         res.status(200).json({ message: 'Profil mis à jour', user: cleanUser });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: 'Déconnexion réussie' });
};



