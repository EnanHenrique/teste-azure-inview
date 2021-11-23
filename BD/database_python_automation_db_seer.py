import psutil 
import time
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
            status_proc = proc.status()
            break
    
        else:
            proc_nome = "Não encontrado"
            status_proc = "Não encontrado" 


    machine1 = []
    machine1.append(cpu_percent)
    machine1.append(round((cpu_freq.current / 1000),2)) # f(x) = x / 10³ 
    machine1.append(disk_percent.percent)
    machine1.append(memory_percent.percent)
    machine1.append(round(memory_percent.used / (1024**3),2)) # f(x) = x / 1024³
    machine1.append(proc_nome)
    machine1.append(status_proc)
    machine1.append(data_e_hora)

    
    machine2 = []
    machine2.append(round((machine1[0]*1.1),2))    # f(x) = x * 1.1
    machine2.append(round((machine1[1]*1.1 ),2))   # f(x) = x * 1.1
    machine2.append(round((machine1[2]*0.95),2))   # f(x) = x * 0.95
    machine2.append(round((machine1[3]*1.15),2))   # f(x) = x * 1.15
    machine2.append(round((machine1[4] * 1.05),2)) # f(x) = x * 1.05
    machine2.append(proc_nome)
    machine2.append(status_proc)
    machine2.append(data_e_hora)

    machine3 = []
    machine3.append(round((machine1[0]*0.8),2))   # f(x) = x * 0.8
    machine3.append(round((machine1[1]*1.30),2))  # f(x) = x * 1.3
    machine3.append(round((machine1[2]*0.90),2))  # f(x) = x * 0.9
    machine3.append(round((machine1[3]*1.05),2))  # f(x) = x * 1.05  
    machine3.append(round((machine1[4] * 1.7),2)) # f(x) = x * 1.7
    machine3.append(proc_nome)
    machine3.append(status_proc)
    machine3.append(data_e_hora)


    print('='*162)
    print('CPU1:',machine1[0],'%''\tFreq:',machine1[1],'GHz''\tDisk1:', machine1[2],'%''\tMemo1:',machine1[3],'%''\tUsed',machine1[4],'GB''\tProcesso:',machine1[5],'  Status:',machine1[6], '  Data hora:',machine1[7])
    print('='*162)
    print('CPU2:',machine2[0],'%''\tFreq:',machine2[1],'GHz''\tDisk2:', machine2[2],'%''\tMemo2:',machine2[3],'%''\tUsed',machine2[4],'GB''\tProcesso:',machine2[5],'  Status:',machine2[6], '  Data hora:',machine2[7])
    print('='*162)
    print('CPU3:',machine3[0],'%''\tFreq:',machine3[1],'GHz''\tDisk3:', machine3[2],'%''\tMemo3:',machine3[3],'%''\tUsed',machine3[4],'GB''\tProcesso:',machine3[5],'  Status:',machine3[6], '  Data hora:',machine3[7])
    print('\n')

while True:
    time.sleep(20)
    main()
