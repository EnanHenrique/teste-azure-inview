
package com.tela.login.seer.model;

public class Funcionario{
    private String nome;
    private String login;
    private String senha;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
    

    @Override
    public String toString() {
        return String.format("Nome:%s Login: %s\t Senha: %s", this.nome, this.login, this.senha);
    }
}
