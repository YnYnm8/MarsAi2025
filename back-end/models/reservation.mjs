import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const Reservation = sequelize.define(
  "Reservation",
  {

id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nom:{
    type: DataTypes.STRING(250),
    allowNull: false,
    },

 prenom:{
    type: DataTypes.STRING(250),
    allowNull: false,
    },

email:{
    type:DataTypes.STRING(250),
    allowNull: false,

},

profession: {
    type:DataTypes.STRING(250),
    allowNull: false,
},


  }
);


  export default Reservation;