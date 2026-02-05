import sequelize from "../config/database.mjs";
import User from "./User.mjs";
import Film from "./Films.mjs";
import Playlist from "./Playlist.mjs";
import Selection from "./Selection.mjs";
import File from "./File.mjs";
import Price from "./Price.mjs";
import Sponsor from "./Sponsor.mjs";
import Workshop from "./Workshop.mjs";
import Notification from "./Notification.mjs";
import Comment from "./Comment.mjs";
import Annotation from "./Annotation.mjs";
import PlaylistFilm from "./PlaylistFilm.mjs";
import WorkshopCategory from "./WorkshopCategory.mjs";
import FilmSponsor from "./FilmSponsor.mjs";




// === User ===
User.hasMany(Film, { foreignKey: "user_id", onDelete: "CASCADE" });
Film.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Playlist, { foreignKey: "user_id", onDelete: "CASCADE" });
Playlist.belongsTo(User, { foreignKey: "user_id" });

User.belongsToMany(Film, { through: Comment, as: 'Commenters', foreignKey: "user_id" });
Film.belongsToMany(User, { through: Comment, as: 'Commenters', foreignKey: "film_id" });


User.belongsToMany(Film, { through: Annotation, as: 'Annotators' ,foreignKey: "user_id" });
Film.belongsToMany(User, { through: Annotation, as: 'Annotators',  foreignKey: "film_id" });

User.hasMany(Workshop, { foreignKey: "user_id" });
Workshop.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

// === Film ===
Film.belongsToMany(Playlist, { through: PlaylistFilm, foreignKey: "film_id" });
Playlist.belongsToMany(Film, { through: PlaylistFilm, foreignKey: "playlist_id" });

Film.hasMany(File, { foreignKey: "film_id", onDelete: "CASCADE" });
File.belongsTo(Film, { foreignKey: "film_id" });


Film.hasMany(Price, { foreignKey: "film_id" });
Price.belongsTo(Film, { foreignKey: "film_id" });

Film.belongsToMany(Sponsor, { through: FilmSponsor, foreignKey: "film_id" });
Sponsor.belongsToMany(Film, { through: FilmSponsor, foreignKey: "sponsor_id" });

Film.belongsToMany(Selection, { through: "SelectionFilm", foreignKey: "film_id" });
Selection.belongsToMany(Film, { through: "SelectionFilm", foreignKey: "selection_id" });

// === Sponsor / Price ===
Sponsor.hasMany(Price, { foreignKey: "sponsor_id" });
Price.belongsTo(Sponsor, { foreignKey: "sponsor_id" });

// === Workshop / Category ===
WorkshopCategory.hasMany(Workshop, { foreignKey: "category_id" });
Workshop.belongsTo(WorkshopCategory, { foreignKey: "category_id" });

// === Workshop / Notification ===
Workshop.hasMany(Notification, { foreignKey: "workshop_id" });
Notification.belongsTo(Workshop, { foreignKey: "workshop_id" });

// === Price / Notification ===
Price.hasMany(Notification, { foreignKey: "Price_id" });
Notification.belongsTo(Price, { foreignKey: "Price_id" });

// === Export ===
export {
  User, Film, Playlist, Selection,
  File, Price, Sponsor, Workshop, WorkshopCategory,
  Notification
};
