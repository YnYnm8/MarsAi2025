import sequelize from './config/database.mjs';
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url'; 

import "./models/index.mjs";
import comiteRouter from './routes/committeeRoutes.mjs';
import authRoute from './routes/authRoutes.mjs';
import filmRoutes from './routes/filmRoutes.mjs';
import profileRoutes from './routes/profileRoutes.mjs';
import adminRoutes from "./routes/adminRoutes.mjs";
import { userSeed } from './seeds/userSeed.mjs';
import { seedAll } from './seeds/seedAll.mjs';

dotenv.config();

// Configuration pour __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration CORS
app.use(cors({
  origin: [
    'http://localhost:5173' 
    .replace(/\/$/, ''), 
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'] 
}));

app.use(cookieParser());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware HELMET
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      // On autorise les images venant de 'self' (localhost:3000) et data: (base64)
      imgSrc: ["'self'", 'data:', 'blob:', 'http://localhost:3000'], 
      connectSrc: ["'self'", "http://localhost:5173", "http://localhost:3000"]
    }
  },
  crossOriginResourcePolicy: { policy: 'cross-origin' }, 
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true
}));

// Routes
app.use("/", authRoute);
app.use("/admin", adminRoutes);
app.use("/films", filmRoutes);
app.use("/comite", comiteRouter);
app.use("/", profileRoutes);

console.log(" ");
console.log("      ⏱️ Tables synchronisées  ✅ ");

app.get("/", (req, res) => {
  res.send("API OK");
});

// serveur + BDD
try {
  await sequelize.authenticate();
  console.log(" ");
  console.log("      🗄️ Connexion à la BDD réussie ✅");

 
  await sequelize.sync({force:true}); 
  console.log(" ");
  console.log("      🧩 Tables créées avec succès  ✅");

  //Seed
  await userSeed();
  await seedAll();

  console.log(" ");
  console.log("      💾 Seeds insérés avec succès  ✅");

  app.listen(PORT, () => {
    console.log(" ");
    console.log(`    🚀 Serveur démarré sur http://localhost:${PORT} 🔌`);
  });
} catch (error) {
  console.error(" ");
  console.error("    ❌ Erreur au démarrage de l'API");
  
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    error.errors.forEach(err => {
      console.error(`    👉 [VALIDATION] Champ: ${err.path} | Message: ${err.message} | Valeur: ${err.value}`);
    });
  } else {
    console.error(`    👉 [ERREUR]: ${error.message}`);
    console.error(error); 
  }
  process.exit(1);
}