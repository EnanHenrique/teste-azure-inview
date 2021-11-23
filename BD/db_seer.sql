CREATE DATABASE db_seer;

use db_seer;

CREATE TABLE cadastro_empresa(
	id_cadastro_empresa INT PRIMARY KEY AUTO_INCREMENT,
    nome_empresa VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    telefone CHAR(11) NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    senha VARCHAR(45) NOT NULL,
	cep CHAR(8) NOT NULL,
    logradouro VARCHAR(45) NOT NULL,
    numero CHAR(6) NOT NULL,
    uf CHAR(2) NOT NULL,
    cidade VARCHAR(45) NOT NULL,
	bairro VARCHAR(45) NOT NULL
);

insert into cadastro_empresa values (null, 'Itaipu', '1234567891234', '44991753624', 'itaipu@gmail.com', 'senha123', '12345678', 'Avenida Lobos', '215', 'PR', 'Foz do Iguaçu', 'Centro');

select * from cadastro_empresa;

CREATE TABLE cadastro_funcionario(
	id_cadastro_funcionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    login VARCHAR(45) UNIQUE NOT NULL,
    senha VARCHAR(45) NOT NULL,
    telefone CHAR(11) NOT NULL,
    fk_empresa INT NOT NULL,
    fk_gestor INT,
    FOREIGN KEY (fk_empresa) REFERENCES cadastro_empresa(id_cadastro_empresa),
    FOREIGN KEY (fk_gestor) REFERENCES cadastro_funcionario(id_cadastro_funcionario)
);

insert into cadastro_funcionario values (null, 'Brandao', 'gestor@login.com', 'senha123', '11997845236', 1, null);

select *  from cadastro_empresa;

CREATE TABLE maquina(
	id_maquina INT PRIMARY KEY AUTO_INCREMENT,
    setor VARCHAR(5) NOT NULL,
    fk_empresa INT NOT NULL,
    FOREIGN KEY(fk_empresa) REFERENCES cadastro_empresa(id_cadastro_empresa)
);

insert into maquina values (null, 'S1', 1),
						   (null, 'S1', 1),
                           (null, 'S10', 1),
                           (null, 'S10', 1),
                           (null, 'S20', 1),
                           (null, 'S20', 1);

select * from maquina;

CREATE TABLE componente(
	id_componente INT PRIMARY KEY AUTO_INCREMENT,
    nome_componente VARCHAR(60)
);

insert into componente values (null, 'Porcentagem de uso da CPU (%)'),
							  (null, 'Frequência da CPU (GHz)'),
                              (null, 'Porcentagem de uso do disco (%)'),
                              (null, 'Porcentagem de uso da memória RAM (%)'),
                              (null, 'Memória RAM em uso (GB)'),
                              (null, 'Monitorar processo do software (SCADA)'),
                              (null, 'Monitorar o status do processo do software (SCADA)');

select * from componente;

CREATE TABLE componente_maquina(
	fk_maquina INT NOT NULL,
    fk_componente INT NOT NULL,
    FOREIGN KEY(fk_maquina) REFERENCES maquina(id_maquina),
    FOREIGN KEY(fk_componente) REFERENCES componente(id_componente),
    PRIMARY KEY(fk_maquina,fk_componente)
);

#CREATE TABLE medida(
#	id_medida INT AUTO_INCREMENT,
#    medida DOUBLE(5,2),
#    data_medida DATETIME,
#    fk_maquina INT,
#    fk_componente INT,
#    FOREIGN KEY(fk_componente) REFERENCES componente(id_componente),
#	FOREIGN KEY(fk_maquina) REFERENCES maquina(id_maquina),
#    PRIMARY KEY (id_medida, fk_maquina, fk_componente)
#);

CREATE TABLE medida_analytics(
	id_medida_analytics INT PRIMARY KEY AUTO_INCREMENT,
    cpu_porcentagem DOUBLE,
    cpu_freq DOUBLE,
    disco_porcentagem DOUBLE,
    ram_porcentagem DOUBLE,
    ram_uso DOUBLE,
    nome_processo VARCHAR(15),
    status_processo VARCHAR(15),
    data_hora DATETIME,
	fk_maquina INT NOT NULL,
    FOREIGN KEY (fk_maquina) REFERENCES maquina(id_maquina)
);

select * from medida_analytics;
