import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import sequelize from './config/database.mjs';
import "./models/index.mjs";
import comiteRouter from './routes/committeeRoutes.mjs';
import authRoute from './routes/authRoutes.mjs';
import filmRoutes from './routes/filmRoutes.mjs';
import dotenv from "dotenv";
import { userSeed } from './seeds/userSeed.mjs';
import { seedAll } from './seeds/seedAll.mjs';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cookieParser());
// Middleware JSON 
app.use(express.json());

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5173/'];

app.use(cors({
  origin: function(origin, callback) {
    // permitir requests desde Postman o curl (sin origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`Origen ${origin} no permitido por CORS`));
    }
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));
// Middleware HELMET
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", process.env.FRONTEND_URL || 'http://localhost:5173']
    }
  },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true
}));

// Routes
app.use("/", authRoute);
app.use("/", filmRoutes);
app.use("/comite", comiteRouter); // prefix
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

  await sequelize.sync({ force: true });
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
  console.error("   ❌ Erreur au démarrage de l'API");
  console.error(error.message);
  process.exit(1);
}
