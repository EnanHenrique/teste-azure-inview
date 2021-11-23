'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let componente_maquina = sequelize.define('componente_maquina',{
		fk_maquina: {
			field: 'fk_maquina',
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		},		
		fk_componente: {
			field: 'fk_componente',
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		}
	}, 
	{
		tableName: 'componente_maquina', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return componente_maquina;
};
