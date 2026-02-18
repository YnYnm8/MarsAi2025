import Film from "../models/Films.mjs";
import Playlist from "../models/Playlist.mjs";
import Selection from "../models/Selection.mjs";
import File from "../models/File.mjs";
import Price from "../models/Price.mjs";
import Sponsor from "../models/Sponsor.mjs";
import Notification from "../models/Notification.mjs";

import Annotation from "../models/Annotation.mjs";
import PlaylistFilm from "../models/PlaylistFilm.mjs";
import FilmSponsor from "../models/FilmSponsor.mjs";

export async function seedAll() {
    try {
        console.log(" Insertion des données complémentaires...");

        // --- SPONSORS ---
        const sponsors = await Sponsor.bulkCreate([
            { name: 'CineWorld' },
            { name: 'FilmFest Inc.' },
            { name: 'ArtHouse Studio' }
        ], { returning: true });

        // --- SELECTIONS ---
        const selections = await Selection.bulkCreate([
            { name: 'Festival Internacional 2026' },
            { name: 'Competencia de Cortometrajes' }
        ], { returning: true });

        // --- FILMS + FILES ---
        // Note: On utilise des emails différents de userSeed pour éviter les conflits Unique
        const films = await Film.bulkCreate([
            {
                UserId: 1,
                collaborateur: 'Alex Rivera, Sora AI',
                title: 'Fragments of Reality',
                duration: 85,
                status: 'draft',
                description: 'Cine experimental sobre la memoria.',
                generateAi: 'fullAi',
                Files: [
                    {
                        subtitle: 'English',
                        film_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Link de video real para pruebas
                        poster_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop',
                        galerie_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop',
                        outil_Ai: 'Stable Diffusion',
                        creativeMethodology: 'Para este proyecto, entrenamos un modelo LoRA específico con texturas de películas de 35mm de los años 70. Las transiciones se generaron mediante interpolación de frames para dar esa sensación de fluidez onírica propia de los recuerdos.'
                    }
                ]
            },
            {
                UserId: 2,
                collaborateur: 'yes',          
                title: 'Ocean Voices',
                duration: 95,
                status: 'published',
                description: 'Documental sobre la vida marina.',
                generateAi: 'hybrid',
                Files: [
                    { subtitle: 'English', film_url: 'https://cdn.example.com/f2.mp4', poster_url: 'https://cdn.example.com/p2.jpg', outil_Ai: 'None' }
                ]
            }
        ], { include: [File], returning: true });

        // --- PLAYLISTS ---
        const playlists = await Playlist.bulkCreate([
            { status: 'public', UserId: 1 },
            { status: 'private', UserId: 2 }
        ], { returning: true });

        // --- PLAYLISTFILM ---
        // Utilisation sécurisée des index 0 et 1 (car nous n'avons créé que 2 films)
        await playlists[0].addFilms([films[0]]);
        await playlists[1].addFilms([films[1]]);
        /*
                // --- COMMENTS ---
                const commentaires = await Comment.bulkCreate([
                    { UserId: 1, FilmId: films[1].id, content: 'Excelente documental!' },
                    { UserId: 2, FilmId: films[0].id, content: 'Muy interesante!' }
                ]);
        */
        // --- ANNOTATIONS ---
        const annotations = await Annotation.bulkCreate([
            { UserId: 1, FilmId: films[1].id, content: 'Revisar escenas iniciales' },
            { UserId: 2, FilmId: films[0].id, content: 'Nota sobre iluminación' }
        ]);

        // --- PRICES ---
        const prices = await Price.bulkCreate([
            { FilmId: films[0].id, SponsorId: sponsors[0].id },
            { FilmId: films[1].id, SponsorId: sponsors[1].id }
        ], { returning: true });

        // --- FILMSPONSOR ---
        await FilmSponsor.bulkCreate([
            { FilmId: films[0].id, SponsorId: sponsors[0].id },
            { FilmId: films[1].id, SponsorId: sponsors[1].id }
        ]);

        // --- NOTIFICATIONS ---
        await Notification.bulkCreate([
            { UserId: 1, PriceId: prices[0].id },
            { UserId: 2, PriceId: prices[1].id }
        ]);

        console.log(" ");
        console.log('✅ TOUTES LES DONNÉES SONT EN PLACE !')
        console.log('═══════════════════════════════════════════');
    } catch (err) {
        console.error("❌ Erreur critique dans seedAll :");
        console.error(err);
        process.exit(1);
    }
}