import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const WorkshopCategory = sequelize.define(
  "WorkshopCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: true, // crée automatiquement createdAt & updatedAt
  }
);

export default WorkshopCategory;
