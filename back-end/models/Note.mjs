import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const Note = sequelize.define("Note", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    score:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, 
    {
        timestamps: true
    });
export default Note;