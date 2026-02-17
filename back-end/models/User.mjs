import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
import { hash, verify } from "argon2";

export const User = sequelize.define("User", {
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
        type: DataTypes.ENUM('visitor', 'director', 'admin', 'committee'),
        defaultValue: 'visitor'
    },

    // INFOS PROFIL (Liées à la personne)
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    school: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
    country: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            notEmpty: true 
        }
    },
    socialNetworks: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    isEmailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    lastLoginAt: { type: DataTypes.DATE, allowNull: true },
},
    {
        timestamps: true,
    }
);

// Hooks Argon2 (Hashage mot de passe)
User.beforeCreate(async (user) => {
    if (user.changed("password")) user.password = await hash(user.password);
});
User.beforeUpdate(async (user) => {
    if (user.changed("password")) user.password = await hash(user.password);
});

User.prototype.validatePassword = async function (password) {
    try {
        const { verify } = await import("argon2");
        return await verify(this.password, password);
    } catch (error) { return false; }
};

User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
};

export default User;