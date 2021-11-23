import mysql.connector
from credentials import usr, pswd

def dados_maquina(user_message):
    try:
        mydb = mysql.connector.connect(
            host="localhost",
            user=usr,
            password=pswd,
            database="db_seer"
        )

        if mydb.is_connected():
            db_Info = mydb.get_server_info()
            print("Conectado ao MySQL Server versão ", db_Info)

            mycursor = mydb.cursor()

                # retorna o select tablela maquina ordenada por setor
            # sql_query_maquina = f"select * from maquina where fk_empresa = {fk_empresa[0][0]} order by 'setor'"
            # mycursor.execute(sql_query_maquina)
            # resultado = mycursor.fetchall()

            sql_query_fk_empresa = f"select fk_empresa from cadastro_funcionario where login = '{user_message}'"
            mycursor.execute(sql_query_fk_empresa)
            fk_empresa = mycursor.fetchall()

                # retorna a medida_analytics relacionada com a fk_empresa
            sql_query_maquina = f"select maquina.setor,maquina.id_maquina,cpu_porcentagem,disco_porcentagem,ram_porcentagem,status_processo from maquina join medida_analytics on id_maquina = fk_maquina and medida_analytics.fk_empresa = {fk_empresa[0][0]} order by data_hora desc limit 6"
            mycursor.execute(sql_query_maquina)
            resultado = mycursor.fetchall()

            final = "Medidas dos ultimos minutos: ↓ (intervalo 20-20s da captura)\n\nCaso a medida do componente ultrapasse dos limites estara umamensagem indicando criticidade.\n"
            contador = 0
            while (contador < len(resultado)):
                # print("\n")
                final += "\n"
                j = 0
                # final += f"{resultado[contador][contador]}"
                while (j < len(resultado)):
                    textoDaVez = ""
                    metrica_alerta = resultado[contador][j]
                    if (j == 0):
                        textoDaVez = "Setor: "
                    elif(j == 1):
                        textoDaVez = "Maquina: "
                    elif (j == 2):
                        textoDaVez = "%CPU: "
                        if (resultado[contador][j] > 66.8):
                            metrica_alerta = "CRITICA!!!"
                    elif (j == 3):
                        textoDaVez = "%Disco: "
                        if(resultado[contador][j] > 53):
                            metrica_alerta = "CRITICO!!!"
                    elif (j == 4):
                        textoDaVez = "%Ram: "
                        if(resultado[contador][j] > 73.6):
                            metrica_alerta = "CRITICA!!!"
                    else:
                        textoDaVez = "Status scada: "
                    
                    # print(textoDaVez,resultado[contador][j])
                    # print(f"{textoDaVez} {resultado[contador][j]}")
                    final += f"{textoDaVez} {metrica_alerta}\n"
                    j = j + 1
                contador = contador + 1            

            mydb.commit()

            return final

    except mysql.connector.Error as e:
        print("Erro ao conectar com o MySQL", e)
    finally:
        if(mydb.is_connected()):
            mycursor.close()
            mydb.close()
            print("Conexão com MySQL está fechada\n")