import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const PlaylistFilm = sequelize.define("PlaylistFilm", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    // Ne définis PAS playlist_id ou film_id ici manuellement !
    // Sequelize va les créer tout seul grâce aux associations.
}, {
    timestamps: false // Souvent inutile pour une table de liaison
});

export default PlaylistFilm;