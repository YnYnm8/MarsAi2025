import { DataTypes, STRING } from "sequelize";
import sequelize from "../config/database.mjs";
const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: true,
    },
    email: {
      type: STRING,
      allowNull: true,
    },
    messege: {
      type: STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);
export default Contact;