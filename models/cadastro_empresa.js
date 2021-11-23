	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let cadastro_empresa = sequelize.define('cadastro_empresa',{
		id_cadastro_empresa: {
			field: 'id_cadastro_empresa',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome_empresa: {
			field: 'nome_empresa',
			type: DataTypes.STRING,
			allowNull: false
		},
		cnpj: {
			field: 'cnpj',
			type: DataTypes.STRING,
			allowNull: false
		},
		telefone: {
			field: 'telefone',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		cep: {
			field: 'cep',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		logradouro: {
			field: 'logradouro',
			type: DataTypes.STRING,
			allowNull: false
		},
		numero: {
			field: 'numero',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		uf: {
			field: 'uf',
			type: DataTypes.STRING,
			allowNull: false
		},
		cidade: {
			field: 'cidade',
			type: DataTypes.STRING,
			allowNull: false
		},
		bairro: {
			field: 'bairro',
			type: DataTypes.STRING,
			allowNull: false
		},
	}, 
	{
		tableName: 'cadastro_empresa', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return cadastro_empresa;
};
