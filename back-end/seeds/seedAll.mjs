import Film from "../models/Films.mjs";
import Playlist from "../models/Playlist.mjs";
import Selection from "../models/Selection.mjs";
import File from "../models/File.mjs";
import Price from "../models/Price.mjs";
import Sponsor from "../models/Sponsor.mjs";
import Notification from "../models/Notification.mjs";
import Annotation from "../models/Annotation.mjs";
import FilmSponsor from "../models/FilmSponsor.mjs";
// import User from "../models/User.mjs"; 

export async function seedAll() {
    try {
        console.log("🚀 Lancement de la seed complémentaire...");

        // On s'assure que les users de test ont un pays avant de lier les films.
        // Cela répare les anciennes données sans pays.
        // await User.update({ country: 'FRANCE' }, { where: { id: 1 } });
        // await User.update({ country: 'USA' }, { where: { id: 2 } });
        // await User.update({ country: 'JAPON' }, { where: { id: 3 } });
        // await User.update({ country: 'MEXIQUE' }, { where: { id: 4 } });

        // --- SPONSORS & SELECTIONS ---
        const sponsors = await Sponsor.bulkCreate([
            { name: 'CineWorld' },
            { name: 'FilmFest Inc.' },
            { name: 'ArtHouse Studio' }
        ], { returning: true });

        const selections = await Selection.bulkCreate([
            { name: 'Festival Internacional 2026' },
            { name: 'Competencia de Cortometrajes' },
            { name: 'IA pour tous' }
        ], { returning: true });

        // --- FILMS + FILES  ---
        const films = await Film.bulkCreate([
            {
                UserId: 1,
                collaborateur: 'Alex Rivera, Sora AI',
                title: 'Fragments of Reality',
                duration: 85,
                status: 'published',
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
                UserId: 4,
                title: 'LES CHIIIII',
                duration: 100,
                status: 'draft',
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
                status: 'published',
                description: 'Documental sobre la vida marina.',
                generateAi: 'hybrid',
                Files: [
                    { subtitle: 'English', film_url: 'https://cdn.example.com/f2.mp4', poster_url: 'https://cdn.example.com/p2.jpg', outil_Ai: 'None' }
                ]
            }
        ], { 
            include: [File], 
            returning: true 
        });

        // --- RELATIONS (Playlists, Annotations, Prix) ---
        const playlists = await Playlist.bulkCreate([
            { status: 'public', UserId: 1 },
            { status: 'private', UserId: 2 }
        ], { returning: true });

        // Ajout des films aux playlists (Sequelize mixins)
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