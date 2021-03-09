import { browser, element } from 'protractor';
import BasePage from './basePage';
var checkoutBtn = element(by.css("a.btn_action.checkout_button"));
var firstnameTextBox = element(by.css("#first-name"));
var lastnameTextBox = element(by.css("#last-name"));
var zipCodeTextBox = element(by.css("#postal-code"));
var continueBtn = element(by.css("input[value='CONTINUE']"));
var finishBtn = element(by.css("a.btn_action.cart_button"));

class SwagLabsCartPage extends BasePage {
    constructor() {
        super();
    }
    gotoCheckoutPage()
    {
       return checkoutBtn.click();
    }
    fillForm(fname,lname,zipcode)
    {
        firstnameTextBox.sendKeys(fname);
        lastnameTextBox.sendKeys(lname);
        zipCodeTextBox.sendKeys(zipcode);
       return continueBtn.click();
    }
    finishOrder()
    {
        return finishBtn.click();
    }
   
}
export default new SwagLabsCartPage();