import express from 'express';
import cors from 'cors';
import sequelize from './config/database.mjs';
import "./models/index.mjs";
import comiteRouter from './routes/committeeRoutes.mjs';
import authRoute from './routes/authRoutes.mjs';
import filmRoutes from './routes/filmRoutes.mjs';
import dotenv from "dotenv";
import { userSeed } from './seeds/userSeed.mjs';
import { seedAll } from './seeds/seedAll.mjs';
//import { filmSeed } from './seeds/filmSeed.mjs';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware JSON 
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // cookies
}));

// Routes
app.use("/", authRoute);
app.use("/", filmRoutes);

app.get("/", (req, res) => {
  res.send("API OK");
});

// serveur + BDD
try {
  await sequelize.authenticate();
  console.log("     🗄️ Connexion à la BDD réussie ✅");

  await sequelize.sync({ force: true });
  console.log(" ");
  console.log("     🧩 Tables créées avec succès  ✅");

  await userSeed();
  //await filmSeed();
  await seedAll();

  console.log(" ");
  console.log("     💾 Seeds insérés avec succès  ✅");

  app.get("/", (req, res) => {
    res.send("API OK");
  });

  app.use("/comite", comiteRouter); // prefix
  console.log("     ⏱️ Tables synchronisées  ✅ ");

  app.listen(PORT, () => {
    console.log(`   🚀 Serveur démarré sur http://localhost:${PORT} 🔌`);
  });
} catch (error) {
  console.error("   ❌ Erreur au démarrage de l'API");
  console.error(error.message);
  process.exit(1);
}
