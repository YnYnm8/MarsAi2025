import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

console.log('DB_USER:', process.env.DB_USER);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    logging: false,

    timezone: '+02:00',

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    dialectOptions: {
      useUTC: false
    }
  }
);

export default sequelize;
