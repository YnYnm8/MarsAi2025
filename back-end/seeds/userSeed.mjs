
import User from '../models/User.mjs';

export async function userSeed() {
    try {
        console.log(" Insertion des utilisateurs...");

        await User.bulkCreate(
            [
                {
                    email: 'contact.admin@example.com',
                    password: 'Admin123!',
                    firstName: 'Admin',
                    lastName: 'User',
                    role: 'admin',
                    isEmailVerified: true,
                    isActive: true,
                    

                },
                {
                    email: 'director@example.com',
                    password: 'Director123!',
                    firstName: 'Taro',
                    lastName: 'Director',
                    role: 'director',
                    isEmailVerified: true,
                    isActive: true,
                    

                    lastName: 'DirectorTEST',
                    role: 'director',
                    isEmailVerified: true,
                    isActive: true,
                    bio: 'Réalisateur passionné de Sci-Fi',
                    school: 'Ecole de Cinéma de Paris',
                    country: 'France',
                    socialNetworks: { instagram: 'https://instagram.com/taro' },
                },
                {
                    email: 'contact.committee1@example.com',
                    password: 'Committee123!',
                    firstName: 'Hanako',
                    lastName: 'Committee',
                    role: 'committee',
                    isEmailVerified: false,
                    isActive: true,
                   

                },
                 {
                    email: 'jesus@example.com',
                    password: 'jesus',
                    firstName: 'jesus',
                    lastName: 'jesus',
                    role: 'director',
                    isEmailVerified: false,
                    isActive: true,
                    
                    
                },
                {
                    email: 'contact.committee2@example.com',
                    password: 'Committee456!',
                    firstName: 'Ken',
                    lastName: 'Committee',
                    role: 'committee',
                    isEmailVerified: false,
                    isActive: true,
                    

                },
                {
                    email: 'contact.visitor@example.com',
                    password: 'Visitor123!',
                    firstName: 'Guest',
                    lastName: 'User',
                    role: 'visitor',
                    isEmailVerified: false,
                    isActive: true,
                   

                },
                {
                    email: 'kylian@example.com',
                    password: 'mbappe!',
                    firstName: 'mbappe',
                    lastName: 'kylian',
                    role: 'director',
                    isEmailVerified: false,
                    isActive: true         
                }
            ],
            {
                individualHooks: true // Important pour que le hachage du mot de passe (argon2/bcrypt) s'exécute
            }
        );

        console.log("   ✅ Utilisateurs insérés avec succès !");
    } catch (error) {
        console.error("   ❌ Erreur dans userSeed.mjs :");
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.error(`      👉 L'email "${error.errors[0].value}" existe déjà.`);
        } else {
            console.error(error);
        }
        throw error; // On propage l'erreur pour que l'app s'arrête proprement
    }
}