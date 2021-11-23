package com.tela.login.seer.model;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;
import java.time.Duration;

public class Chat {
    private String nome;
    private String email;
    private WebDriver driver;
    private WebDriverWait wait;


    public Chat() {

    }
    public void iniciar(){
        this.driver = new ChromeDriver();
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        this.driver.get("https://tawk.to/chat/6149fe0bd326717cb6829e01/1fg4ggns1");
    }
    public void enterIframe(){
        this.wait.until(presenceOfElementLocated((By.tagName("iframe"))));
        this.driver.switchTo().frame(driver.findElement(By.tagName("iframe")));
    }
    
    public void exitIframe(){
        this.driver.switchTo().defaultContent();
    }
    
    public void buttonClick(String button){
        this.wait.until(presenceOfElementLocated((By.cssSelector(button))));
        this.driver.findElement(By.cssSelector(button)).click();
    }
    
    public void inputValue(String input, String keys){
        this.wait.until(presenceOfElementLocated((By.xpath(input))));
        this.driver.findElement(By.xpath(input)).sendKeys(keys);
    }
    
    public void quit(){
        driver.quit();
    }
}