//Routes
import express from 'express';
import { getFilms, getFilmById, getFilmsSelect, createFilm, updateFilm, deleteFilm, getFilmsByUser } from '../controllers/filmController.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.mjs';
import { uploadFields } from '../middlewares/multerConfig.mjs';
import { validate } from '../validators/validate.mjs';
import { createFilmSchema } from '../validators/filmValidator.mjs';
const router = express.Router();

router.get('/', getFilms); // public
router.get('/select/list', getFilmsSelect); //public
router.get('/:id', getFilmById); //public

router.post('/', authMiddleware, uploadFields,  validate(createFilmSchema), uploadMiddleware, createFilm); //realisateur
router.put('/:id', authMiddleware, uploadFields, updateFilm); // realisateur edit
router.delete('/:id',authMiddleware, deleteFilm); //realisateur / admin

export default router;