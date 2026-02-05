import Film from "../models/Films.mjs"
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

// Seed completo
export async function seedAll() {

  // --- SPONSORS ---
  const sponsors = await Sponsor.bulkCreate([
    { name: 'CineWorld' },
    { name: 'FilmFest Inc.' },
    { name: 'ArtHouse Studio' }
  ]);

  // --- SELECTIONS ---
  const selections = await Selection.bulkCreate([
    { name: 'Festival Internacional 2026' },
    { name: 'Competencia de Cortometrajes' }
  ]);

  // --- FILMS + FILES ---
  // Asumimos que los usuarios ya existen con id 1 y 2
  const films = await Film.bulkCreate([
    {
      user_id: 1,
      last_name: 'Smith',
      collaborateur: 'yes',
      email: 'smith@example.com',
      school: 'NY Film School',
      country: 'USA',
      bio: 'Director de cine dramático.',
      socialNetworks: { instagram: '@smith_director' },
      title: 'The Silent Night',
      duration: 120,
      status: 'published',
      description: 'Un drama sobre la soledad.',
      category: 'Drama',
      generate_Ai: 'hybrid',
      Files: [
        { subtitle: 'English', film_url: 'https://cdn.example.com/films/silent-night.mp4', poster_url: 'https://cdn.example.com/posters/silent-night.jpg', outil_Ai: 'RunwayML' },
        { subtitle: 'French', film_url: 'https://cdn.example.com/films/silent-night-fr.mp4', poster_url: 'https://cdn.example.com/posters/silent-night.jpg', outil_Ai: 'None' }
      ]
    },
    {
      user_id: 1,
      last_name: 'Smith',
      collaborateur: 'no',
      email: 'smith@example.com',
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
        { subtitle: 'English', film_url: 'https://cdn.example.com/films/fragments.mp4', poster_url: 'https://cdn.example.com/posters/fragments.jpg', outil_Ai: 'Stable Diffusion' }
      ]
    },
    {
      user_id: 2,
      last_name: 'Johnson',
      collaborateur: 'yes',
      email: 'johnson@example.com',
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
        { subtitle: 'English', film_url: 'https://cdn.example.com/films/ocean-voices.mp4', poster_url: 'https://cdn.example.com/posters/ocean-voices.jpg', outil_Ai: 'None' }
      ]
    },
    {
      user_id: 2,
      last_name: 'Johnson',
      collaborateur: 'no',
      email: 'johnson@example.com',
      school: 'LA Film Academy',
      country: 'USA',
      bio: 'Director experimental.',
      title: 'Shadows & Light',
      duration: 80,
      status: 'draft',
      description: 'Cortometraje experimental.',
      category: 'Experimental',
      generate_Ai: 'full_ai',
      Files: [
        { subtitle: 'English', film_url: 'https://cdn.example.com/films/shadows-light.mp4', poster_url: 'https://cdn.example.com/posters/shadows-light.jpg', outil_Ai: 'RunwayML' },
        { subtitle: 'Spanish', film_url: 'https://cdn.example.com/films/shadows-light-es.mp4', poster_url: 'https://cdn.example.com/posters/shadows-light.jpg', outil_Ai: 'RunwayML' }
      ]
    }
  ], { include: [File] });

  // --- PLAYLISTS ---
  const playlists = await Playlist.bulkCreate([
    { status: 'public', user_id: 1 },
    { status: 'private', user_id: 2 }
  ]);

  // --- PLAYLISTFILM ---
  await PlaylistFilm.bulkCreate([
    { playlist_id: playlists[0].id, film_id: films[0].id },
    { playlist_id: playlists[0].id, film_id: films[1].id },
    { playlist_id: playlists[1].id, film_id: films[2].id },
    { playlist_id: playlists[1].id, film_id: films[3].id }
  ]);

  // --- COMMENTS ---
  await Comment.bulkCreate([
    { user_id: 1, film_id: films[2].id, content: 'Excelente documental!' },
    { user_id: 2, film_id: films[0].id, content: 'Muy interesante!' },
    { user_id: 1, film_id: films[0].id, content: 'Gran iluminación en la escena final.' }
  ]);

  // --- ANNOTATIONS ---
  await Annotation.bulkCreate([
    { user_id: 1, film_id: films[2].id, content: 'Revisar escenas iniciales' },
    { user_id: 2, film_id: films[0].id, content: 'Nota sobre iluminación' },
    { user_id: 1, film_id: films[1].id, content: 'Agregar efectos visuales en la mitad' }
  ]);

  // --- PRICES ---
  const prices = await Price.bulkCreate([
    { film_id: films[0].id, sponsor_id: sponsors[0].id },
    { film_id: films[2].id, sponsor_id: sponsors[1].id },
    { film_id: films[1].id, sponsor_id: sponsors[2].id }
  ]);

  // --- FILMSPONSOR ---
  await FilmSponsor.bulkCreate([
    { film_id: films[0].id, sponsor_id: sponsors[0].id },
    { film_id: films[2].id, sponsor_id: sponsors[1].id },
    { film_id: films[1].id, sponsor_id: sponsors[2].id }
  ]);

  // --- SELECTIONFILM (relacion films con selections) ---
  await films[0].addSelection(selections[0]);
  await films[2].addSelections([selections[0], selections[1]]);
  await films[3].addSelection(selections[1]);

  // --- NOTIFICATIONS ---
  await Notification.bulkCreate([
    { user_id: 1, Price_id: prices[0].id },
    { user_id: 2, Price_id: prices[1].id },
    { user_id: 1, Price_id: prices[2].id }
  ]);

  console.log(' Seed completado: Films, Files, Comments, Annotations, Playlists, Selections, Sponsors, Prices y Notifications. ✅');
}
