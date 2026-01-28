import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";


export const Playlist = sequelize.define("Playlist", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_fk: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
  },{
    tableName:"playlist",
    timestamps:true
  }
)