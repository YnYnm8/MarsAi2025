import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const Comment = sequelize.define("Comment", {
    content: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        timestamps: true
    });
export default Comment;