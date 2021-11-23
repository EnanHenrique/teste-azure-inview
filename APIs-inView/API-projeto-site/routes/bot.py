import time
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait as wait

# classes atuais usadas na tawk to
# botão de acesso: button.tawk-margin-xsmall-left
# inpu de nome: //input[@aria-placeholder="Nome"]
# inpu de email: //input[@aria-placeholder="E-mail"]
# botão de enviar: button.tawk-button-hover
class bot_auto_complete:
    def __init__(self):
        self.driver =  webdriver.Chrome()
        self.driver.get("https://tawk.to/chat/6149fe0bd326717cb6829e01/1fg4ggns1")


    def enter_iframe(self):
        driver = self.driver
        wait(driver,5).until(EC.presence_of_element_located((By.TAG_NAME, 'iframe')))
        driver.switch_to.frame(driver.find_element_by_tag_name('iframe'))
    
    def exit_iframe(self):
        driver = self.driver
        driver.switch_to.default_content() 

    def button(self, button):
        driver = self.driver
        wait(driver,5).until(EC.presence_of_element_located((By.CSS_SELECTOR, button)))
        accept = driver.find_element_by_css_selector(button)
        accept.click()
    
    def input(self, input_name, value):
        driver = self.driver
        wait(driver,5).until(EC.presence_of_element_located((By.XPATH, input_name)))
        input_auto = driver.find_element_by_xpath(input_name)
        input_auto.send_keys(value)

    def quit(self):
        driver = self.driver
        driver.quit()

name = sys.argv[1]
email = sys.argv[2]

inViewBot = bot_auto_complete()
inViewBot.enter_iframe()
inViewBot.button('button.tawk-margin-xsmall-left')
inViewBot.exit_iframe()
inViewBot.enter_iframe()
inViewBot.input('//input[@aria-placeholder="Nome"]',name)
inViewBot.input('//input[@aria-placeholder="E-mail"]',email)
inViewBot.button('button.tawk-button-hover')
inViewBot.quit()