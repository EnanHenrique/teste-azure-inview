'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let token = sequelize.define('token',{
		id: {
			field: 'id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		tokenvalues: {
			field: 'tokenvalues',
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		tableName: 'token', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return token;
};