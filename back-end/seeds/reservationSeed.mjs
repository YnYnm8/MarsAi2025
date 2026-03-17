import Reservation from "../models/Reservation.mjs";
export default async function ReservationSeed() {

await Reservation.bulkCreate([
    {
      nom: "Duval",
      prenom: "Sophie",
      email: "sophie@gmail.com",
      profession: "médecin",
       
    },
    {
     nom: "Césaire",
      prenom: "Amélie",
      email: "amelie@gmail.com",
      profession: "policier",
        
    }
  ]);

  console.log("Seed terminé ✅");
}
