from datetime import datetime

from connectdb import *

def responses(input_text):
    user_message = str(input_text).lower()

    now = datetime.now()
    date_time = now.strftime("%d/%m/%y, %H:%M:%S")

    data = str(date_time)

    print(f"{data} - Mensagem: {user_message}\n")

    if user_message in ("vantagens","vantagem","/vantagem", "benefício","beneficio","benefícios","beneficios"):
        return "Com o monitoramento em tempo real das máquinas de sua empresa, podemos ajudá-los prever e evitar percas na produção de energia da Hidroelétrica!"

    elif user_message in ("site","/site", "web", "site web", "web site", "website"):
        return ("www.inviewsite.com.br (example!!!)") # nosso link do site quando estiver hospedado na azure

    elif "@" in user_message:
        return dados_maquina(user_message)

    else:
        return "Não pude compreendê-lo infelizmente =(."