import sequelize from "../config/database.mjs";
import { DataTypes } from "sequelize";

export const Candidature = sequelize.define("Candidature", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "L'email est obligatoire." },
            len: { args: [2, 50], msg: "2 a 50 caractères." }
        }
    },
    school: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },

    submitted_at: {
        type: DataTypes.DATE,
        allowNull: false,
        
    },
    
  
}, {
    tableName: "candidature",
    timestamps: true
})


