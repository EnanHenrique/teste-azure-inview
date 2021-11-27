'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let maquina = sequelize.define('maquina',{
		id_maquina: {
			field: 'id_maquina',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		setor: {
			field: 'setor',
			type: DataTypes.STRING,
			allowNull: false
		},
		fk_empresa: {
			field: 'fk_empresa',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		token:{
			firld: 'token',
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, 
	{
		tableName: 'maquina', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return maquina;
};