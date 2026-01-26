
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

        if (!filmsData || filmsData.length === 0) {
            return res.status(200).json([]);
        }
        return res.status(200).json(filmsData);
    } catch (err) {
        return catchError(res, err)
    }
}