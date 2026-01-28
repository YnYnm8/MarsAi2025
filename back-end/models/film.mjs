import sequelize, { Sequelize } from "../config/database.mjs";
import { DataTypes, INTEGER } from "sequelize";

export const Film = sequelize.define("Film", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    candidature_fk: {
        type: DataTypes.INTEGER,
    },
    collaborateur: {
        type: DataTypes.STRING,
        allowNull: true

    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Title est oblogatoire." },
            len: { args: [2, 50], msg: "2 a 50 caractères." }
        }
    },
   
    duration: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Duratation est obligatoire." },
            len: { meg: "Tolérance max 2min" }
        }
    },
    subtitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Subtitle est obligatoire" }
        }

    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Description est obligatoire." }
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Category est obligatoire" }
        }
    },

    film_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { meg: "Film url est obligatore.", }
        }
    },
    poster_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { meg: "poster_url est obligatoire" }
        }
    },
    outil_Ai: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "OutilAI est obligatoire" }
        }
    },
    
    generate_Ai: {
        type: DataTypes.ENUM("full_ai", "hybrid"),
        allowNull: false,
        validate: {
            notNull: { meg: "Generate Ai est obligatoire" }
        }
    },

    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: { meg: "Selected est obligatoire. " }
        }
    },
}, {
    tableName: "films",
    timestamps: true
})