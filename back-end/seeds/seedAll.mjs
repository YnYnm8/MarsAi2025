import Film from "../models/Films.mjs";
import Playlist from "../models/Playlist.mjs";
import Selection from "../models/Selection.mjs";
import File from "../models/File.mjs";
import Price from "../models/Price.mjs";
import Sponsor from "../models/Sponsor.mjs";
import Notification from "../models/Notification.mjs";
import Comment from "../models/Comment.mjs";
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
                last_name: 'Smith',
                collaborateur: 'no',
                email: 'contact.smith@cinema.com', 
                school: 'NY Film School',
                country: 'USA',
                bio: 'Director experimental.',
                title: 'Fragments of Reality',
                duration: 85,
                status: 'draft',
                description: 'Cine experimental sobre la memoria.',
                category: 'Experimental',
                generate_Ai: 'full_ai',
                Files: [
                    { subtitle: 'English', film_url: 'https://cdn.example.com/f1.mp4', poster_url: 'https://cdn.example.com/p1.jpg', outil_Ai: 'Stable Diffusion' }
                ]
            },
            {
                UserId: 2,
                last_name: 'Johnson',
                collaborateur: 'yes',
                email: 'contact.johnson@films.com',
                school: 'LA Film Academy',
                country: 'USA',
                bio: 'Director documentalista.',
                title: 'Ocean Voices',
                duration: 95,
                status: 'published',
                description: 'Documental sobre la vida marina.',
                category: 'Documentary',
                generate_Ai: 'hybrid',
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

        // --- COMMENTS ---
        const commentaires = await Comment.bulkCreate([
            { UserId: 1, FilmId: films[1].id, content: 'Excelente documental!' },
            { UserId: 2, FilmId: films[0].id, content: 'Muy interesante!' }
        ]);

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