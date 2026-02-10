//Routes
import express from 'express';
import { getFilms, getFilmById, getFilmsSelect, createFilm, updateFilm, deleteFilm, getFilmsByUser } from '../controllers/filmController.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.mjs';
import { uploadFields } from '../middlewares/multerConfig.mjs';

const router = express.Router();

router.get('/films', getFilms); // public
router.get('/films/:id', getFilmById); //public
router.get('/films/select/list', getFilmsSelect); //public
router.post('/films', authMiddleware, uploadFields, uploadMiddleware, createFilm); //realisateur
router.put('/films/:id', authMiddleware,  updateFilm); // realisateur 
router.get('/films/my-submissions/list', authMiddleware, getFilmsByUser); // realisateur
router.delete('/films/:id',authMiddleware, deleteFilm); //realisateur / admin

export default router;