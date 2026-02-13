import Workshop from "../models/Workshop.mjs";

/* ========================= */
/* GET ALL WORKSHOPS */
/* ========================= */
export const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.findAll();
    res.status(200).json(workshops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
/*REServations TOTALES*/

export const getResatotales = async (req, res)=>{
  try{
    const workshops=await Workshop.resa();
    res.status(200).json(workshops);
  } catch (error){
    console.error(error);
    res.status(500).json ({message: "erreur réservation"})
  }
}

/*TAUX REMPLISSAGE*/

export const getTaux = async (req,res)=>{
  try{
    const workshops=await Workshop.taux();
    res.status(200).json(workshops);
  } catch (error){

    res.status(500).json ({message: "erreur taux"})
  }

}

/* GET ADMIN WORKSHOPS */

export const getAdminWorkshop = async (req, res) => {
  try {
    const workshops = await Workshop.findAll();
    res.status(200).json(workshops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* ========================= */
/* CREATE WORKSHOP */
/* ========================= */
export const createWorkshop = async (req, res) => {
  try {
    const { title, date, coachName, lieu, participants, subtitle, taux, resatotales } = req.body;

    if (!title || !date || !coachName || !lieu) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    const newWorkshop = await Workshop.create({
      title,
      date,
      coachName,
      lieu,
      participants,
      subtitle,
      taux,
      resatotales,
    });

    res.status(201).json(newWorkshop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur création workshop" });
  }
};

/* ========================= */
/* UPDATE WORKSHOP */
/* ========================= */
export const updateWorkshop = async (req, res) => {
  try {
    const { id } = req.params;

    const workshop = await Workshop.findByPk(id);

    if (!workshop) {
      return res.status(404).json({ message: "Workshop introuvable" });
    }

    await workshop.update(req.body);

    res.status(200).json(workshop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur update workshop" });
  }
};

/* ========================= */
/* DELETE WORKSHOP */
/* ========================= */
export const deleteWorkshop = async (req, res) => {
  try {
    const { id } = req.params;

    const workshop = await Workshop.findByPk(id);

    if (!workshop) {
      return res.status(404).json({ message: "Workshop introuvable" });
    }

    await workshop.destroy();

    res.status(200).json({ message: "Workshop supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur suppression workshop" });
  }
};
