var express = require('express');
const app = express();
var router = express.Router();
var sequelize = require('../models').sequelize;
var cadastro_empresa = require('../models').cadastro_empresa;
var cadastro_funcionario = require('../models').cadastro_funcionario;
var maquina = require('../models').maquina;
var componente_maquina = require('../models').componente_maquina;
var env = process.env.NODE_ENV || 'development';

let sessoes = [];
/* Recuperar usuário por login e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var email = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login	
	
	let instrucaoSql = `select * from cadastro_empresa where email='${email}' and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: cadastro_empresa
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.email);
			console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('email e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo email e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Recuperar usuário (funcionario) por login e senha */
router.post('/autenticar/funcionario', function(req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var email = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login	
	
	let instrucaoSql = `select * from cadastro_funcionario where login='${email}' and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: cadastro_funcionario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.login);
			console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('email e/ou senha inválido(s) do funcionario');
		} else {
			res.status(403).send('Mais de um usuário (funcionario) com o mesmo email e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Cadastrar Empresa */
router.post('/cadastrar', function(req, res, next) {
	console.log('Criando um usuário');

	cadastro_empresa.create({
		nome_empresa : req.body.name_nome_empresa,
		cnpj : req.body.name_cnpj,
		telefone: req.body.name_telefone,
		email: req.body.name_email,
		senha: req.body.name_senha,
		cep: req.body.name_cep,
		logradouro: req.body.name_logradouro,
		numero: req.body.name_numero,
		uf: req.body.name_uf,
		cidade: req.body.name_cidade,
		bairro: req.body.name_bairro
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Cadastrar Funcionario */
router.post('/cadastrar_funcionario/:id_cadastro_empresa/:id_cadastro_funcionario', function(req, res, next) {
	console.log('Criando um usuário');

	let id_cadastro_empresa = req.params.id_cadastro_empresa;
	// let id_cadastro_funcionario = req.params.id_cadastro_funcionario;

	cadastro_funcionario.create({
		nome : req.body.name_nome,
		login : req.body.name_login,
		senha : req.body.name_senha,
		telefone : req.body.name_telefone,
		fk_empresa : id_cadastro_empresa
		// fk_gestor : id_cadastro_funcionario
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Cadastrar Funcionario */
router.post('/cadastrar_funcionario_empresa/:id_cadastro_empresa', function(req, res, next) {
	console.log('Criando um usuário');

	let id_cadastro_empresa = req.params.id_cadastro_empresa;

	cadastro_funcionario.create({
		nome : req.body.name_nome,
		login : req.body.name_login,
		senha : req.body.name_senha,
		telefone : req.body.name_telefone,
		fk_empresa : id_cadastro_empresa
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});


/* Cadastrar setor da maquina */
router.post('/cadastrar_maquina/:id_cadastro_empresa', function(req, res, next) {
	console.log('Criando um usuário');
	
	let id_cadastro_empresa = req.params.id_cadastro_empresa;

	maquina.create({
		setor : req.body.name_setor,
		fk_empresa : id_cadastro_empresa
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

router.post('/cadastrar_componente/:componentes', function(req, res, next) {
	console.log('Criando um usuário');

	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `SELECT * FROM maquina ORDER BY id_maquina DESC LIMIT 1;`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `SELECT TOP 1 * FROM maquina ORDER BY id_maquina DESC;`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}

	
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: maquina
	}).then(resultado => {

		console.log(`Maquinas encontradas: ${resultado}`)
		let id_maquina = resultado[0].dataValues.id_maquina

		let componentes_array = req.params.componentes.split(",");

		for(let i=0;i<componentes_array.length;i++){
			let componente = Number(componentes_array[i]);
	
			componente_maquina.create({
				fk_maquina : id_maquina,
				fk_componente: componente
				
			}).then(resultado => {
				console.log(`Registro criado: ${resultado}`)
				res.send(resultado);
			}).catch(erro => {
				console.error(erro);
				res.status(500).send(erro.message);
			});
		}
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});


/* Verificação de usuário */
router.get('/sessao/:email', function(req, res, next) {
	let email = req.params.email;
	console.log(`Verificando se o usuário ${email} tem sessão`);
	
	let tem_sessao = false;
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] == email) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${email} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}
	
});


/* Logoff de usuário */
router.get('/sair/:login', function(req, res, next) {
	let login = req.params.login;
	console.log("login EMPRESA: ", login)
	console.log(`Finalizando a sessão do usuário ${login}`);
	let nova_sessoes = []
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] != login) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function(req, res, next) {
	console.log('Recuperando todos os usuários');
	cadastro_empresa.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;
