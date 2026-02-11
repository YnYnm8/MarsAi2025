import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const Comment = sequelize.define("Comment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    content: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        timestamps: true
    });
export default Comment;