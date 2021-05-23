// const Page = require('./page');

// /**
//  * sub page containing specific selectors and methods for a specific page
//  */
// class SecurePage extends Page {
//     /**
//      * define selectors using getter methods
//      */
//     get flashAlert () { return $('#flash') }
// }

// module.exports = new SecurePage();

export class SearchPage {
    public searchTextBox() : WebdriverIO.Element {
        return browser.$('[name="q"]');
    }

    public searchButton() : WebdriverIO.Element {
        return browser.$('[name="btnK"]');
    }

    public result() : WebdriverIO.Element {
        return browser.$('.h3*=Something');
    }
}
