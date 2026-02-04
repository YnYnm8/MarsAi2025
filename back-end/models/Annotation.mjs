import sequelize from "../config/database.mjs";
import { DataTypes } from "sequelize";

const Annotation = sequelize.define("Annotation", {
    content: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true
});


export default Annotation;