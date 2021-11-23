'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let cadastro_funcionario = sequelize.define('cadastro_funcionario',{
		id_cadastro_funcionario: {
			field: 'id_cadastro_funcionario',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			field: 'nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		login: {
			field: 'login',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		telefone: {
			field: 'telefone',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		fk_empresa: {
			field: 'fk_empresa',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		fk_gestor: {
			field: 'fk_gestor',
			type: DataTypes.INTEGER,
			allowNull: true
		},
	}, 
	{
		tableName: 'cadastro_funcionario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return cadastro_funcionario;
};
