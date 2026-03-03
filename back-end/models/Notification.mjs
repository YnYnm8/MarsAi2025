import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs"; 

/**
 * Modèle Notification
 * Gère toutes les notifications en temps réel et persistantes pour les utilisateurs de la plateforme MarsAI.
 */
const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM(
        // --- Réalisateur ---
        "FILM_SUBMITTED",
        "FILM_PENDING_REVIEW",
        "FILM_APPROVED",
        "FILM_PENDING",
        "FILM_REJECTED_ADMIN",
        "FILM_SELECTED",
        "FILM_NOT_SELECTED",
        "FILM_MODIFICATION_ASKED",
        "FILM_MODIFICATION_OK",
        "FILM_MODIFICATION_KO",
        "FILM_BANNED",

        // --- Comité de sélection ---
        "FILMS_ASSIGNED",
        "SELECTION_OPENED",
        "SELECTION_CLOSED",

        // --- Administrateur ---
        "TICKET_CREATED",
        "MODIFICATION_REQUEST",
        "NEW_FILM_PENDING",

        // --- Global ---
        "SYSTEM"
      ),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: { notEmpty: true, len: [1, 150] },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    emailSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: "notifications",
    timestamps: true,
    indexes: [{ fields: ["userId", "isRead"] }, { fields: ["type"] }],
  }
);

export default Notification;