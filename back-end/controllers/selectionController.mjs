import Selection from "../models/Selection.mjs";
import Playlist from "../models/Playlist.mjs";
import PlaylistFilm from "../models/PlaylistFilm.mjs";
import Film from "../models/Films.mjs";
import User from "../models/User.mjs";
import { catchError } from "../helpers/errorHandler.mjs";
import { notifyFilmSelected } from "../services/notificationService.mjs";

// POST /selection/confirm
// export async function confirmSelection(req, res) {
//   try {
//     const { userId, year } = req.body;

    const selectedFilms = await PlaylistFilm.findAll({
      include: [
        { model: Playlist, where: { status: "selected", user_id: userId, year: year } },
        { model: Film, include: [{ model: User }] } 
      ]
    });

//     if (!selectedFilms.length) {
//       return res.status(400).json({ message: "Aucun film n'a été sélectionné." });
//     }

//     const selection = await Selection.create({ name: `${year} Official Selection`, year });
//     await selection.addFilms(selectedFilms.map(sf => sf.Film));

    // --- NOTIFICATIONS DE MASSE AUX GAGNANTS ---
    const deps = { models: req.app.locals.models, io: req.app.locals.io };
    for (const sf of selectedFilms) {
        if (sf.Film && sf.Film.User) {
            try {
                await notifyFilmSelected({ director: sf.Film.User, film: sf.Film, deps });
            } catch (notifError) {
                console.error(`Erreur notification pour le film ${sf.Film.id}:`, notifError);
            }
        }
    }
    // -------------------------------------------

    res.status(201).json(selection);
  } catch (err) {
    return catchError(res, err);
  }
}
