import sequelize from "../config/database.mjs";
import { DataTypes } from "sequelize";

const Subscriber = sequelize.define("Subscriber", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Empêche d'avoir deux fois le même email en BDD
        validate: {
            isEmail: true // Sécurité supplémentaire de Sequelize
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    subscribedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

export default Subscriber;