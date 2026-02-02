// routes/playlists.routes.js
import express from 'express';
import { getPlaylistsByStatus } from '../controllers/playlists.controller.js';

const router = express.Router();

router.get('/playlists/:status', getPlaylistsByStatus);

export default router;
