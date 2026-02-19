import { Film, File, Playlist, PlaylistFilm, Note } from "../models/index.mjs";


export default async function seedFilmsPlaylist() {
    try {
        // --- FILMS + FILES ---
           // Asumimos que los usuarios ya existen con id 1 y 2
           const films = await Film.bulkCreate(
             [
              
               {
                 UserId: 3,
                 last_name: "Smith",
                 collaborateur: "no",
                 email: "smith@example.com",
                 school: "NY Film School",
                 country: "USA",
                 bio: "Cineasta experimental.",
                 title: "City Lights",
                 duration: 120,
                 status: "published",
                 description: "Exploración visual de la vida urbana.",
                 category: "Experimental",
                 generate_Ai: "hybrid",
                 Files: [
                   {
                     subtitle: "English",
                     film_url: "https://cdn.example.com/films/city-lights.mp4",
                     poster_url: "https://picsum.photos/512?random=5",
                     outil_Ai: "None",
                   },
                 ],
               },
               {
                 UserId: 4,
                 last_name: "Garcia",
                 collaborateur: "yes",
                 email: "garcia@example.com",
                 school: "Barcelona Film Institute",
                 country: "Spain",
                 bio: "Directora de cine social.",
                 title: "Streets of Hope",
                 duration: 88,
                 status: "published",
                 description: "Historia de comunidades resilientes.",
                 category: "Social",
                 generate_Ai: "hybrid",
                 Files: [
                   {
                     subtitle: "Spanish",
                     film_url: "https://cdn.example.com/films/streets-of-hope.mp4",
                     poster_url: "https://picsum.photos/512?random=6",
                     outil_Ai: "None",
                   },
                 ],
               },
               {
                 UserId: 5,
                 last_name: "Lee",
                 collaborateur: "no",
                 email: "lee@example.com",
                 school: "Seoul Film Academy",
                 country: "South Korea",
                 bio: "Director de acción.",
                 title: "Shadow Strike",
                 duration: 105,
                 status: "published",
                 description: "Thriller de acción con artes marciales.",
                 category: "Action",
                 generate_Ai: "hybrid",
                 Files: [
                   {
                     subtitle: "Korean",
                     film_url: "https://cdn.example.com/films/shadow-strike.mp4",
                     poster_url: "https://picsum.photos/512?random=7",
                     outil_Ai: "None",
                   },
                 ],
               },
               {
                 UserId: 6,
                 last_name: "Brown",
                 collaborateur: "yes",
                 email: "brown@example.com",
                 school: "London Film College",
                 country: "UK",
                 bio: "Documentalista de naturaleza.",
                 title: "Forest Whispers",
                 duration: 92,
                 status: "published",
                 description: "Documental sobre la flora y fauna de bosques antiguos.",
                 category: "Documentary",
                 generate_Ai: "hybrid",
                 Files: [
                   {
                     subtitle: "English",
                     film_url: "https://cdn.example.com/films/forest-whispers.mp4",
                     poster_url: "https://picsum.photos/512?random=8",
                     outil_Ai: "None",
                   },
                 ],
               },
               {
                 UserId: 7,
                 last_name: "Martinez",
                 collaborateur: "no",
                 email: "martinez@example.com",
                 school: "Mexico City Film School",
                 country: "Mexico",
                 bio: "Cineasta de comedia.",
                 title: "Laughter Street",
                 duration: 100,
                 status: "published",
                 description: "Comedia sobre la vida cotidiana en la ciudad.",
                 category: "Comedy",
                 generate_Ai: "hybrid",
                 Files: [
                   {
                     subtitle: "Spanish",
                     film_url: "https://cdn.example.com/films/laughter-street.mp4",
                     poster_url: "https://picsum.photos/512?random=9",
                     outil_Ai: "None",
                   },
                 ],
               },
               {
                 UserId: 8,
                 last_name: "Kumar",
                 collaborateur: "yes",
                 email: "kumar@example.com",
                 school: "Mumbai Film Institute",
                 country: "India",
                 bio: "Director de drama.",
                 title: "Silent Rivers",
                 duration: 110,
                 status: "published",
                 description: "Drama familiar sobre secretos y reconciliaciones.",
                 category: "Drama",
                 generate_Ai: "hybrid",
                 Files: [
                   {
                     subtitle: "Hindi",
                     film_url: "https://cdn.example.com/films/silent-rivers.mp4",
                     poster_url: "https://picsum.photos/512?random=10",
                     outil_Ai: "None",
                   },
                 ],
               },
               {
                 UserId: 9,
                 last_name: "Chen",
                 collaborateur: "no",
                 email: "chen@example.com",
                 school: "Beijing Film Academy",
                 country: "China",
                 bio: "Cineasta de ciencia ficción.",
                 title: "Beyond the Stars",
                 duration: 130,
                 status: "published",
                 description: "Aventura espacial que explora mundos desconocidos.",
                 category: "Sci-Fi",
                 generate_Ai: "hybrid",
                 Files: [
                   {
                     subtitle: "Mandarin",
                     film_url: "https://cdn.example.com/films/beyond-the-stars.mp4",
                     poster_url: "https://picsum.photos/512?random=11",
                     outil_Ai: "None",
                   },
                 ],
               },
               {
                 UserId: 10,
                 last_name: "Nguyen",
                 collaborateur: "yes",
                 email: "nguyen@example.com",
                 school: "Ho Chi Minh City Film School",
                 country: "Vietnam",
                 bio: "Director de animación.",
                 title: "Color Dreams",
                 duration: 85,
                 status: "published",
                 description: "Cortometraje animado sobre la imaginación infantil.",
                 category: "Animation",
                 generate_Ai: "hybrid",
                 Files: [
                   {
                     subtitle: "Vietnamese",
                     film_url: "https://cdn.example.com/films/color-dreams.mp4",
                     poster_url: "https://picsum.photos/512?random=12",
                     outil_Ai: "None",
                   },
                 ],
               },
               {
                 UserId: 11,
                 last_name: "Rodriguez",
                 collaborateur: "no",
                 email: "rodriguez@example.com",
                 school: "Buenos Aires Film School",
                 country: "Argentina",
                 bio: "Cineasta documental.",
                 title: "Patagonia Secrets",
                 duration: 98,
                 status: "published",
                 description: "Documental sobre la vida silvestre de Patagonia.",
                 category: "Documentary",
                 generate_Ai: "hybrid",
                 Files: [
                   {
                     subtitle: "Spanish",
                     film_url: "https://cdn.example.com/films/patagonia-secrets.mp4",
                     poster_url: "https://picsum.photos/512?random=13",
                     outil_Ai: "None",
                   },
                 ],
               },
               {
                 UserId: 11,
                 last_name: "Harris",
                 collaborateur: "yes",
                 email: "harris@example.com",
                 school: "Toronto Film School",
                 country: "Canada",
                 bio: "Director de thriller psicológico.",
                 title: "Mind Maze",
                 duration: 115,
                 status: "published",
                 description:
                   "Thriller que explora la mente humana y los secretos ocultos.",
                 category: "Thriller",
                 generate_Ai: "hybrid",
                 Files: [
                   {
                     subtitle: "English",
                     film_url: "https://cdn.example.com/films/mind-maze.mp4",
                     poster_url: "https://picsum.photos/512?random=14",
                     outil_Ai: "None",
                   },
                 ],
               },
             ],
             { include: [File] },
           );
           const playlists = await Playlist.bulkCreate([
             { PlaylistId: 1, status: "NOT_WATCHED" },
             { PlaylistId: 2, status: "ACCEPTED" },
             { PlaylistId: 3, status: "REFUSED" },
             { PlaylistId: 4, status: "TO_DISCUSS" },
           ]);
           await PlaylistFilm.bulkCreate([
            //  { PlaylistId: 1, FilmId: 1 }, // Hanako Committee
            //  { PlaylistId: 1, FilmId: 2 }, // Ken Committee
             { PlaylistId: 1, FilmId: 3}, // Fumiko Committee
             { PlaylistId: 1, FilmId: 4},
             { PlaylistId: 1, FilmId: 5},
             { PlaylistId: 1, FilmId: 6},
             { PlaylistId: 1, FilmId: 7},
             { PlaylistId: 1, FilmId: 8},
             { PlaylistId: 1, FilmId: 9},
             { PlaylistId: 1, FilmId: 10},
             { PlaylistId: 1, FilmId: 11},
             { PlaylistId: 1, FilmId: 12},
        
             // Playlist 2: ACCEPTED (UserId 2) — 例として少数
            //  { PlaylistId: 2, FilmId: 1, UserId: 3 },
            //  { PlaylistId: 2, FilmId: 3, UserId: 4 },
            //  { PlaylistId: 2, FilmId: 5, UserId: 9 },
        
             // Playlist 3: REFUSED (UserId 1) — 例として少数
            //  { PlaylistId: 3, FilmId: 2, UserId: 3 },
            //  { PlaylistId: 3, FilmId: 4, UserId: 4 },
            //  { PlaylistId: 3, FilmId: 6, UserId: 9 },
        
             // { PlaylistId: 1, FilmId: 1, UserId: 1 },
             // { PlaylistId: 3, FilmId: 2, UserId: 1 },
             // { PlaylistId: 2, FilmId: 3, UserId: 2 },
             // { PlaylistId: 3, FilmId: 4, UserId: 2 },
           ]);
           // --- NOTES (comentarios) ---
           await Note.bulkCreate([
             {
               UserId: 1,
               FilmId: films[2].id,
               score: 8,
               comment: "Excelente documental!",
             },
             {
               UserId: 2,
               FilmId: films[0].id,
               score: 9,
               comment: "Muy interesante!",
             },
             {
               UserId: 1,
               FilmId: films[0].id,
               score: 7,
               comment: "Gran iluminación en la escena final.",
             },
           ]);
        
    } catch (error) {
        console.error("Error al insertar seeds de films y playlists:", error);  
        
    }
}