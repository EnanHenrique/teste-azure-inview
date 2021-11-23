import mysql.connector
from credentials import usr, pswd


def insert_db(machine):
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

            sql_query = f"INSERT INTO medida_analytics (cpu_porcentagem,cpu_freq,disco_porcentagem,ram_porcentagem,ram_uso,nome_processo,status_processo,data_hora,fk_maquina) VALUES (%s,%s,%s,%s,%s,%s,%s,now(),%s)"
            
            mycursor.execute(sql_query, machine)

            mydb.commit()

            print(mycursor.rowcount, "registro inserido")

    except mysql.connector.Error as e:
        print("Erro ao conectar com o MySQL:", e)
    finally:
        if(mydb.is_connected()):
            mycursor.close()
            mydb.close()
            print("Conexão com MySQL está fechada\n")