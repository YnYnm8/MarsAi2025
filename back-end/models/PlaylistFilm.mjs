import sequelize from "../config/database.mjs";
import { DataTypes } from "sequelize";

const PlaylistFilm = sequelize.define("PlaylistFilm", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

 
});

export default PlaylistFilm;
