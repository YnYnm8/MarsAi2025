import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const Workshop = sequelize.define(
  "Workshop",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },

    coachName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    participants: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    resatotales:{
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    taux:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },

    lieu: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subtitle: {
      type: DataTypes.STRING(250),
    },
  },
  {
    timestamps: true,
  }
);

export default Workshop;
