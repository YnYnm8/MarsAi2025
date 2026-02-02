import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";


export const Playlists = sequelize.define("Playlists", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 300]
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "users",
            key: "id",
        },
    },
}, {
    tableName: "playlists",
    timestamps: true
}
)