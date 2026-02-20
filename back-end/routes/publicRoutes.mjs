import express from 'express';
import {
  getFilmsPublic,
  getFilmDetail,
  subscribeNewsletter,
  unsubscribeNewsletter,
  getContent,
} from '../controllers/publicController.mjs';
import { getTopRatedFilms } from '../controllers/publicController.mjs'

const router = express.Router();

// PUBLIC ROUTES
router.get('/films',  getFilmsPublic);
router.get('/films/:id', getFilmDetail);
router.get('/top-rated', getTopRatedFilms);

// NEWSLETTER
router.post('/newsletter/subscribe', subscribeNewsletter);
router.post('/newsletter/unsubscribe', unsubscribeNewsletter);

// CMS CONTENT
router.get('/content/:slug', getContent);
// router.put('/content/:slug', updateContent);


export default router;