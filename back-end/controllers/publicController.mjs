import { Op } from "sequelize";
import sequelize from "../config/database.mjs"; 

// Imports des Modèles
import Film from "../models/Films.mjs";
import User from "../models/User.mjs";
import Vote from "../models/Vote.mjs"; 
import Subscriber from "../models/Subscriber.mjs";
import SiteContent from "../models/SiteContent.mjs";

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
          as: 'director', // Assure-toi que l'alias dans Film.belongsTo(User, { as: 'director' }) correspond
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

    const film = await Film.findByPk(parseInt(id), {
      include: [
        {
          model: User,
          as: 'director',
          attributes: ['id', 'firstName', 'lastName', 'bio', 'school', 'email'] // Email peut-être sensible en public ?
        },
        // Décommente si tu as un modèle Vote
        /*
        {
          model: Vote,
          as: 'evaluations',
          attributes: ['score', 'verdict', 'comment'],
          include: [{
            model: User,
            as: 'evaluator',
            attributes: ['firstName', 'lastName']
          }]
        }
        */
      ]
    });

    if (!film) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }

    // Vérifier les permissions (Si le film n'est pas public)
    const publicStatuses = ['approved', 'selected', 'finalist', 'winner'];
    
    if (!publicStatuses.includes(film.status)) {
      // Si l'utilisateur n'est pas admin (req.user vient d'un middleware auth optionnel)
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès refusé' });
      }
    }

    // Incrémenter les vues
    // Attention: viewCount doit exister dans ton modèle Film
    if (film.viewCount !== undefined) {
        film.viewCount = (film.viewCount || 0) + 1;
        await film.save();
    }

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

    res.status(201).json({
      success: true,
      message: 'Abonnement réussi',
      subscriber
    });

  } catch (error) {
    console.error('subscribeNewsletter error:', error);
    res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Subscription failed'
    });
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