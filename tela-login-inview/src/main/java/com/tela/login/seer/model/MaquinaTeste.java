//
//package com.tela.login.seer.model;
//
//import com.tela.login.seer.controller.Conexao;
//import org.springframework.jdbc.core.JdbcTemplate;
//import com.github.britooo.looca.api.core.Looca;
//
//public class MaquinaTeste extends Looca{
//    public static void main(String[] args) {
//        Conexao conexao = new Conexao();
//        JdbcTemplate assistente = new JdbcTemplate(conexao.getBancoDeDados());
//        
//        MaquinaTeste maquina = new MaquinaTeste();
//
//        Double cpuPorcentagem = maquina.getProcessador().getUso().doubleValue();
//        cpuPorcentagem = Math.floor(cpuPorcentagem * 100) / 100;
//        Double cpuFreq = (maquina.getProcessador().getFrequencia().doubleValue()) / 1000000000;
//        cpuFreq = Math.floor(cpuFreq * 100) / 100;
//
//        Double totalVolume = maquina.getGrupoDeDiscos().getVolumes().get(0).getTotal().doubleValue();
//        totalVolume = totalVolume / 1073741824;
//        Double discoVolume = maquina.getGrupoDeDiscos().getVolumes().get(0).getDisponivel().doubleValue();
//        discoVolume = discoVolume / 1073741824;
//        Double usoVolume = (totalVolume - discoVolume);
//        usoVolume = Math.floor(usoVolume * 100) / 100;
//        Double discoUsoPorcentagem = ((usoVolume / totalVolume) * 100);
//        discoUsoPorcentagem = Math.floor(discoUsoPorcentagem * 100) / 100;
//
//        //Percorrer todos os discos da maquina e somar a quantidade total de disco
//        Integer tamanhoLista = maquina.getGrupoDeDiscos().getDiscos().size();
//        Long total = 0L;
//        for (Integer i = 0; i < tamanhoLista; i++) {
//            Long disco1 = maquina.getGrupoDeDiscos().getDiscos().get(i).getTamanho();
//            total += disco1;
//        }
//
//        Double ramUso = (maquina.getMemoria().getEmUso().doubleValue()) / 1073741824;
//        ramUso = Math.floor(ramUso * 100) / 100;
//        Double ramTotal = (maquina.getMemoria().getTotal().doubleValue()) / 1073741824;
//        ramTotal = Math.floor(ramTotal * 100) / 100;
//        Double ramPorcentagem = ((ramUso / ramTotal) * 100);
//        ramPorcentagem = Math.floor(ramPorcentagem * 100) / 100;
//
//        Integer tamanho_lista_processos = maquina.getGrupoDeProcessos().getProcessos().size();
//        String nomeProcesso = "";
//        String statusProcesso = "";
//        for (Integer i = 0; i < tamanho_lista_processos; i++) {
//            String nomeProcessoAtual = maquina.getGrupoDeProcessos().getProcessos().get(i).getNome();
//
//            if (nomeProcessoAtual.equals("chrome")) {
//                nomeProcesso = nomeProcessoAtual;
//                statusProcesso = "Ativo";
//                break;
//            } else {
//                nomeProcesso = "Não Encontrado";
//                statusProcesso = "Não Encontrado";
//            }
//        }
//
//        System.out.println("TOTAL (GB):" + total / 1073741824);
//        System.out.println(cpuPorcentagem);
//        System.out.println(cpuFreq);
//        System.out.println(discoUsoPorcentagem);
//        System.out.println(usoVolume);
//        System.out.println(ramUso);
//        System.out.println(ramPorcentagem);
//        System.out.println(nomeProcesso);
//        System.out.println(statusProcesso);
//
////        assistente.update("INSERT INTO medidas VALUES (?,?,?,?,?,?,?,?)", null,
////                cpuPorcentagem, cpuFreq, discoUsoPorcentagem, ramPorcentagem,
////                ramUso, nomeProcesso, statusProcesso);
//
//        //assistente.update("INSERT INTO medidas30 VALUES (?,?,?,?,?,?,?,)", null,
//        //        cpuFreq, discoUsoPorcentagem, ramPorcentagem,
//        //        ramUso, nomeProcesso, statusProcesso);
//        
//        assistente.update("INSERT INTO medida_analytics VALUES (?,?,?,?,?,?,?,?, now(),1,1)", null,
//                cpuPorcentagem, cpuFreq, discoUsoPorcentagem, ramPorcentagem,
//                ramUso, nomeProcesso, statusProcesso);
//    }
//}
