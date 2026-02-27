import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
import Selection from "../models/Selection.mjs";

// POST /selection/confirm
// export async function confirmSelection(req, res) {
//   try {
//     const { userId, year } = req.body;

//     const selectedFilms = await PlaylistFilm.findAll({
//       include: [
//         { model: Playlist, where: { status: "selected", user_id: userId, year: year } },
//         { model: Film }
//       ]
//     });

//     if (!selectedFilms.length) {
//       return res.status(400).json({ message: "Aucun film n'a été sélectionné." });
//     }

//     const selection = await Selection.create({ name: `${year} Official Selection`, year });
//     await selection.addFilms(selectedFilms.map(sf => sf.Film));

//     res.status(201).json(selection);
//   } catch (err) {
//     return catchError(res, err);
//   }
// }

