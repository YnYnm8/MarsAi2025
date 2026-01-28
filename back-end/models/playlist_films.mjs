import { DataTypes } from "sequelize;
import sequelize, { Sequelize } from "../config/database.mjs";


export const PlaylistFilm = sequelize.define("Playlist", {
    id: {
        type: DataTypes.INTGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_fk: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    film_fk: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type:DataTypes.ENUM('NON','A debattre','autre'),
        allowNull:false
    },
    other_reason:{
        type:DataTypes.TEXT,
        allowNull:true
    },
})