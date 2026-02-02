// seed-playlists.js
import { Playlists } from '../models/playlists.mjs';

export async function playlistSeed() {
    await Playlists.bulkCreate([
        {
            id: 1,
            status: 'accepted'
        },
        {
            id: 2,
            status: 'rejected'
        },
        {
            id: 3,
            status: 'to_discuss'
        },
    ], { ignoreDuplicates: true }); // ignore si déjà insérées
}

