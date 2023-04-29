export class HomePageLocators {
    constructor(
        public homePageFeatureItemsTitle = 'Features Items',
        public viewProductOption = '//div[@class="features_items"]//div[@class="col-sm-4"]//div[@class="choose"]//ul//li//a',
        public viewCartNavBar = 'li > a[href="/view_cart"]',
        public logoutNavBar = 'li > a[href="/logout"]',
        public contactUsNavBar = 'li > a[href="/contact_us"]',
        public proceedCheckOut = '#do_action > div.container > div > div > a',
    ) { }
}
