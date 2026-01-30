// // controllers/profileController.mjs
// import User from '../models/user.mjs';

// export const getMyProfile = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id, {
//       attributes: { exclude: ['password'] }
//     });

//     if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };

// export const updateMyProfile = async (req, res) => {
//   try {
//     const { bio, school, socialNetworks } = req.body;

//     const user = await User.findByPk(req.user.id);
//     if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

//     user.bio = bio ?? user.bio;
//     user.school = school ?? user.school;
//     user.socialNetworks = socialNetworks ?? user.socialNetworks;

//     await user.save();

//     res.json(user); // password retiré grâce au toJSON()
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Erreur mise à jour profil" });
//   }
// };




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