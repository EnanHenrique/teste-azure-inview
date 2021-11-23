import psutil
import time
from connectdb import *

print('='*10, 'INÍCIO DAS MEDIÇÕES', '='*10)
print('-'*10, 'Ctrl+C para parar', '-'*10, '\n')

while True:
    cpu_percent = psutil.cpu_percent(interval=1)
    cpu_freq = psutil.cpu_freq()
    disk_percent = psutil.disk_usage('/')
    memory_percent = psutil.virtual_memory()
    memory_used = round(memory_percent.used / (1024**3),2)
    data_hora = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    nome_processo = "chrome.exe"
    fk_maquina = 1 #TIRAR FK_MAQUINA QUANDO SUBIR NO SERVIDOR AWS

    for proc in psutil.process_iter():
        if proc.name() == nome_processo:
            proc_nome = proc.name()
            status_proc = proc.status()
            break
    
        else:
            proc_nome = "Não encontrado"
            status_proc = "Não encontrado"
            
    machine = []
    machine.append(cpu_percent)
    machine.append(round((cpu_freq.current / 1000),2)) # f(x) = x / 10³ 
    machine.append(disk_percent.percent)
    machine.append(memory_percent.percent)
    machine.append(round(memory_percent.used / (1024**3),2)) # f(x) = x / 1024³
    machine.append(proc_nome)
    machine.append(status_proc)
    machine.append(fk_maquina) #TIRAR FK_MAQUINA QUANDO SUBIR NO SERVIDOR AWS

    insert_db(machine)
    time.sleep(1)
    print('='*162)