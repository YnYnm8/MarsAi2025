import { Op } from "sequelize";
import { Resend } from 'resend';
import sequelize from "../config/database.mjs"; 
import Film from "../models/Films.mjs";
import User from "../models/User.mjs"; 
import Subscriber from "../models/Subscriber.mjs";
// import SiteContent from "../models/SiteContent.mjs";
import FilmShare from "../models/FilmShare.mjs"; 

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * CA 3 : Incrémenter le compteur de partages (Unique par IP et Film)
 */
export const incrementShare = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Récupération de l'adresse IP de l'utilisateur
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const film = await Film.findByPk(id);

    if (!film) {
      return res.status(404).json({ success: false, message: 'Film non trouvé' });
    }

    // On vérifie si ce couple (IP, Film) a déjà partagé
    const existingShare = await FilmShare.findOne({
      where: { filmId: id, ipAddress }
    });

    if (existingShare) {
      // Le CA 3 bloque ici : on renvoie le nombre actuel sans l'incrémenter
      return res.status(200).json({ 
        success: true, 
        message: 'Film déjà partagé par cet utilisateur', 
        shares: film.shares, 
        incremented: false 
      });
    }

    // C'est un nouveau partage pour cette IP : on l'enregistre
    await FilmShare.create({ filmId: id, ipAddress });

    // On incrémente le compteur global du film
    film.shares = (film.shares || 0) + 1;
    await film.save();

    res.status(200).json({ 
      success: true, 
      shares: film.shares, 
      incremented: true 
    });

  } catch (error) {
    console.error('incrementShare error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors du partage' });
  }
};

/**
 * GetFilmsPublic - Récupérer les films publics avec pagination
 * @route GET /api/public/films?page=1&limit=10&search=&iaType=&country=
 */
export const getFilmsPublic = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const search = req.query.search || '';
    const iaType = req.query.iaType || '';
    const country = req.query.country || '';

    const offset = (page - 1) * limit;

    // Filtres de base : on ne veut que les films validés
    const where = {
      status: { [Op.in]: ['approved', 'selected', 'finalist', 'winner'] },
      // isPublished: true // Décommente si tu as une colonne isPublished
    };

    // Recherche texte (Titre FR, EN ou Description)
    if (search && typeof search === 'string') {
      const searchTerm = search.trim().toLowerCase();
      where[Op.or] = [
        sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', `%${searchTerm}%`),
        // Adapte les colonnes selon ton modèle réel (ex: description, etc.)
        sequelize.where(sequelize.fn('LOWER', sequelize.col('description')), 'LIKE', `%${searchTerm}%`)
      ];
    }

    // Filtre type IA
    if (iaType && typeof iaType === 'string') {
      where.iaType = iaType.trim(); // Assure-toi que la colonne s'appelle bien iaType dans ton modèle Film
    }

    // Filtre pays
    if (country && typeof country === 'string') {
      where.country = country.trim();
    }

    // Récupérer les films
    const { count, rows: films } = await Film.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'director',
          attributes: ['id', 'firstName', 'lastName', 'school']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      data: films,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('getFilmsPublic error:', error);
    res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch films'
    });
  }
};

/**
 * GetFilmDetail - Détails complets d'un film
 * @route GET /api/public/films/:id
 */
export const getFilmDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // Validation ID
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'ID film invalide' });
    }

    // 1. D'ABORD, on récupère le film dans la BDD
    const film = await Film.findByPk(parseInt(id), {
      include: [
        {
          model: User,
          as: 'director',
          attributes: ['id', 'firstName', 'lastName', 'bio', 'school', 'email'] 
        }
      ]
    });

    // 2. On vérifie s'il existe
    if (!film) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }

    // 3. Vérifier les permissions (Si le film n'est pas public)
    const publicStatuses = ['approved', 'selected', 'finalist', 'winner'];
    
    if (!publicStatuses.includes(film.status)) {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès refusé' });
      }
    }

    // 4. ENSUITE SEULEMENT, on incrémente les vues

    if (film.views !== undefined) {
        film.views += 1;
        await film.save();
    }

    // 5. On renvoie la réponse
    res.status(200).json({
      success: true,
      film
    });

  } catch (error) {
    console.error('getFilmDetail error:', error);
    res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch film'
    });
  }
};

/**
 * GetTopRatedFilms - Les meilleurs films par vote
 * @route GET /api/public/films/top-rated?limit=10
 * @returns {200} Top rated films
 */
export const getTopRatedFilms = async (req, res) => {
  try {
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));

    const films = await Film.findAll({
      where: {
        status: { [Op.in]: ['approved', 'selected', 'finalist', 'winner'] },
        isPublished: true
      },
      include: [{
        model: User,
        as: 'director',
        attributes: ['id', 'firstName', 'lastName']
      }],
      order: [['averageScore', 'DESC'], ['views', 'DESC']],
      limit
    });

    res.status(200).json({
      success: true,
      data: films
    });

  } catch (error) {
    console.error('getTopRatedFilms error:', error);
    res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch top rated films'
    });
  }
};

/**
 * SubscribeNewsletter - S'abonner à la newsletter
 */
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Email requis' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Format email invalide' });
    }

    // Vérifier si déjà abonné
    const existing = await Subscriber.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Cet email est déjà abonné' });
    }

    // Créer l'abonnement
    const subscriber = await Subscriber.create({
      email,
      isActive: true,
      subscribedAt: new Date()
    });
    // 2. L'envoi de l'email de bienvenue !
    const { data, error } = await resend.emails.send({
      from: 'MARS.A.I <contact@code-colab.com>', 
      to: email, // L'email de la personne qui s'inscrit
      subject: 'Bienvenue dans l\'aventure MARS.A.I !',
      html: `
        <h2>Merci pour ton inscription !</h2>
        <p>Tu recevras bientôt nos dernières actualités sur le cinéma et l'IA.</p>
        <p>it WORKS !!!!!!!!!</p>`
    });

    if (error) {
      console.error("Erreur d'envoi Resend :", error);
    } else {
      console.log(`Email de bienvenue envoyé avec succès : ${data.id}`); 
    }

    res.status(201).json({ success: true, message: "Abonnement réussi" });

  } catch (error) {
    console.error("Erreur Newsletter :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * UnsubscribeNewsletter - Se désabonner de la newsletter
 */
export const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Email requis' });
    }

    const subscriber = await Subscriber.findOne({ where: { email } });
    if (!subscriber) {
      return res.status(404).json({ message: 'Abonnement non trouvé' });
    }

    await subscriber.destroy();

    res.status(200).json({
      success: true,
      message: 'Désabonnement réussi'
    });

  } catch (error) {
    console.error('unsubscribeNewsletter error:', error);
    res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Unsubscription failed'
    });
  }
};

/**
 * GetContent - Récupérer le contenu statique du site
 */
export const getContent = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ message: 'Slug requis' });
    }

    const content = await SiteContent.findByPk(slug.trim());
    if (!content) {
      return res.status(404).json({ message: 'Contenu non trouvé' });
    }

    res.status(200).json({
      success: true,
      content
    });

  } catch (error) {
    console.error('getContent error:', error);
    res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch content'
    });
  }
};