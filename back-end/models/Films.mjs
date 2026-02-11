import sequelize from "../config/database.mjs";
import { DataTypes } from "sequelize";

const Film = sequelize.define("Film", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    collaborateur: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    school: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
    country: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    socialNetworks: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
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
    generate_Ai: {
        type: DataTypes.ENUM("full_ai", "hybrid"),
        allowNull: false,
    },
}, {
    timestamps: true
});

export default Film;