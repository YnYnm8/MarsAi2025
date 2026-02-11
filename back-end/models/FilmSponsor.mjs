import { DataTypes } from "sequelize"; 
import sequelize from "../config/database.mjs";

const FilmSponsor = sequelize.define("FilmSponsor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
}, {
  timestamps: false 
});

export default FilmSponsor;