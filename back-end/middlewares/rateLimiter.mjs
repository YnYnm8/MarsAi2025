import { rateLimit } from 'express-rate-limit'; 
const RATELIMIT = process.env.RATELIMIT || 500;
// Limiteur de tentative de connexion
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: RATELIMIT, 
  message: { message: "Trop de tentatives, réessayez dans 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});