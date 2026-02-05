import Film from "../models/Films.mjs";
import User from "../models/User.mjs";
import File from "../models/File.mjs";
import Selection from "../models/Selection.mjs";
import { catchError } from "../helpers/errorHandler.mjs";

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
                    attributes: ['id', 'film_url', 'poster_url', 'subtitle', 'outil_Ai']
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
                    as: 'Commenters',
                    attributes: ['id', 'firstName', 'lastName'],
                    through: { attributes: ['content', 'createdAt'] }
                },
                {
                    model: User,
                    as: 'Annotators',
                    attributes: ['id', 'firstName', 'lastName'],
                    through: { attributes: ['content', 'createdAt'] }
                },
                {
                    model: File,
                    attributes: ['id', 'film_url', 'poster_url', 'subtitle', 'outil_Ai']
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
/**  
 * GET  /films/select  == /films/select/list
 *  Récupération de tous les films de la table Selection
 */
export async function getFilmsSelect(req, res) {
    try {
        const selectData = await Selection.findAll({
            include: [
                {
                    model: Film,
                    attributes: ['id', 'user_id', 'title', 'collaborateur', 'description',
                        'school', 'country', 'duration', 'title', 'category', 'generate_Ai', 'socialNetworks'],
                    include: [
                        {
                            model: File,
                            attributes: ['id', 'subtitle', 'film_url', 'poster_url']
                        }
                    ]
                }
            ]
        });
        if (!selectData || selectData.length === 0) {
            return res.status(200).json({
                message: "Aucune sélection de films disponible",
                data: []
            });
        }
        return res.status(200).json(selectData);
    } catch (err) {
        return catchError(res, err)
    }
}

/*
*  POST  /films
*   Creation d'un nouveau film
*/

export async function createFilm(req, res) {
    try {
        const { last_name, collaborateur, email, school, country, bio,
            socialNetworks, title, description, duration, category, generate_Ai,
            film_url, poster_url, subtitle, outil_Ai
        } = req.body;

        const newFilm = await Film.create({
            user_id: req.user.id,
            last_name,
            collaborateur,
            email,
            school,
            country,
            bio,
            socialNetworks,
            title,
            description,
            duration: parseFloat(duration),
            category,
            generate_Ai,

        });

        if (film_url || poster_url) {
            await File.create({
                film_id: newFilm.id,
                film_url,
                poster_url,
                subtitle: subtitle || "",
                outil_Ai
            });
        }
        const filmWithFile = await Film.findByPk(newFilm.id, {
            include: [{
                model: File,
                attributes: ['id', 'film_url', 'poster_url', 'subtitle', 'outil_Ai']
            }]
        });
        return res.status(201).json(filmWithFile);
    } catch (err) {
        return catchError(res, err)
    }
}

/*
 * PUT  /films/:id
 * Modification d'un film existant
 */
export async function updateFilm(req, res) {
    try {
        const { collaborateur, email, school, country, bio,
            socialNetworks, title, description, duration, category, generate_Ai,
            film_url, poster_url, subtitle, outil_Ai
        } = req.body;

        const filmId = parseInt(req.params.id);
        const film = await Film.findByPk(filmId, {
            include: File
        });

        if (!filmId || isNaN(filmId)) {
            return res.status(400).json({ message: "Film non trouvé" });
        }


        await film.update(
            collaborateur,
            email,
            school,
            country,
            bio,
            socialNetworks,
            title,
            description,
            duration,
            category,
            generate_Ai,
            { where: { id: filmId } });

        if (film.url || poster_url || subtitle || outil_Ai) {
            await film.File.update({
                film_url,
                poster_url,
                subtitle,
                outil_Ai
            });
        }
        const updatedFilm = await Film.findByPk(film.id, {
            include: File
        });
        return res.status(200).json(updatedFilm);
    } catch (err) {
        return catchError(res, err)
    }

}
/**
 * DELETE  /films/:id
 * Suppression d'un film existant
 */

export async function deleteFilm(req, res) {
    try {
        const filmId = parseInt(req.params.id);
        const film = await Film.findByPk(filmId);

        if (!filmId || isNaN(filmId)) {
            return res.status(400).json({ message: "Film non trouvé" });
        }

        await film.destroy();
        return res.status(200).json({ message: "Film supprimé avec succès" });
    } catch (err) {
        return catchError(res, err)
    }
}

/*
 * GET /films/my-submissions
 * Récupérer les films créés par l'utilisateur connecté
*/

export async function getFilmsByUser(req, res) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        const FilmData = await Film.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: File,
                    attributes: ['id', 'film_url', 'poster_url', 'subtitle', 'outil_Ai']
                }
            ]
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