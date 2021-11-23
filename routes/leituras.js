var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var maquina = require('../models').maquina;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas maquinas por gestor */
router.get('/maquinas/:id_cadastro_funcionario', function(req, res, next) {
	
	var id_funcionario = req.params.id_cadastro_funcionario;

	console.log(`Recuperando maquinas`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select setor,id_maquina from maquina inner join cadastro_funcionario 
		on maquina.fk_empresa = cadastro_funcionario.fk_empresa where id_cadastro_funcionario = ${id_funcionario} 
		order by setor;`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select setor,id_maquina from maquina inner join cadastro_funcionario 
		on maquina.fk_empresa = cadastro_funcionario.fk_empresa where id_cadastro_funcionario = ${id_funcionario} 
		order by setor;`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		model: maquina,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.get('/estado_maquina/:id_cadastro_empresa/:qtd_maquina', function(req, res, next) {
	console.log('Recuperando estado das maquinas');
	
	var id_empresa = req.params.id_cadastro_empresa;
	var quantidade = req.params.qtd_maquina;	

	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select fk_maquina,cpu_porcentagem,cpu_freq,ram_porcentagem,ram_uso,status_processo from medida_analytics 
        inner join maquina on fk_empresa = ${id_empresa} order by id_medida_analytics  desc limit ${quantidade};`;
						
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top ${quantidade} fk_maquina,cpu_porcentagem,cpu_freq,ram_porcentagem,ram_uso,status_processo from medida_analytics 
        inner join maquina on fk_empresa = ${id_empresa} order by id_medida_analytics  desc;`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.get('/leitura_tempo_real_cpu/:maquina', function(req, res, next) {
	console.log('Recuperando medidas em tempo real CPU');
	
	var maquina = req.params.maquina;
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select  cpu_porcentagem from medida_analytics where fk_maquina = ${maquina} order by fk_maquina desc limit 1`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select TOP 1 cpu_porcentagem from medida_analytics where fk_maquina = ${maquina} order by fk_maquina desc `;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.get('/leitura_tempo_real_ram/:maquina', function(req, res, next) {
	console.log('Recuperando medidas em tempo real RAM');
	
	var maquina = req.params.maquina;


	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select  ram_porcentagem from medida_analytics where fk_maquina = ${maquina} order by fk_maquina desc limit 1;`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select TOP 1 ram_porcentagem from medida_analytics where fk_maquina = ${maquina} order by fk_maquina desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});



router.get('/leitura_tempo_real_disco/:maquina', function(req, res, next) {
	console.log('Recuperando medidas em tempo real disco');
	
	var maquina = req.params.maquina;


	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select  disco_porcentagem from medida_analytics where fk_maquina = ${maquina} order by fk_maquina desc limit 1;`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select TOP 1 disco_porcentagem from medida_analytics where fk_maquina = ${maquina} order by fk_maquina desc;`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});



router.get('/leitura_tempo_real_freq_cpu/:maquina', function(req, res, next) {
	console.log('Recuperando frequência da CPU');
	
	var maquina = req.params.maquina;


	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select  cpu_freq,cpu_porcentagem from medida_analytics where fk_maquina = ${maquina} order by fk_maquina desc limit 1`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select TOP 1 cpu_freq,cpu_porcentagem from medida_analytics where fk_maquina = ${maquina} order by fk_maquina desc `;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});





router.get('/leitura_tempo_real_uso_ram/:maquina', function(req, res, next) {
	console.log('Recuperando uso da RAM');
	
	var maquina = req.params.maquina;


	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select ram_uso,ram_porcentagem from medida_analytics where fk_maquina = ${maquina} order by fk_maquina desc limit 1`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select TOP 1 ram_uso,ram_porcentagem from medida_analytics where fk_maquina = ${maquina} order by fk_maquina desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/leitura_tempo_real_status/:maquina', function(req, res, next) {
	console.log('Recuperando status scada');
	
	var maquina = req.params.maquina;


	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select status_processo from medida_analytics where fk_maquina = ${maquina} order by fk_maquina desc limit 1;`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select TOP 1 status_processo from medida_analytics where fk_maquina = ${maquina} order by fk_maquina desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/leitura_tempo_real/:maquina', function(req, res, next) {
	console.log('Recuperando medidas em tempo real CPU');
	
	var maquina = req.params.maquina;
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select  cpu_porcentagem,ram_porcentagem,disco_porcentagem,cpu_freq,ram_uso,status_processo
		 from medida_analytics where fk_maquina = ${maquina} order by id_medida_analytics desc limit 1;`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select TOP 1 cpu_porcentagem,ram_porcentagem,disco_porcentagem,cpu_freq,ram_uso,status_processo
		from medida_analytics where fk_maquina = ${maquina} order by id_medida_analytics desc;`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.get('/leitura_historico_cpu/:maquina', function(req, res, next) {
	console.log('Recuperando medidas CPU');
	
	var maquina = req.params.maquina;


	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select cpu_porcentagem,DATE_FORMAT(data_hora,"%H:%i") as data from medida_analytics where fk_maquina = ${maquina}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select cpu_porcentagem, CONVERT(char(5),data_hora,108) as data from medida_analytics where fk_maquina = ${maquina}`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});



router.get('/leitura_historico_ram/:maquina', function(req, res, next) {
	console.log('Recuperando medidas RAM');
	
	var maquina = req.params.maquina;


	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select ram_porcentagem,DATE_FORMAT(data_hora,"%H:%i") as data from medida_analytics where fk_maquina = ${maquina}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select ram_porcentagem, CONVERT(char(5),data_hora,108) as data from medida_analytics where fk_maquina = ${maquina}`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.get('/leitura_historico_disco/:maquina', function(req, res, next) {
	console.log('Recuperando medidas DISCO');
	
	var maquina = req.params.maquina;


	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select disco_porcentagem,DATE_FORMAT(data_hora,"%H:%i") as data from medida_analytics where fk_maquina = ${maquina}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select disco_porcentagem, CONVERT(char(5),data_hora,108) as data from medida_analytics where fk_maquina = ${maquina}`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});



router.get('/leitura_historico_status/:maquina', function(req, res, next) {
	console.log('Recuperando Status Scada');
	
	var maquina = req.params.maquina;


	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select status_processo, DATE_FORMAT(data_hora,"%H:%i") as data from medida_analytics where fk_maquina = ${maquina} and status_processo not in ("Ativo","running") order by id_medida_analytics desc limit 6;`;
		
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select TOP 6 status_processo, CONVERT(char(5),data_hora,108) as data from medida_analytics where fk_maquina = ${maquina} and status_processo <> 'Ativo' order by id_medida_analytics desc;`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/leitura_historico_semanal_cpu/:maquina', function(req, res, next) {
	console.log('Recuperando dados semanal da cpu');
	
	var maquina = req.params.maquina;

	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `SELECT round(avg(cpu_porcentagem),0) as "media_semanal" FROM medida_analytics where fk_maquina=${maquina} GROUP BY day(data_hora); `;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `SELECT CAST(ROUND(avg(cpu_porcentagem),2,0) AS NUMERIC(10,0)) as 'media_semanal' FROM medida_analytics where fk_maquina= ${maquina} GROUP BY day(data_hora);`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.get('/leitura_historico_semanal_ram/:maquina', function(req, res, next) {
	console.log('Recuperando dados semanal da ram');
	
	var maquina = req.params.maquina;

	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `SELECT round(avg(ram_porcentagem),0) as "media_semanal" FROM medida_analytics where fk_maquina=${maquina} GROUP BY day(data_hora); `;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `SELECT CAST(ROUND(avg(ram_porcentagem),2,0) AS NUMERIC(10,0)) as 'media_semanal' FROM medida_analytics where fk_maquina= ${maquina} GROUP BY day(data_hora);`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.get('/leitura_historico_semanal_disco/:maquina', function(req, res, next) {
	console.log('Recuperando dados semanal do disco');
	
	var maquina = req.params.maquina;

	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `SELECT round(avg(disco_porcentagem),0) as "media_semanal" FROM medida_analytics where fk_maquina=${maquina} GROUP BY day(data_hora); `;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `SELECT CAST(ROUND(avg(disco_porcentagem),2,0) AS NUMERIC(10,0)) as 'media_semanal' FROM medida_analytics where fk_maquina= ${maquina} GROUP BY day(data_hora);`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});



router.get('/leitura_historico_mensal_cpu/:maquina', function(req, res, next) {
	console.log('Recuperando dados Mensal da cpu');
	
	var maquina = req.params.maquina;

	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `SELECT round(avg(cpu_porcentagem),0) as "media_mensal" FROM medida_analytics where fk_maquina=${maquina} GROUP BY month(data_hora); `;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `SELECT CAST(ROUND(avg(cpu_porcentagem),2,0) AS NUMERIC(10,0)) as "media_mensal" FROM medida_analytics where fk_maquina= ${maquina} GROUP BY month(data_hora);`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});




router.get('/leitura_historico_mensal_ram/:maquina', function(req, res, next) {
	console.log('Recuperando dados Mensal da ram');
	
	var maquina = req.params.maquina;

	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `SELECT round(avg(ram_porcentagem),0) as "media_mensal" FROM medida_analytics where fk_maquina=${maquina} GROUP BY month(data_hora); `;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `SELECT CAST(ROUND(avg(ram_porcentagem),2,0) AS NUMERIC(10,0)) as "media_mensal" FROM medida_analytics where fk_maquina= ${maquina} GROUP BY month(data_hora);`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});




router.get('/leitura_historico_mensal_disco/:maquina', function(req, res, next) {
	console.log('Recuperando dados Mensal do disco');
	
	var maquina = req.params.maquina;

	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `SELECT round(avg(disco_porcentagem),0) as "media_mensal" FROM medida_analytics where fk_maquina=${maquina} GROUP BY month(data_hora); `;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `SELECT CAST(ROUND(avg(disco_porcentagem),2,0) AS NUMERIC(10,0)) as "media_mensal" FROM medida_analytics where fk_maquina= ${maquina} GROUP BY month(data_hora);`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/componentes/:maquina', function(req, res, next) {
	console.log('Recuperando medidas em tempo real CPU');
	
	var maquina = req.params.maquina;
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select fk_componente from componente_maquina where fk_maquina=${maquina}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select fk_componente from componente_maquina where fk_maquina=${maquina}`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


module.exports = router;