import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb', // Spécifique pour MariaDB
    logging: false,
    pool: {
      max: 10,  // Maximum 10 connexions simultanées
      min: 0, // Minimum 0 connexions en attente
      acquire: 30000, // Timeout 30s pour acquérir connexion
      idle: 10000 // Ferme connexion après 10s d'inactivité
    },
    dialectOptions: {
      timezone: 'Etc/GMT-2' // Timezone GMT+2 (heure d'été France)
    }
  }
);

export default sequelize;
