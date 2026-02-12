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
import Note from "./Note.mjs";
import Annotation from "./Annotation.mjs";
import PlaylistFilm from "./PlaylistFilm.mjs";
import WorkshopCategory from "./WorkshopCategory.mjs";
import FilmSponsor from "./FilmSponsor.mjs";




// === User ===


User.hasMany(Playlist, { onDelete: "CASCADE" });
Playlist.belongsTo(User);


User.belongsToMany(Film, { through: Note, as: 'Notes' });
Film.belongsToMany(User, { through: Note, as: 'Notes' });

User.belongsToMany(Film, { through: Annotation, as: 'Annotators' });
Film.belongsToMany(User, { through: Annotation, as: 'Annotators' });


User.hasMany(Workshop);
Workshop.belongsTo(User);

User.hasMany(Notification);
Notification.belongsTo(User);

// === Film ===
Film.belongsToMany(Playlist, { through: PlaylistFilm});
Playlist.belongsToMany(Film, { through: PlaylistFilm});

Film.hasMany(File, { onDelete: "CASCADE" });
File.belongsTo(Film);


Film.hasMany(Price);
Price.belongsTo(Film);

Film.belongsToMany(Sponsor, { through: FilmSponsor });
Sponsor.belongsToMany(Film, { through: FilmSponsor });

Film.belongsToMany(Selection, { through: "SelectionFilm" });
Selection.belongsToMany(Film, { through: "SelectionFilm" });


// === Sponsor / Price ===
Sponsor.hasMany(Price );
Price.belongsTo(Sponsor);

// === Workshop / Category ===
WorkshopCategory.hasMany(Workshop);
Workshop.belongsTo(WorkshopCategory);

// === Workshop / Notification ===
Workshop.hasMany(Notification);
Notification.belongsTo(Workshop);

// === Price / Notification ===
Price.hasMany(Notification);
Notification.belongsTo(Price);

// PlaylistFilm (履歴テーブル) から参照
PlaylistFilm.belongsTo(Playlist);
PlaylistFilm.belongsTo(Film );
PlaylistFilm.belongsTo(User);



// Playlist → PlaylistFilm
Playlist.hasMany(PlaylistFilm);
Film.hasMany(PlaylistFilm);
User.hasMany(PlaylistFilm);


// === Export ===
export {
  User, Film, Playlist, Selection,
  File, Price, Sponsor, Workshop, WorkshopCategory,
  Notification, Note, Annotation, PlaylistFilm, FilmSponsor
};