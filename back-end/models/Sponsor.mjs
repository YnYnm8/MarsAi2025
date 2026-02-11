import sequelize from "../config/database.mjs";
import { DataTypes } from "sequelize";

const Sponsor = sequelize.define("Sponsor", {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
});



export default Sponsor;