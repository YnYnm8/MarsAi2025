import sequelize from "../config/database.mjs"
import { DataTypes } from "sequelize";

const Selection = sequelize.define("Selection", {
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});


export default Selection;