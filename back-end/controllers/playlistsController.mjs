import { Playlists} from "../models/Playlists.mjs";

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


// controllers/playlists.controller.js
import { Playlists } from '../models/Playlists.mjs';

export async function getPlaylistsByStatus(req, res) {
    try {
        const { status } = req.params;

        const playlists = await Playlists.findAll({
            where: { status }
        });

        res.json(playlists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
