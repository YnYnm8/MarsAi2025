import Film from "../models/Films.mjs";
import Playlist from "../models/Playlist.mjs";
import Selection from "../models/Selection.mjs";
import File from "../models/File.mjs";
import Price from "../models/Price.mjs";
import Sponsor from "../models/Sponsor.mjs";
import Notification from "../models/Notification.mjs";
import Annotation from "../models/Annotation.mjs";
import FilmSponsor from "../models/FilmSponsor.mjs";
// import Note from "../models/Note.mjs";
import PlaylistFilm from "../models/PlaylistFilm.mjs";

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

        // --- FILMS + FILES  ---
        // Lien MP4 fonctionnel pour les tests de vidéos
        const sampleVideo = 'https://www.w3schools.com/html/mov_bbb.mp4';

        const films = await Film.bulkCreate([
            // --- 3 FILMS ORIGINAUX ---
            {
                UserId: 1,
                title: 'Fragments of Reality',
                duration: 85,
                status: 'selected', 
                description: 'Cine experimental sobre la memoria.',
                generateAi: 'fullAi',
                collaborateur: 'Alex Rivera, Sora AI',
                Files: [{
                    subtitle: 'English',
                    film_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                    poster_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop',
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
                generateAi: 'fullAi',
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
                status: 'selected',
                description: 'Cine experimental sobre la memoria.',
                generateAi: 'hybrid',
                collaborateur: 'no',
                Files: [{
                    subtitle: 'Spanish',
                    film_url: sampleVideo,
                    poster_url: 'https://picsum.photos/seed/chiiii/800/1200',
                    outil_Ai: 'Runway Gen-2',
                    creativeMethodology: 'Prises réelles modifiées.'
                }]
            },
            {
                UserId: 2,
                title: 'Ocean Voices',
                duration: 95,
                status: 'rejected',
                description: 'Documental sobre la vida marina.',
                generateAi: 'hybrid',
                collaborateur: 'yes',
                Files: [{
                    subtitle: 'English',
                    film_url: sampleVideo,
                    poster_url: 'https://picsum.photos/seed/chiiii/800/1200',
                    outil_Ai: 'Midjourney'
                }]
            },
            {
                UserId: 2,
                title: 'harry potter',
                duration: 95,
                status: 'rejected',
                description: 'Documental sobre la vida marina.',
                generateAi: 'hybrid',
                collaborateur: 'Jane Doe',
                Files: [{ 
                    subtitle: 'English', 
                    film_url: sampleVideo, 
                    poster_url: 'https://picsum.photos/seed/ocean/800/1200', 
                    outil_Ai: 'Midjourney',
                    creativeMethodology: 'Génération de fonds sous-marins.'
                }]
            },
            // --- 20 NOUVEAUX FILMS ---
            {
                UserId: 3, title: 'Neon Echoes', duration: 12, status: 'selected', description: 'Une exploration visuelle des néons cyberpunk générée par IA.', generateAi: 'fullAi', collaborateur: 'Sora',
                Files: [{ subtitle: 'Français', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film1/800/1200', outil_Ai: 'Midjourney v6', creativeMethodology: 'Génération d\'images par prompt, puis animation vidéo.' }]
            },
            {
                UserId: 1, title: 'Synthetic Horizon', duration: 8, status: 'selected', description: 'Le dernier jour sur Terre vu par une machine.', generateAi: 'fullAi', collaborateur: 'Runway AI', 
                Files: [{ subtitle: 'English', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film2/800/1200', outil_Ai: 'Runway Gen-2', creativeMethodology: 'Text-to-video direct.' }]
            },
            {
                UserId: 2, title: 'Human After All', duration: 25, status: 'selected', description: 'Un androïde cherche à comprendre les émotions humaines.', generateAi: 'hybrid', collaborateur: 'Studio A', 
                Files: [{ subtitle: 'Spanish', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film3/800/1200', outil_Ai: 'Pika Labs', creativeMethodology: 'Acteurs réels sur fond vert généré.' }]
            },
            {
                UserId: 4, title: 'The Quantum Paradox', duration: 45, status: 'selected', description: 'Voyage à travers les dimensions.', generateAi: 'fullAi', collaborateur: 'DALL-E 3', 
                Files: [{ subtitle: 'English', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Sora', creativeMethodology: 'Script généré par GPT-4, vidéo par Sora.' }]
            },
            {
                UserId: 1, title: 'Silent Cosmos', duration: 15, status: 'selected', description: 'Documentaire fictionnel sur le silence spatial.', generateAi: 'fullAi', collaborateur: 'ElevenLabs',
                Files: [{ subtitle: 'Français', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film5/800/1200', outil_Ai: 'Midjourney + Runway', creativeMethodology: 'Voix off générée par IA.' }]
            },
            {
                UserId: 3, title: 'Cybernetic Soul', duration: 22, status: 'selected', description: 'Action et philosophie dans un monde connecté.', generateAi: 'hybrid', collaborateur: 'VFX AI',
                Files: [{ subtitle: 'Japonais', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film6/800/1200', outil_Ai: 'Stable Video Diffusion', creativeMethodology: 'Inpainting sur séquences vidéo.' }]
            },
            {
                UserId: 2, title: 'Desert Rose', duration: 5, status: 'rejected', description: 'Évolution accélérée d\'une fleur numérique.', generateAi: 'fullAi', collaborateur: 'None',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film7/800/1200', outil_Ai: 'Kaiber', creativeMethodology: 'Audio-réactif avec Kaiber.' }]
            },
            {
                UserId: 4, title: 'Binary Sunset', duration: 18, status: 'rejected', description: 'La poésie des algorithmes.', generateAi: 'fullAi', collaborateur: 'ChatGPT',
                Files: [{ subtitle: 'English', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film8/800/1200', outil_Ai: 'Midjourney', creativeMethodology: 'Panoramiques lents sur paysages générés.' }]
            },
            {
                UserId: 1, title: 'Flesh and Pixels', duration: 30, status: 'rejected', description: 'Où s\'arrête l\'homme et commence l\'ordinateur ?', generateAi: 'hybrid', collaborateur: 'John Smith',
                Files: [{ subtitle: 'Français', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film9/800/1200', outil_Ai: 'Wonder Dynamics', creativeMethodology: 'Remplacement de personnages en 3D.' }]
            },
            {
                UserId: 3, title: 'Digital Eden', duration: 10, status: 'pending', description: 'La nature recréée par des réseaux de neurones.', generateAi: 'fullAi', collaborateur: 'None',
                Files: [{ subtitle: 'English', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film10/800/1200', outil_Ai: 'Sora', creativeMethodology: 'Génération de faune hyper-réaliste.' }]
            },
            {
                UserId: 2, title: 'Chronos', duration: 14, status: 'pending', description: 'Une manipulation temporelle visuelle.', generateAi: 'fullAi', collaborateur: 'AI Labs',
                Files: [{ subtitle: 'English', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film11/800/1200', outil_Ai: 'Runway', creativeMethodology: 'Interpolation de frames.' }]
            },
            {
                UserId: 4, title: 'Metropolis 2.0', duration: 60, status: 'selected', description: 'Remake partiel du classique en IA.', generateAi: 'hybrid', collaborateur: 'CineAI',
                Files: [{ subtitle: 'Allemand', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film12/800/1200', outil_Ai: 'Topaz Video AI', creativeMethodology: 'Upscaling et colorisation.' }]
            },
            {
                UserId: 1, title: 'Ghosts of the Machine', duration: 9, status: 'selected', description: 'Des anomalies dans les réseaux de neurones.', generateAi: 'fullAi', collaborateur: 'Glitch Artist', shares: "140", views: "1000",
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film13/800/1200', outil_Ai: 'Stable Diffusion', creativeMethodology: 'Exploitation des hallucinations de l\'IA.' }]
            },
            {
                UserId: 3, title: 'The Last Algorithm', duration: 11, status: 'pending', description: 'Le code qui a détruit internet.', generateAi: 'fullAi', collaborateur: 'Claude 3',
                Files: [{ subtitle: 'Français', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film14/800/1200', outil_Ai: 'Sora', creativeMethodology: 'Visualisation de flux de données.' }]
            },
            {
                UserId: 2, title: 'Shadows of Tomorrow', duration: 35, status: 'selected', description: 'Film noir futuriste.', generateAi: 'hybrid', collaborateur: 'NoirStudios',
                Files: [{ subtitle: 'English', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film15/800/1200', outil_Ai: 'Midjourney', creativeMethodology: 'Storyboarding en IA, tournage classique.' }]
            },
            {
                UserId: 4, title: 'Pixel Perfect', duration: 7, status: 'selected', description: 'Animation abstraite et mathématique.', generateAi: 'fullAi', collaborateur: 'None',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film16/800/1200', outil_Ai: 'Deforum', creativeMethodology: 'Animation par keyframes mathématiques.' }]
            },
            {
                UserId: 1, title: 'Memories of Mars', duration: 40, status: 'pending', description: 'Une colonie imaginaire vue de l\'intérieur.', generateAi: 'fullAi', collaborateur: 'Mars.A.I Team',
                Files: [{ subtitle: 'English', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film17/800/1200', outil_Ai: 'Runway Gen-2', creativeMethodology: 'Génération de paysages martiens.' }]
            },
            {
                UserId: 3, title: 'Deep Fake Love', duration: 16, status: 'selected', description: 'Comédie romantique entre deux IA.', generateAi: 'hybrid', collaborateur: 'Actors Guild',
                Files: [{ subtitle: 'Espagnol', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film18/800/1200', outil_Ai: 'HeyGen', creativeMethodology: 'Remplacement facial dynamique.' }]
            },
            {
                UserId: 2, title: 'Symphony in Code', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 2, title: 'Epstein', duration: 21, status: 'selected', description: 'Un orchestre virtuel joue une partition générée.', generateAi: 'fullAi', collaborateur: 'Suno AI',
                Files: [{ subtitle: 'None', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film4/800/1200', outil_Ai: 'Suno + Pika', creativeMethodology: 'Musique IA synchronisée avec vidéo.' }]
            },
            {
                UserId: 4, title: 'The Architect', duration: 55, status: 'selected', description: 'Création d\'un monde de A à Z.', generateAi: 'fullAi', collaborateur: 'Visionary',
                Files: [{ subtitle: 'English', film_url: sampleVideo, poster_url: 'https://picsum.photos/seed/film20/800/1200', outil_Ai: 'Sora', creativeMethodology: 'Workflow complet text-to-video.' }]
            }
        ], {
            include: [File],
            returning: true
        })



        const playlists = await Playlist.bulkCreate([
            { PlaylistId: 1, status: "NOT_WATCHED" },
            { PlaylistId: 2, status: "selected" },
            { PlaylistId: 3, status: "rejected" },
            { PlaylistId: 4, status: "pending" },
        ]);

        await PlaylistFilm.bulkCreate([
            { PlaylistId: 1, FilmId: films[0].id },
            { PlaylistId: 1, FilmId: films[1].id },
            { PlaylistId: 1, FilmId: films[2].id },
            { PlaylistId: 1, FilmId: films[3].id },
            { PlaylistId: 1, FilmId: films[4].id },
            { PlaylistId: 1, FilmId: films[5].id },
            { PlaylistId: 1, FilmId: films[6].id },
            { PlaylistId: 1, FilmId: films[7].id },
        ]);

        const prices = await Price.bulkCreate([
            { FilmId: films[0].id, SponsorId: sponsors[0].id },
            { FilmId: films[1].id, SponsorId: sponsors[1].id }
        ], { returning: true });

        await Annotation.bulkCreate([
            { UserId: 1, FilmId: films[1].id, content: 'Revisar escenas iniciales' },
            { UserId: 2, FilmId: films[5].id, content: 'Vérifier la colorimétrie' }
        ]);

        // await Note.bulkCreate([
        //     {
        //         UserId: 1,
        //         FilmId: films[2].id,
        //         score: 8,
        //         comment: "Excelente documental!",
        //     },
        //     {
        //         UserId: 2,
        //         FilmId: films[1].id,
        //         score: 9,
        //         comment: "Muy interesante!",
        //     },
        //     {
        //         UserId: 3,
        //         FilmId: films[0].id,
        //         score: 7,
        //         comment: "Gran iluminación en la escena final.",
        //     },
        // ]);

        await FilmSponsor.bulkCreate([
            { FilmId: films[0].id, SponsorId: sponsors[0].id },
            { FilmId: films[4].id, SponsorId: sponsors[2].id }
        ]);

       

        console.log('✅ SEED TERMINÉE AVEC SUCCÈS ! (' + films.length + ' films créés)');


    } catch (err) {
        console.error("❌ Erreur dans seedAll :");
        console.error(err.message);
        process.exit(1);
    }
}