import Constants as keys
from telegram.ext import *
import Responses as R
from connectdb import *

print("Bot iniciado...")

def start_command(update, context):
    update.message.reply_text('Olá, seja bem-vindo(a) ao InViewBot\nDigite /help para listar os comandos.')


def help_command(update, context):
    update.message.reply_text("Olá, como posso ajudar?\n\nAqui estão algumas de minhas funcionalidades:\n\n/Vantagem\n/Site\n/Maquinas (Para acessar os dados das máquinas da sua empresa)")

def machine_command(update, context):
    update.message.reply_text("Digite seu login:")

def handle_message(update, context):
    text = str(update.message.text).lower() #recebe o texto do usuário
    response = R.responses(text) #processa o texto do usuário

    update.message.reply_text(response) #manda de volta para o usuário

def error(update, context):
    print(f"Update {update} caused error {context.error}")

def main():
    updater = Updater(keys.API_KEY, use_context=True) # inicia o bot
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start_command)) # garantindo que o bot tenha os comandos
    dp.add_handler(CommandHandler("help", help_command)) # especificados acima
    dp.add_handler(CommandHandler("maquinas", machine_command))

    dp.add_handler(MessageHandler(Filters.text, handle_message))

    dp.add_error_handler(error)

    updater.start_polling() # codigo que inicia o programa, pode passar intervalo nos parenteses (delay para resposta)
    updater.idle()


main()