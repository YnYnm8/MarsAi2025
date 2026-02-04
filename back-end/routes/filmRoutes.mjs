//Routes
import express from 'express';
import { getFilms, getFilmById, getFilmsSelect, createFilm, updateFilm, deleteFilm, getMyFilms } from '../controllers/filmController.mjs';
import { authMiddleware } from '../controllers/authController.mjs';

const router = express.Router();

router.get('/films', getFilms); // public
router.get('/films/:id', getFilmById); //public
router.get('/films/select/list', getFilmsSelect); //public
router.post('/films', authMiddleware, createFilm); //realisateur
router.put('/films/:id', authMiddleware, updateFilm); // realisateur 
router.get('/films/my-submissions', getMyFilms); // realisateur
router.delete('/films/:id', deleteFilm); //realisateur / admin

export default router;