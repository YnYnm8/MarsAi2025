import { createServer } from "http";
import { Server } from "socket.io";
import sequelize from "./config/database.mjs";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import * as db from "./models/index.mjs";
import { initSocket } from "./config/socket.mjs";
import comiteRouter from "./routes/comiteRoutes.mjs";
import workshopRoutes from "./routes/workshopRoutes.mjs";
import authRoute from "./routes/authRoutes.mjs";
import filmRoutes from "./routes/filmRoutes.mjs";
import profileRoutes from "./routes/profileRoutes.mjs";
import adminRoutes from "./routes/adminRoutes.mjs";
import { userSeed } from './seeds/userSeed.mjs';
import { seedAll } from './seeds/seedAll.mjs';
import { WorkshopSeed } from './seeds/workshopSeed.mjs';
import publicRoutes from './routes/publicRoutes.mjs';
import contctRoutes from './routes/contactRoute.mjs';
import notificationRoute from "./routes/notificationRoutes.mjs";
import reservationRoutes from "./routes/reservationRoutes.mjs"
import http from "http";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = 'http://whiletrue.fr:8004 '.replace(/\/$/, '');
console.log({FRONTEND_URL});
// Créer le serveur HTTP à partir d'Express
const httpServer = createServer(app);
// Initialiser Socket.io sur le serveur HTTP
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:8004', FRONTEND_URL].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

// Rendre `io` et `db` accessibles dans tous les contrôleurs
app.locals.io = io;
app.locals.models = db;

// Brancher les handlers Socket.io
initSocket(io, db);

// MIDDLEWARES

app.use(cors({
  origin: ['http://localhost:8004', FRONTEND_URL].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'blob:', 'http://localhost:3004'],
      connectSrc: [
        "'self'",
        "http://localhost:8004",
        "http://localhost:3004",
        "ws://localhost:3004",   // WebSocket Socket.io
        "wss://localhost:3004",
        FRONTEND_URL.replace('http', 'ws'),
        FRONTEND_URL.replace('http', 'wss'),
      ],
    },
  },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true,
}));

// ROUTES 

app.use('/api', publicRoutes);
app.use("/api", workshopRoutes);
app.use("/", authRoute);
app.use("/admin", adminRoutes);
app.use("/films", filmRoutes);
app.use("/comite", comiteRouter);
app.use("/contact", contctRoutes);
app.use("/", profileRoutes);
app.use("/notifications", notificationRoute);
app.use("/programs", reservationRoutes);


app.get("/", (req, res) => res.send("API OK"));

// Gestionnaire 404 propre pour l'API
app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable sur l'API" });
});

// DÉMARRAGE

try {
  await sequelize.authenticate();
  console.log("\n      🗄️ Connexion à la BDD réussie ✅");

  await sequelize.sync({ force: true });
  console.log("\n      🧩 Tables créées avec succès  ✅");

  await userSeed();
  await seedAll();
  await WorkshopSeed();
  console.log("\n      💾 Seeds insérés avec succès  ✅");

  // httpServer.listen()
  httpServer.listen(PORT, () => {
    console.log(`\n    🚀 Serveur démarré sur http://localhost:${PORT} 🔌`);
    console.log(`    🔔 Socket.io actif sur ws://localhost:${PORT}`);
  });

} catch (error) {
  console.error("\n    ❌ Erreur au démarrage de l'API");
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