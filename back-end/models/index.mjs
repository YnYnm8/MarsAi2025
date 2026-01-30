import { Film } from "./film.mjs";
import { Playlist } from "./playlist.mjs";
import { PlaylistFilm } from "./playlist_films.mjs";
import { User } from "./user.mjs";
import { Candidature} from "./candidature.mjs"

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
  User,
  Candidature
};
