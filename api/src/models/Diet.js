const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('diet', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        
        //no le paso el ID ya que NO vamos a tener otro tipo de dato de "typeOfDiet"
        // sequelize por defecto me genera un ID cuando no se lo paso
        name:{
            type: DataTypes.STRING,
            allowNull: false,   //allowNull : te permito que este vacio y si lo dejo en false da a saber que no puede estar vacio
        },
    })
}
