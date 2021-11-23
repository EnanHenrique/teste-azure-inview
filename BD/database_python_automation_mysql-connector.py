import psutil 
import time
import mysql.connector
from datetime import datetime

def main():
    cpu_percent = psutil.cpu_percent(interval=1)
    cpu_freq = psutil.cpu_freq()
    disk_percent = psutil.disk_usage('/')
    memory_percent = psutil.virtual_memory()
    nome_processo = "chrome.exe"
    hora_atual = datetime.now()

    data_e_hora = hora_atual.strftime("%Y/%m/%d %H:%M:%S")

    for proc in psutil.process_iter():
        if proc.name() == nome_processo:
            proc_nome = proc.name()
            break
        else:
            proc_nome = "Sem processo"

    status_proc = proc.status()

    machine = []
    machine.append(cpu_percent)
    machine.append(round((cpu_freq.current / 100),2))
    machine.append(disk_percent.percent)
    machine.append(memory_percent.percent)
    machine.append(round(memory_percent.used / (1024**3),2))
    machine.append(proc_nome)
    machine.append(status_proc)
    machine.append(1)
    machine.append(1)
    machine.append(data_e_hora)


    db = mysql.connector.connect(
        host = "localhost",
        user = "igorBandTec",
        password = "Urubu1**",
        database = "db_seer"
    )

    cursor = db.cursor()


    query_cpu = "INSERT INTO medida_cpu  VALUES (null,%s, %s,%s,%s,%s)"
    data_cpu = (machine[0],machine[1],machine[9],machine[7],machine[8])

    query_disco = "INSERT INTO medida_disco  VALUES (null,%s, %s,%s,%s)"
    data_disco = (machine[2],machine[9],machine[7],machine[8])

    query_ram = "INSERT INTO medida_ram VALUES (null,%s,%s,%s,%s,%s)"
    data_ram = (machine[3],machine[4],machine[9],machine[7],machine[8])

    cursor.execute(query_cpu,data_cpu)
    cursor.execute(query_disco,data_disco)
    cursor.execute(query_ram,data_ram)

    db.commit()


    print('CPU:',machine[0],'%''\tFreq:',machine[1],'GHz''\tDisk:',
                machine[2],'%''\tMemo:',machine[3],'%''\tUsed',
                machine[4],'GB''\tProcesso:',machine[5],'\tStatus',machine[6])
    print('='*120)


while True:
    time.sleep(1)
    main()