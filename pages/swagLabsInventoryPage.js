import BasePage from './basePage';
import { browser, element } from 'protractor';
let inventoryList = browser.driver.findElements(by.css('div.inventory_item'))
let cartBtn = element(by.id('shopping_cart_container'));
var productsIcon = element(by.css("div[class='product_label']"));

class SwaglabsInventoryPage extends BasePage {
    constructor() {
        super();
    }
    inventoryItemName() {
        return element.all(by.css(".inventory_item_name")).getText();
    }
    inventoryItemPrice() {
        return element.all(by.css(".inventory_item_price")).getText();
    }
    sortByZtoA() {
        return element(by.cssContainingText('option', 'Name (Z to A)')).click();
    }
    sortByPriceLowtoHigh() {
        return element(by.cssContainingText('option', 'Price (low to high)')).click();
    }
    sortByPriceHightoLow() {
        return element(by.cssContainingText('option', 'Price (high to low)')).click();
    }
    productPageNavigate() {
        return productsIcon.isPresent();
    }
    getItemsCount() {
        return browser.driver.findElements(by.css('div.inventory_item'));
    }
    AddItemToCart() {
        return element(by.css("div.inventory_item:nth-child(1) > div.pricebar:nth-child(3) > button")).click();
    }
    getInventoryElementText() {
        return element(by.css("a[id='item_4_title_link'] div[class='inventory_item_name']")).getText();
    }
    addToCart(itemID) {
        var elementLabel;
        elementLabel = this.getInventoryElementText(itemID)
        this.clickOnAddToCart(itemID)
        return elementLabel;
    }
    navigateToCart() {
        return cartBtn.click();
    }
    getInCartElementText() {
        return element(by.css("div[class='inventory_item_name']")).getText();
    }
}
export default new SwaglabsInventoryPage();