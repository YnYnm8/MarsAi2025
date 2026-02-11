import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
import { hash, verify } from "argon2";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
      set(value) {
        this.setDataValue("email", value.toLowerCase().trim());
      },
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    firstName: { type: DataTypes.STRING(100) },
    lastName: { type: DataTypes.STRING(100) },

    role: {
        type: DataTypes.ENUM('visitor', 'realisator', 'admin', 'committee'),
        defaultValue: 'visitor'
    },


    // Champs Profil 
    // stockage RS en JSON

    // Champs Profil
    isEmailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },

    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },

    lastLoginAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    timestamps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  },
);

// Hooks Argon2

User.beforeCreate(async (user) => {
  if (user.changed("password")) {
    user.password = await hash(user.password);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await hash(user.password);
  }
});

// Vérification du mot de passe
User.prototype.validatePassword = async function (password) {
  try {
    const { verify } = await import("argon2");
    return await verify(this.password, password); // compare hash / mot de passe
  } catch (error) {
    return false;
  }
};

// Supprimer le mot de passe des réponses JSON
User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

export default User;
