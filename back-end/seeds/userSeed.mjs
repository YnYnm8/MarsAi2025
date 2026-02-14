
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
                    isActive: true
                },
                {
                    email: 'contact.director@example.com',
                    password: 'Director123!',
                    firstName: 'Taro',
                    lastName: 'Director',
                    role: 'director',
                    isEmailVerified: true,
                    isActive: true
                },
                {
                    email: 'contact.committee1@example.com',
                    password: 'Committee123!',
                    firstName: 'Hanako',
                    lastName: 'Committee',
                    role: 'committee',
                    isEmailVerified: false,
                    isActive: true
                },
                {
                    email: 'contact.committee2@example.com',
                    password: 'Committee456!',
                    firstName: 'Ken',
                    lastName: 'Committee',
                    role: 'committee',
                    isEmailVerified: false,
                    isActive: true
                },
                {
                    email: 'contact.visitor@example.com',
                    password: 'Visitor123!',
                    firstName: 'Guest',
                    lastName: 'User',
                    role: 'visitor',
                    isEmailVerified: false,
                    isActive: true
                },
                {

                    email: 'director3@example.com',
                    password: 'Director123!',
                    firstName: 'Charlie',
                    lastName: 'Director',
                    role: 'director',
                    isEmailVerified: true,
                    isActive: true
                },
                {
                    email: 'director4@example.com',
                    password: 'Director123!',
                    firstName: 'Diana',
                    lastName: 'Director',
                    role: 'director',
                    isEmailVerified: true,
                    isActive: true
                },
                {
                    email: 'director5@example.com',
                    password: 'Director123!',
                    firstName: 'Edward',
                    lastName: 'Director',
                    role: 'director',
                    isEmailVerified: true,
                    isActive: true
                },
                {
                    email: 'committee3@example.com',
                    password: 'Committee123!',
                    firstName: 'Fumiko',
                    lastName: 'Committee',
                    role: 'committee',
                    isEmailVerified: false,
                    isActive: true
                },
                {
                    email: 'committee4@example.com',
                    password: 'Committee123!',
                    firstName: 'Goro',
                    lastName: 'Committee',
                    role: 'committee',
                    isEmailVerified: false,
                    isActive: true
                },
                {
                    email: 'committee5@example.com',
                    password: 'Committee123!',
                    firstName: 'Hana',
                    lastName: 'Committee',
                    role: 'committee',
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