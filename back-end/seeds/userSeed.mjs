// seed-users.js
import { User } from '../models/User.mjs';

export async function userSeed() {
  await User.bulkCreate(
    [
      {
        email: 'admin@example.com',
        password: 'Admin123!',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isEmailVerified: true,
        isActive: true
      },
      {
        email: 'director@example.com',
        password: 'Director123!',
        firstName: 'Taro',
        lastName: 'Director',
        role: 'director',
        isEmailVerified: true,
        isActive: true
      },
      {
        email: 'committee1@example.com',
        password: 'Committee123!',
        firstName: 'Hanako',
        lastName: 'Committee',
        role: 'committee',
        isEmailVerified: false,
        isActive: true
      },
      {
        email: 'committee2@example.com',
        password: 'Committee456!',
        firstName: 'Ken',
        lastName: 'Committee',
        role: 'committee',
        isEmailVerified: false,
        isActive: true
      },
      {
        email: 'visitor@example.com',
        password: 'Visitor123!',
        firstName: 'Guest',
        lastName: 'User',
        role: 'visitor',
        isEmailVerified: false,
        isActive: true
      }
    ],
    {
      individualHooks: true // ← argon2 が確実に動く
    }
  );
}