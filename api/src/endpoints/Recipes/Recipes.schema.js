const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,   //el UUID gnera un numero aleatrio con letras y numeros que va a ser unico, especipico y no se va a repetir
      defaultValue: DataTypes.UUIDV4,   //
      allowNull: false,   //allowNull : te permito que este vacio y si lo dejo en false da a saber que no puede estar vacio
      primaryKey: true    //clave primaria --> id. 
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false
    },

// archivo    esquema --> hacer


    score:{
      type: DataTypes.STRING,
      allowNull: true
    },
    healthScore:{
      type: DataTypes.STRING,
      allowNull: true
    },
    step:{
      type: DataTypes.STRING, 
      allowNull: true
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
