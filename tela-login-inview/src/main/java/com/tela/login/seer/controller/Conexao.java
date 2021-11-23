package com.tela.login.seer.controller;
import org.apache.commons.dbcp2.BasicDataSource; 

/*
 * @author Igor Morais
 */
public class Conexao {

    private BasicDataSource bancoDeDados;

    public Conexao() {
        this.bancoDeDados = new BasicDataSource();
        //bancoDeDados​.setDriverClassName("org.h2.Driver");//mudar para o driver do mysql
        bancoDeDados.setDriverClassName("com.mysql.cj.jdbc.Driver");
        //bancoDeDados.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        
        //bancoDeDados​.setUrl("jdbc:h2:file:./meu_banco");//mudar para o endereço local/do server.
        bancoDeDados.setUrl("jdbc:mysql://localhost:3306/db_seer");
        //bancoDeDados.setUrl("jdbc:sqlserver://servidor-seer.database.windows.net:1433;database=db_seer;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;");
        
        bancoDeDados​.setUsername("user_inview");
        bancoDeDados​.setPassword("inView@2021");
        
        //bancoDeDados​.setUsername("adm.inview");
        //bancoDeDados​.setPassword("#Gfgrupo8");
    }

    public BasicDataSource getBancoDeDados() {
        return bancoDeDados;
    }
}
