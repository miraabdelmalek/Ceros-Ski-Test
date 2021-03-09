import swaglabsLoginPage from "../pages/swagLabsLoginPage.js";
import swagLabsInventoryPage from "../pages/swagLabsInventoryPage.js";
import swagLabsCartPage from "../pages/swagLabsCartPage.js";
import { element } from "protractor";

describe('Swag Labs tests', () => {
    beforeAll(async () => {
        browser.waitForAngularEnabled(false);
        await swaglabsLoginPage.gotoLoginPage();
    });
    it('should log in with standard user', async () => {
        await swaglabsLoginPage.login("standard_user", "secret_sauce");
        await swagLabsInventoryPage.productPageNavigate();
        var currentUrl = await browser.getCurrentUrl();
        console.log({ currentUrl });
        expect(currentUrl).toEqual('https://www.saucedemo.com/inventory.html');
    });
    it('should have 6 items on the inventory page', async () => {
        swagLabsInventoryPage.getItemsCount().
            then(function (elems) {
                const itemsCount = elems.length;
                console.log({ itemsCount });
                expect(itemsCount).toEqual(6);
            });
    });
      // BONUS tests! Not required for the automation challenge, but do these if you can.
      it('sort the inventory items by name, Z-to-A', async () => {
        let inventoryNames = (await swagLabsInventoryPage.inventoryItemName()).sort().reverse();
        console.log({inventoryNames});
        await swagLabsInventoryPage.sortByZtoA();        ;
        let elementsAfterSorting = await swagLabsInventoryPage.inventoryItemName();
        console.log({elementsAfterSorting});
        expect(elementsAfterSorting).toEqual(inventoryNames);
    });
     it('sort the inventory items by price, high-to-low', async () => {
        await swagLabsInventoryPage.sortByPriceLowtoHigh();
        let Prices = (await swagLabsInventoryPage.inventoryItemPrice()).map((x) => { return Number(x.substring(1)); }).sort(function(a, b){return a-b;}
        ).reverse();
        console.log({Prices});
        await swagLabsInventoryPage.sortByPriceHightoLow();
        let aftersortprices = (await swagLabsInventoryPage.inventoryItemPrice()).map((x) => { return Number(x.substring(1)); });
        console.log({aftersortprices});
        expect(Prices).toEqual(aftersortprices);
    });
    it('should add an item to the cart', async () => {
        browser.navigate().refresh();
        const InventoryElementText = await swagLabsInventoryPage.getInventoryElementText();
        console.log({ InventoryElementText });
        await swagLabsInventoryPage.AddItemToCart();
        await swagLabsInventoryPage.navigateToCart();
        const currentUrl = await browser.getCurrentUrl();
        console.log({ currentUrl });
        expect(currentUrl).toEqual('https://www.saucedemo.com/cart.html');
        const InCartElementText = await swagLabsInventoryPage.getInCartElementText()
        console.log({ InCartElementText });
        expect(InventoryElementText).toEqual(InCartElementText);
    });
    it('should complete the purchase process of an item from the inventory', async () => {
        await swagLabsCartPage.gotoCheckoutPage();
        const step1Url = await browser.getCurrentUrl();
        console.log({ step1Url });
        expect(step1Url).toEqual('https://www.saucedemo.com/checkout-step-one.html');
        await swagLabsCartPage.fillForm("qa", "test", "123456")
        const step2Url = await browser.getCurrentUrl();
        console.log({ step2Url });
        expect(step2Url).toEqual('https://www.saucedemo.com/checkout-step-two.html');
        await swagLabsCartPage.finishOrder();
        const completeUrl = await browser.getCurrentUrl();
        console.log({ completeUrl });
        expect(completeUrl).toEqual('https://www.saucedemo.com/checkout-complete.html');
    });
});

