// const LoginPage = require('../pageobjects/login.page');
// const SecurePage = require('../pageobjects/secure.page');

// describe('My Login application', () => {
//     it('should login with valid credentials', async () => {
//         await LoginPage.open();

//         await LoginPage.login('tomsmith', 'SuperSecretPassword!');
//         await expect(SecurePage.flashAlert).toBeExisting();
//         await expect(SecurePage.flashAlert).toHaveTextContaining(
//             'You logged into a secure area!');
//     });
// });


import {SearchPage} from './secure.page'
import {Expect} from 'expect-webdriverio'

describe('Login functionality test suite', () => {
    const search = new SearchPage;
    it('Login Test',  () => {
        browser.url('https://google.com');
        search.searchTextBox().addValue('Something');
        search.searchButton().click();
        expect(search.result()).toBeDisplayed();
    });

});
