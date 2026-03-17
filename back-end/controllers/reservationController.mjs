import Reservation from "../models/reservation.mjs";
import sequelize from "../config/database.mjs";

// récupérer toutes les réservations
export const getResa = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json(reservations);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des réservations" });
  }
};


// insérer une réservation
export const insertResa = async (req, res) => {
  try {

    const { nom, prenom, email, profession } = req.body;

    // vérification des champs
    if (!nom || !prenom || !email || !profession) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires"
      });
    }

    // création dans la base
    const resa = await Reservation.create({
      nom,
      prenom,
      email,
      profession
    });

    console.log("Réservation créée :", resa);

    // réponse au frontend
    res.status(201).json({
      message: "Votre réservation a bien été enregistrée",
      reservation: resa
    });

  } catch (error) {
    console.error("Erreur création réservation :", error);

    res.status(500).json({
      message: "Erreur lors de l'enregistrement de la réservation"
    });
  }
};