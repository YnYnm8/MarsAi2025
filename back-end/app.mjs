import express from 'express';
import cors from 'cors';
import sequelize from './config/database.mjs';
import "./models/index.mjs";
import authRoute from './routes/authRoutes.mjs';
import dotenv from "dotenv";

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

app.get("/", (req, res) => {
  res.send("API OK");
});

// serveur + BDD
try {
  await sequelize.authenticate();
  console.log("✅ Connexion à la BDD réussie");

  await sequelize.sync({ alter: true });
  console.log("✅ Tables synchronisées");

  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("❌ Erreur au démarrage de l'API");
  console.error(error.message);
  process.exit(1);
}
