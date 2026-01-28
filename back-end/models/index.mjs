import { Playlist } from "./playlist.mjs";
import { Film } from "./film.mjs";
import { PlaylistFilm } from "./playlist_films.mjs";
import { User } from "./user.mjs";

// manyu to many
Playlist.belongsToMany(Film, { through: PlaylistFilm, foreignKey: "playlist_id" });
Film.belongsToMany(Playlist, { through: PlaylistFilm, foreignKey: 'film_id' });

export {
  Film,
  Playlist,
  PlaylistFilm,
  User
};
