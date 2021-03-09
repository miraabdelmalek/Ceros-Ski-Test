import { browser, element } from 'protractor';
import BasePage from './basePage';
var usernameTextBox = element(by.id("user-name"));
var passwordTextBox = element(by.id("password"));
var loginBtn = element(by.id("login-button"));

class SwaglabsLoginPage extends BasePage {
    constructor() {
        super();
    }
    gotoLoginPage()
    {
        browser.get("https://www.saucedemo.com");
    }
    login(username,password)
    {
        usernameTextBox.sendKeys(username);
        passwordTextBox.sendKeys(password);
        loginBtn.click();
    }
   
}
export default new SwaglabsLoginPage();