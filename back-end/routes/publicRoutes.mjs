import express from 'express';
import {
  getFilmsPublic,
  getFilmDetail,
  discoverFilms,
  getTopRatedFilms,
  searchFilms,
  subscribeNewsletter,
  unsubscribeNewsletter,
  getContent,
  updateContent,
} from '../controllers/publicController.mjs';

const router = express.Router();

// PUBLIC ROUTES
router.get('/films',  getFilmsPublic);
router.get('/films/:id', getFilmDetail);
router.post('/films/search', searchFilms);

// NEWSLETTER
router.post('/newsletter/subscribe', subscribeNewsletter);
router.post('/newsletter/unsubscribe', unsubscribeNewsletter);

// CMS CONTENT
router.get('/content/:slug', getContent);
router.put('/content/:slug', updateContent);


export default router;
