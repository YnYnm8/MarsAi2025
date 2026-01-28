import { DataTypes } from "sequelize;
import sequelize, { Sequelize } from "../config/database.mjs";


export const Playlist = sequelize.define("Playlist", {
    id: {
        type: DataTypes.INTGER,
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