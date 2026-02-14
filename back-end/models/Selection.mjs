import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
const Selection = sequelize.define("Selection", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
export default Selection;