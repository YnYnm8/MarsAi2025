import Film from "../models/Films.mjs";
import Playlist from "../models/Playlist.mjs";
import Selection from "../models/Selection.mjs";
import File from "../models/File.mjs";
import Price from "../models/Price.mjs";
import Sponsor from "../models/Sponsor.mjs";
import Notification from "../models/Notification.mjs";
import Note from "../models/Note.mjs";
import Annotation from "../models/Annotation.mjs";
import PlaylistFilm from "../models/PlaylistFilm.mjs";
import FilmSponsor from "../models/FilmSponsor.mjs";

export async function seedAll() {
  try {
    console.log(" Insertion des données complémentaires...");

    // --- SPONSORS ---
    const sponsors = await Sponsor.bulkCreate(
      [
        { name: "CineWorld" },
        { name: "FilmFest Inc." },
        { name: "ArtHouse Studio" },
      ],
      { returning: true },
    );
    try {
      // --- SPONSORS ---
      const sponsors = await Sponsor.bulkCreate([
        { name: "CineWorld" },
        { name: "FilmFest Inc." },
        { name: "ArtHouse Studio" },
      ]);

      // --- SELECTIONS ---
      const selections = await Selection.bulkCreate([
        { name: "Festival Internacional 2026", year: 2024 },
        { name: "Competencia de Cortometrajes", year: 2025 },
      ]);

      // --- FILMS + FILES ---
      // Asumimos que los usuarios ya existen con id 1 y 2
      const films = await Film.bulkCreate(
        [
          {
            UserId: 1,
            last_name: "Smith",
            collaborateur: "yes",
            email: "smith@example.com",
            school: "NY Film School",
            country: "USA",
            bio: "Director de cine dramático.",
            socialNetworks: { instagram: "@smith_director" },
            title: "The Silent Night",
            duration: 120,
            status: "published",
            description: "Un drama sobre la soledad.",
            category: "Drama",
            generate_Ai: "hybrid",
            Files: [
              {
                subtitle: "English",
                film_url: "https://cdn.example.com/films/silent-night.mp4",
                poster_url: "https://picsum.photos/512?random=1",
                outil_Ai: "RunwayML",
              },
              {
                subtitle: "French",
                film_url: "https://cdn.example.com/films/silent-night-fr.mp4",
                poster_url: "https://picsum.photos/512?random=2",
                outil_Ai: "None",
              },
            ],
          },
          {
            UserId: 1,
            last_name: "Smith",
            collaborateur: "no",
            email: "smith@example.com",
            school: "NY Film School",
            country: "USA",
            bio: "Director experimental.",
            title: "Fragments of Reality",
            duration: 85,
            status: "draft",
            description: "Cine experimental sobre la memoria.",
            category: "Experimental",
            generate_Ai: "full_ai",
            Files: [
              {
                subtitle: "English",
                film_url: "https://cdn.example.com/films/fragments.mp4",
                poster_url: "https://picsum.photos/512?random=3",
                outil_Ai: "Stable Diffusion",
              },
            ],
          },
          {
            UserId: 2,
            last_name: "Johnson",
            collaborateur: "yes",
            email: "johnson@example.com",
            school: "LA Film Academy",
            country: "USA",
            bio: "Director documentalista.",
            title: "Ocean Voices",
            duration: 95,
            status: "published",
            description: "Documental sobre la vida marina.",
            category: "Documentary",
            generate_Ai: "hybrid",
            Files: [
              {
                subtitle: "English",
                film_url: "https://cdn.example.com/films/ocean-voices.mp4",
                poster_url: "https://picsum.photos/512?random=4",
                outil_Ai: "None",
              },
            ],
          },
          {
            UserId: 2,
            last_name: "Johnson",
            collaborateur: "no",
            email: "johnson@example.com",
            school: "LA Film Academy",
            country: "USA",
            bio: "Director experimental.",
            title: "Shadows & Light",
            duration: 80,
            status: "draft",
            description: "Cortometraje experimental.",
            category: "Experimental",
            generate_Ai: "full_ai",
            Files: [
              {
                subtitle: "English",
                film_url: "https://cdn.example.com/films/shadows-light.mp4",
                poster_url: "https://picsum.photos/512?random=6",
                outil_Ai: "RunwayML",
              },
              {
                subtitle: "Spanish",
                film_url: "https://cdn.example.com/films/shadows-light-es.mp4",
                poster_url: "https://picsum.photos/512?random=5",
                outil_Ai: "RunwayML",
              },
            ],
          },
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
            description:
              "Documental sobre la flora y fauna de bosques antiguos.",
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
            UserId: 12,
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
      ]);
      await PlaylistFilm.bulkCreate([
         { PlaylistId: 1, FilmId: 1, UserId: 3 }, // Hanako Committee
  { PlaylistId: 1, FilmId: 2, UserId: 4 }, // Ken Committee
  { PlaylistId: 1, FilmId: 3, UserId: 5 }, // Fumiko Committee
  { PlaylistId: 1, FilmId: 4, UserId: 3 },
  { PlaylistId: 1, FilmId: 5, UserId: 4 },
  { PlaylistId: 1, FilmId: 6, UserId: 9 },
  { PlaylistId: 1, FilmId: 7, UserId: 3 },
  { PlaylistId: 1, FilmId: 8, UserId: 4 },
  { PlaylistId: 1, FilmId: 9, UserId: 9 },
  { PlaylistId: 1, FilmId: 10, UserId: 3 },
  { PlaylistId: 1, FilmId: 11, UserId: 4 },
  { PlaylistId: 1, FilmId: 12, UserId: 9 },

  // Playlist 2: ACCEPTED (UserId 2) — 例として少数
  { PlaylistId: 2, FilmId: 1, UserId: 3 },
  { PlaylistId: 2, FilmId: 3, UserId: 4 },
  { PlaylistId: 2, FilmId: 5, UserId: 9 },

  // Playlist 3: REFUSED (UserId 1) — 例として少数
  { PlaylistId: 3, FilmId: 2, UserId: 3 },
  { PlaylistId: 3, FilmId: 4, UserId: 4 },
  { PlaylistId: 3, FilmId: 6, UserId: 9 },

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

      // --- ANNOTATIONS ---
      await Annotation.bulkCreate([
        {
          UserId: 1,
          FilmId: films[2].id,
          content: "Revisar escenas iniciales",
        },
        { UserId: 2, FilmId: films[0].id, content: "Nota sobre iluminación" },
        {
          UserId: 1,
          FilmId: films[1].id,
          content: "Agregar efectos visuales en la mitad",
        },
      ]);

      // --- PRICES ---
      const prices = await Price.bulkCreate([
        { FilmId: films[0].id, SponsorId: sponsors[0].id },
        { FilmId: films[2].id, SponsorId: sponsors[1].id },
        { FilmId: films[1].id, SponsorId: sponsors[2].id },
      ]);

      // --- FILMSPONSOR ---
      await FilmSponsor.bulkCreate([
        { FilmId: films[0].id, SponsorId: sponsors[0].id },
        { FilmId: films[2].id, SponsorId: sponsors[1].id },
        { FilmId: films[1].id, SponsorId: sponsors[2].id },
      ]);

      // --- NOTIFICATIONS ---
      await Notification.bulkCreate([
        { UserId: 1, PriceId: prices[0].id },
        { UserId: 2, PriceId: prices[1].id },
        { UserId: 1, PriceId: prices[2].id },
      ]);
      console.log(" ");
      console.log("✅ DONNÉES DE TEST AJOUTÉES !");
      console.log("═══════════════════════════════════════════");
      console.log("\n📊 Résumé:");
      console.log(`  ✅ films`);
      console.log(`  ✅ fichiers`);
      // console.log(`  ✅ commentaires`);
      console.log(`  ✅ annotations`);
      console.log(`  ✅ playlists`);
      console.log(`  ✅ sélections`);
      console.log(`  ✅ sponsors`);
      console.log(`  ✅ prix`);
      console.log(`  ✅ notifications`);
    } catch (err) {
      return catchError(err);
    }
  } catch (err) {
    console.error("❌ ERREUR SEEDING:", err);
  }
}
