import Film from "../models/Films.mjs";
import User from "../models/User.mjs";
import File from "../models/File.mjs";
import Selection from "../models/Selection.mjs";
import { catchError } from "../helpers/errorHandler.mjs";
import { partialFilmSchema } from "../validators/filmValidator.mjs";


/*
*  GET  /films
* Recuperation des tous les films
*/
export async function getFilms(req, res) {
    try {
        const FilmData = await Film.findAll({
            include: [
                {
                    model: File,
                    as: "Files",
                    attributes: ['id', 'film_url', 'poster_url', 'galerie_url', 'creativeMethodology', 'subtitle', 'outil_Ai']
                },
                {
                    model: User, 
                    attributes: ['firstName', 'lastName', 'country', 'avatar'] 
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        if (FilmData.length == 0) {
            return res.status(200).json({
                message: "Aucun film disponible",
                data: [],
            });
        }
        return res.status(200).json(FilmData);
    } catch (err) {
        return catchError(res, err)
    }
}
/*
 *  GET  /films/:id
 *   Recuperation d'un film par son id
 */
export async function getFilmById(req, res) {
    try {
        const id = Number(req.params.id);

        if (!id || isNaN(id)) {
            return res.status(400).json({
                message: "ID de film invalide",
            });
        }

        const FilmData = await Film.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'Notes',
                    attributes: ['id', 'firstName', 'lastName'],
                    through: { attributes: ['score', 'comment', 'createdAt'] }
                },
                {
                    model: User,
                    as: 'Annotators',
                    attributes: ['id', 'firstName', 'lastName'],
                    through: { attributes: ['content', 'createdAt'] }
                },
                {
                    model: File,
                    attributes: ['id', 'film_url', 'creativeMethodology', 'galerie_url', 'poster_url', 'subtitle', 'outil_Ai']
                }
            ]
        });
        if (!FilmData) {
            return res.status(404).json({
                message: "Film non trouvé",
            });
        }
        return res.status(200).json(FilmData);
    } catch (err) {
        return catchError(res, err)
    }
}
/*
 * GET  /films/select  == /films/select/list
 *  Récupération de tous les films de la table Selection
 */

export async function getFilmsSelect(req, res) {
    try {
        const selectData = await Selection.findAll({
            include: [
                {
                    model: Film,
                    as: 'Films', 
                    required: true, 
                    attributes: ['id', 'userId', 'title', 'collaborateur', 'description',
                        'duration', 'generateAi'],
                    include: [
                        {
                            model: User, 
                            attributes: ['id', 'firstName', 'lastName']
                        },
                        {
                            // poster_url
                            model: File,
                            as: 'Files', 
                            attributes: ['poster_url'],
                            limit: 1 
                        }
                    ]
                }
            ]
        });
        res.status(200).json(selectData);
    } catch (err) {
        console.error("Erreur getFilmsSelect:", err);
        res.status(500).json({ message: err.message });
    }
}
/*
*  POST  /films
*   Creation d'un nouveau film
*/

export async function createFilm(req, res) {
    try {
        const film = await Film.findByPk(req.newFilm.id, {
            include: [{ model: File }],
        });

        return res.status(201).json(film);
    } catch (err) {
        return catchError(res, err);
    }
}

/*
 * PUT  /films/:id
 * Modification d'un film existant
 */
export async function updateFilm(req, res) {
    try {
        const FilmId = parseInt(req.params.id);

        // Vérification que l'ID est valide
        if (!FilmId || isNaN(FilmId)) {
            return res.status(400).json({ message: "Film non trouvé" });
        }

        // Récupération du film avec ses fichiers
        const film = await Film.findByPk(FilmId, { include: File });
        if (!film) {
            return res.status(404).json({ message: "Film non trouvé" });
        }

        // Vérification que seul le réalisateur (auteur) peut modifier
        if (req.user.id !== film.UserId) {
            return res.status(403).json({
                message: "Accès refusé : seul le réalisateur peut modifier ce film"
            });
        }

        // Validation des données entrantes (validation partielle pour les mises à jour)

        const validation = partialFilmSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                errors: validation.error.issues.map(issue => ({
                    field: issue.path.join(".") || "global",
                    message: issue.message
                }))
            });
        }

        // Actualization du film en base de données
        await film.update(validation.data);

        const updatedFilm = await Film.findByPk(film.id, { include: File });
        return res.status(200).json(updatedFilm);

    } catch (err) {
        return catchError(res, err);
    }
}


/**
 * DELETE  /films/:id
 * Suppression d'un film existant
 */

export async function deleteFilm(req, res) {
    try {
        const filmId = parseInt(req.params.id);
        if (!filmId || isNaN(filmId)) {
            return res.status(400).json({ message: "Film non trouvé" });
        }

        const film = await Film.findByPk(filmId);
        if (!film) {
            return res.status(404).json({ message: "Film non trouvé" });
        }

        if (req.user.id !== film.UserId && req.user.role !== "admin") {
            return res.status(403).json({
                message: "Accès refusé : seul l'auteur ou un admin peut supprimer ce film"
            });
        }

        await film.destroy();
        return res.status(200).json({ message: "Film supprimé avec succès" });
    } catch (err) {
        return catchError(res, err);
    }
}

/*
 * GET /films/my-submissions
 * Récupérer les films créés par l'utilisateur connecté
*/

export async function getFilmsByUser(req, res) {
    try {
        const UserId = req.user?.id;

        if (!UserId) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        const FilmData = await Film.findAll({
            where: {
                userId: UserId
            },
            include: [
                {
                    model: File,
                    attributes: ['id', 'creativeMethodology', 'galerie_url', 'film_url', 'poster_url', 'subtitle', 'outil_Ai']
                }
            ],
            order: [['createdAt', 'DESC']]
        })
        if (!FilmData || FilmData.length === 0) {
            return res.status(200).json({
                message: "Vous n'avez aucun film pour le moment",
                data: [],
            });
        }
        return res.status(200).json(FilmData);

    } catch (err) {
        return catchError(res, err)
    }

}

