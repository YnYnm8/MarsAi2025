import sequelize from './config/database.mjs';
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import "./models/index.mjs";
import comiteRouter from './routes/committeeRoutes.mjs';
import authRoute from './routes/authRoutes.mjs';
import filmRoutes from './routes/filmRoutes.mjs';
import profileRoutes from './routes/profileRoutes.mjs';
import adminRoutes from "./routes/adminRoutes.mjs";
import { userSeed } from './seeds/userSeed.mjs';
import { seedAll } from './seeds/seedAll.mjs';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'] 
}));

app.use(cookieParser());
// Middleware JSON 
app.use(express.json());


// Middleware HELMET
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", process.env.FRONTEND_URL || 'http://localhost:5173', "http://localhost:3000"]
    }
  },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true
}));

// Routes
app.use("/", authRoute);
// admin route
app.use("/admin", adminRoutes);
app.use("/films", filmRoutes);
app.use("/comite", comiteRouter); // prefix
app.use("/", profileRoutes);

console.log(" ");
console.log("     ⏱️ Tables synchronisées  ✅ ");


app.get("/", (req, res) => {
  res.send("API OK");
});

// serveur + BDD
try {
  await sequelize.authenticate();
  console.log(" ");
  console.log("     🗄️ Connexion à la BDD réussie ✅");

  await sequelize.sync({force:true});
  console.log(" ");
  console.log("     🧩 Tables créées avec succès  ✅");

  //Seed
  await userSeed();
  await seedAll();

  console.log(" ");
  console.log("     💾 Seeds insérés avec succès  ✅");

  app.get("/", (req, res) => {
    res.send("API OK");
  });


  app.listen(PORT, () => {
    console.log(" ");
    console.log(`   🚀 Serveur démarré sur http://localhost:${PORT} 🔌`);
  });
} catch (error) {
  console.error(" ");
  console.error("   ❌ Erreur au démarrage de l'API");
  
  // Si c'est une erreur de validation (Email, ENUM, etc.)
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    error.errors.forEach(err => {
      console.error(`   👉 [VALIDATION] Champ: ${err.path} | Message: ${err.message} | Valeur: ${err.value}`);
    });
  } else {
    // Si c'est une autre erreur (Syntaxe, Connexion, etc.)
    console.error(`   👉 [ERREUR]: ${error.message}`);
    console.error(error); 
  }
  process.exit(1);
}