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
        ],
        { include: [File] },
      );

      const playlists = await Playlist.bulkCreate([
        { PlaylistId: 1, UserId: 1, status: "NOT_WATCHED" },
        { PlaylistId: 2, UserId: 2, status: "ACCEPTED" },
        { PlaylistId: 3, UserId: 1, status: "REFUSED" },
      ]);
      await PlaylistFilm.bulkCreate([
        { PlaylistId: 1, FilmId: 1, UserId: 1 },
        { PlaylistId: 3, FilmId: 2, UserId: 1 },
        { PlaylistId: 2, FilmId: 3, UserId: 2 },
        { PlaylistId: 3, FilmId: 4, UserId: 2 },
       
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
