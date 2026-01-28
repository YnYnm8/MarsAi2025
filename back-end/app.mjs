import express from 'express';
import sequelize from './config/database.mjs';
import "./models/index.mjs";

const app = express();
const PORT = 3000;

try {
  await sequelize.authenticate();
  console.log(" ");
  console.log("Connexion réussie ✅");

  await sequelize.sync({ alter: true });
  console.log(" ");
  console.log("Tables créées avec succès ✅");

  app.get("/", (req, res) => {
    res.send("API OK");
  });

  app.listen(PORT, () => {
    console.log(" ");
    console.log(`Port utilisé: ${PORT} 🔌`);
  });

} catch (error) {
  console.error(" ");
  console.error("❌ Erreur au démarrage de l’API");
  console.error(error.message);
  process.exit(1); 
}