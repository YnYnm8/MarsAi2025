
import { Film } from "../models/film.mjs";
// import { Candidature }
// import { User }

const sendErrors = (res, errors, status = 400) => {
    // 500系エラーだけログに出す
    if (status === 500) {
        console.error(errors);
    }

    return res.status(status).json({ errors });
};

function catchError(res, err) {

    if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return sendErrors(res, errors, 400);

    }
    return sendErrors(res, [{ field: "global", message: err.message }], 500);

}


export async function getAllFilms(req, res) {
    try {
        const filmsData = await Film.findAll({
            include: [
                {
                    model: Candidature,
                    attributes: ["id"],

                },
                {
                    model: User,
                    attributes: ["username"]
                }
            ]
        });

        if (!filmsData) {
            return res.status(404).json({ message: "Film introuvable" });
        }

        return res.status(200).json(filmsData);
    } catch (err) {
        return catchError(res, err)
    }
}

export async function getFilmById(req, res) {
    try {
        const filmData = await Film.findByPk(req.params.id, {
            include: [
                {
                    model: Candidature,
                    attributes: ["id"],

                },
                {
                    model: User,
                    attributes: ["username"]
                }
            ]
        });
        if (!filmData) {
            return res.status(200).json({ message: "Film introvable " });
        }
        return res.status(200).json(filmData);
    } catch (err) {
        return catchError(res, err)
    }
}
export async function getFilmsByStatus(req, res) {
    try {
        const { status } = req.params;
        const allowedStatus = ["accepted", "rejected", "to_discuss"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const films = await Film.findAll({
            where: { status },
            include: filmInclude
        });

        return res.status(200).json(films);
    } catch (err) {
        return catchError(res, err);
    }
}