import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";


export const PlaylistFilm = sequelize.define("PlaylistFilm", {
    id: {
        type: DataTypes.INTEGER,
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