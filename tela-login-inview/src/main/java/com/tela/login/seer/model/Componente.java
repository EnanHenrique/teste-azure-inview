package com.tela.login.seer.model;

public class Componente {
    private Double cpuPorcentagem;
    private Double cpuFreq;
    private Double discoUsoPorcentagem;
    private Double ramPorcentagem;
    private Double ramUso;
    private String nomeProcesso;
    private String statusProcessoCompleto;
    private Integer fkComponente;

    public Double getCpuPorcentagem() {
        return cpuPorcentagem;
    }

    public void setCpuPorcentagem(Double cpuPorcentagem) {
        this.cpuPorcentagem = cpuPorcentagem;
    }

    public Double getCpuFreq() {
        return cpuFreq;
    }

    public void setCpuFreq(Double cpuFreq) {
        this.cpuFreq = cpuFreq;
    }

    public Double getDiscoUsoPorcentagem() {
        return discoUsoPorcentagem;
    }

    public void setDiscoUsoPorcentagem(Double discoUsoPorcentagem) {
        this.discoUsoPorcentagem = discoUsoPorcentagem;
    }

    public Double getRamPorcentagem() {
        return ramPorcentagem;
    }

    public void setRamPorcentagem(Double ramPorcentagem) {
        this.ramPorcentagem = ramPorcentagem;
    }

    public Double getRamUso() {
        return ramUso;
    }

    public void setRamUso(Double ramUso) {
        this.ramUso = ramUso;
    }

    public String getNomeProcesso() {
        return nomeProcesso;
    }

    public void setNomeProcesso(String nomeProcesso) {
        this.nomeProcesso = nomeProcesso;
    }

    public String getStatusProcessoCompleto() {
        return statusProcessoCompleto;
    }

    public void setStatusProcessoCompleto(String statusProcessoCompleto) {
        this.statusProcessoCompleto = statusProcessoCompleto;
    }
    
    public Integer getfkComponente() {
        return fkComponente;
    }

    public void setfkComponente(Integer fkComponente) {
        this.fkComponente = fkComponente;
    }

    @Override
    public String toString() {
        return "Componente{" + "fkComponente=" + fkComponente + '}';
    }
}
