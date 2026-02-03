import sequelize from "../config/database.mjs";
import { DataTypes } from "sequelize";

const File = sequelize.define("File", {
    subtitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Subtitle est obligatoire" }
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

});


export default File;