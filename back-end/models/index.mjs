import { Film } from "./film.mjs";
import { Playlist } from "./playlist.mjs";
import { PlaylistFilm } from "./playlist_films.mjs";

// MANY TO MANY
Playlist.belongsToMany(Film, {
  through: PlaylistFilm,
  foreignKey: "playlist_id"
});

Film.belongsToMany(Playlist, {
  through: PlaylistFilm,
  foreignKey: "film_id"
});

export {
  Film,
  Playlist,
  PlaylistFilm,
};
