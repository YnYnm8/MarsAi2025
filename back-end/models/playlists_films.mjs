import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";


export const PlaylistsFilms = sequelize.define("PlaylistsFilms", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    playlist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "playlists",
            key: "id",
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        }

    },
    film_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
         references: {
            model: "films",
            key: "id",
        },
    },
   }, {
    tableName: "playlist_films",
    timestamps: false
});

