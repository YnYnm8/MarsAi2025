import sequelize from "../config/database.mjs";
import { DataTypes } from "sequelize";

const Playlist = sequelize.define("Playlist", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {

        timestamps: true
    });


export default Playlist;