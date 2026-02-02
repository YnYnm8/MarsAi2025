import { Playlists } from "./playlists.mjs";
import { Film } from "./film.mjs";
import { PlaylistsFilms } from "./playlists_films.mjs";
import { User } from "./user.mjs";
import { Candidature} from "./candidature.mjs"

// manyu to many
Playlists.belongsToMany(Film, {
    through: PlaylistsFilms,
    foreignKey: "playlist_id",
    onDelete: "CASCADE"
});

Film.belongsToMany(Playlists, {
    through: PlaylistsFilms,
    foreignKey: "film_id",
    onDelete: "CASCADE"
});
// User <-> Film
User.hasMany(Film, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
Film.belongsTo(User, {
    foreignKey: "user_id",
});
//USER <-> Playlist
User.hasMany(Playlists, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
Playlists.belongsTo(User, {
    foreignKey: "user_id",
});




export {
  Film,
  Playlists,
  PlaylistsFilms,
  User,
  Candidature
};
