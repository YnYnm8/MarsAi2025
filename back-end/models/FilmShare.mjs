import sequelize from "../config/database.mjs";
import { DataTypes } from "sequelize";

const FilmShare = sequelize.define("FilmShare", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    filmId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ipAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true
});

export default FilmShare;