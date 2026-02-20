import Film from "../models/Films.mjs";
import Playlist from "../models/Playlist.mjs";
import Selection from "../models/Selection.mjs";
import File from "../models/File.mjs";
import Price from "../models/Price.mjs";
import Sponsor from "../models/Sponsor.mjs";
import Notification from "../models/Notification.mjs";
import Annotation from "../models/Annotation.mjs";
import FilmSponsor from "../models/FilmSponsor.mjs";

export async function seedAll() {
    try {

        // 1. CRÉATION DES SPONSORS
        const sponsors = await Sponsor.bulkCreate([
            { name: 'CineWorld' },
            { name: 'FilmFest Inc.' },
            { name: 'ArtHouse Studio' }
        ], { returning: true });

        // 2. CRÉATION DES SÉLECTIONS (Les boîtes vides)
        const selections = await Selection.bulkCreate([
            { name: 'Festival Internacional 2026' },
            { name: 'Competencia de Cortometrajes' },
            { name: 'IA pour tous' }
        ], { returning: true });

        // 3. CRÉATION DES FILMS + FILES (Le contenu)
        const films = await Film.bulkCreate([
            {
                UserId: 1,
                title: 'Fragments of Reality',
                duration: 85,
                status: 'accepted', 
                description: 'Cine experimental sobre la memoria.',
                generate_Ai: 'full_ai',
                collaborateur: 'Alex Rivera, Sora AI',
                Files: [{
                    subtitle: 'English',
                    film_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                    poster_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
                    outil_Ai: 'Stable Diffusion',
                    creativeMethodology: 'Focus textures 35mm.'
                }]
            },
            {
                UserId: 5,
                title: 'Gingembre',
                duration: 85,
                status: 'pending', 
                description: 'Gitan du siecle.',
                generate_Ai: 'full_ai',
                collaborateur: 'LoicLeclair',
                Files: [{
                    subtitle: 'Francais',
                    film_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                    poster_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
                    outil_Ai: 'chatgpt',
                    creativeMethodology: 'Focus textures 35mm.'
                }]
            },
            {
                UserId: 4,
                title: 'LES CHIIIII',
                duration: 100,
                status: 'submitted',
                description: 'Cine experimental sobre la memoria.',
                generate_Ai: 'hybrid',
                collaborateur: 'no',
                Files: [{
                    subtitle: 'Spanish',
                    film_url: 'https://cdn.example.com/chiiii.mp4',
                    poster_url: 'https://cdn.example.com/chiiii.jpg',
                    outil_Ai: 'Runway Gen-2'
                }]
            },
            {
                UserId: 2,
                title: 'Ocean Voices',
                duration: 95,
                status: 'rejected',
                description: 'Documental sobre la vida marina.',
                generate_Ai: 'hybrid',
                collaborateur: 'yes',
                Files: [{
                    subtitle: 'English',
                    film_url: 'https://cdn.example.com/ocean.mp4',
                    poster_url: 'https://cdn.example.com/ocean.jpg',
                    outil_Ai: 'Midjourney'
                }]
            },
            {
                UserId: 2,
                title: 'harry potter',
                duration: 95,
                status: 'rejected',
                description: 'Documental sobre la vida marina.',
                generate_Ai: 'hybrid',
                collaborateur: 'yes',
                Files: [{
                    subtitle: 'English',
                    film_url: 'https://cdn.example.com/ocean.mp4',
                    poster_url: 'https://cdn.example.com/ocean.jpg',
                    outil_Ai: 'Midjourney'
                }]
            }
        ], { 
            include: [File], 
            returning: true 
        });

        // liaison selection a films
        if (selections.length > 0 && films.length > 0) {

            // Association film 
            await selections[0].addFilm(films[0]); 
            await selections[1].addFilm(films[1]);
            await selections[2].addFilm(films[2]);
            
            console.log("✅ Table de jointure SelectionFilm mise à jour !");
        }

        // --- LE RESTE DES RELATIONS ---
        const playlists = await Playlist.bulkCreate([
            { status: 'public', UserId: 1 },
            { status: 'private', UserId: 2 }
        ], { returning: true });

        await playlists[0].addFilms([films[0]]);
        await playlists[1].addFilms([films[1]]);

        const prices = await Price.bulkCreate([
            { FilmId: films[0].id, SponsorId: sponsors[0].id },
            { FilmId: films[1].id, SponsorId: sponsors[1].id }
        ], { returning: true });

        await Annotation.bulkCreate([
            { UserId: 1, FilmId: films[1].id, content: 'Revisar escenas iniciales' }
        ]);

        await FilmSponsor.bulkCreate([
            { FilmId: films[0].id, SponsorId: sponsors[0].id }
        ]);

        await Notification.bulkCreate([
            { UserId: 1, PriceId: prices[0].id }
        ]);

        console.log('✅ SEED TERMINÉE AVEC SUCCÈS !');
        
    } catch (err) {
        console.error("❌ Erreur dans seedAll :");
        console.error(err.message);
        process.exit(1);
    }
}