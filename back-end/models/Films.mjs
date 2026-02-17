import sequelize from "../config/database.mjs";
import { DataTypes } from "sequelize";

const Film = sequelize.define("Film", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    collaborateur: {
        type: DataTypes.STRING,
        allowNull: true
    },
    generate_Ai: {
        type: DataTypes.ENUM("full_ai", "hybrid"),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "submitted",
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    shares: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },

}, {
    timestamps: true
});

export default Film;