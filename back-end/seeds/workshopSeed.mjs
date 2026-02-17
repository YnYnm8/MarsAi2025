
import WorkshopCategory from "../models/WorkshopCategory.mjs";
import Workshop from "../models/Workshop.mjs";

export async function WorkshopSeed() {

  await WorkshopCategory.bulkCreate([
    { categorie: "sciences fiction" },
    { categorie: "coup de coeur" },
    { categorie: "film d auteur" },
  ]);

  await Workshop.bulkCreate([
    {
      date: "2026-05-09",
      title: "Autant on emporte le vent",
      coachName: "Elisabeth Martin",
      participants: 564,
      resaTotales: 822,
      taux: 78,
      lieu: "Marseille",
      subtitle: "Workshop vraiment génial"
    },
    {
      date: "2026-05-09",
      title: "Workshop IA",
      coachName: "Duval Martin",
      participants: 900,
      resaTotales: 600,
      taux: 82,
      lieu: "Marseille",
      subtitle: "Workshop interessant"
    }
  ]);

  console.log("Seed terminé ✅");
}
