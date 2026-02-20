import sequelize from "../config/database.mjs"
import { DataTypes } from "sequelize";

const Selection = sequelize.define("Selection", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },

});


export default Selection;