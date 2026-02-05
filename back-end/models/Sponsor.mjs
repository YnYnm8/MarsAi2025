import sequelize from "../config/database.mjs";
import { DataTypes } from "sequelize";

const Sponsor = sequelize.define("Sponsor", {
    name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
});



export default Sponsor;