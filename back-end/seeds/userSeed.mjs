// seed-users.js
import { User } from '../models/user.mjs';

export async function userSeed() {
  await User.bulkCreate([
    {
      email: 'jury1@example.com',
      password: 'password123',
      firstName: 'Paul',
      lastName: 'Michel',
      role: 'committee',
      bio: 'Jury du festival',
      school: null,
      socialNetworks: { twitter: 'https://twitter.com/jury1' }
    },
    {
      email: 'jury2@example.com',
      password: 'password123',
      firstName: 'Marie',
      lastName: 'Dupont',
      role: 'committee',
      bio: 'Spécialiste cinéma',
      school: 'Université de Paris',
      socialNetworks: {}
    },
    {
      email: 'jury3@example.com',
      password: 'password123',
      firstName: 'Liam',
      lastName: 'Wilson',
      role: 'director',
      bio: 'Réalisateur indépendant',
      school: null,
      socialNetworks: { instagram: 'https://instagram.com/liamwilson' }
    },
    {
      email: 'jury4@example.com',
      password: 'password123',
      firstName: 'Emma',
      lastName: 'Martin',
      role: 'visitor',
      bio: null,
      school: 'ENS Lyon',
      socialNetworks: {}
    },
    {
      email: 'jury5@example.com',
      password: 'password123',
      firstName: 'Noah',
      lastName: 'Lemoine',
      role: 'committee',
      bio: 'Critique de cinéma',
      school: null,
      socialNetworks: {}
    },
    {
      email: 'jury6@example.com',
      password: 'password123',
      firstName: 'Chloé',
      lastName: 'Dubois',
      role: 'visitor',
      bio: null,
      school: null,
      socialNetworks: {}
    },
    {
      email: 'jury7@example.com',
      password: 'password123',
      firstName: 'Lucas',
      lastName: 'Moreau',
      role: 'director',
      bio: 'Réalisateur débutant',
      school: null,
      socialNetworks: {}
    },
    {
      email: 'jury8@example.com',
      password: 'password123',
      firstName: 'Sophie',
      lastName: 'Lefevre',
      role: 'committee',
      bio: 'Jury cinéma international',
      school: null,
      socialNetworks: {}
    },
    {
      email: 'jury9@example.com',
      password: 'password123',
      firstName: 'Gabriel',
      lastName: 'Roux',
      role: 'visitor',
      bio: null,
      school: 'Université Toulouse',
      socialNetworks: {}
    },
    {
      email: 'admin@example.com',
      password: 'password123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      bio: 'Super administrateur',
      school: null,
      socialNetworks: {}
    }
  ], {
    ignoreDuplicates: true // Évite les doublons si un email existe déjà
  });
}
