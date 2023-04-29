export class ProductDetailsLocators {
    constructor(
        public quantityField = '#quantity',
        public addToCart = '.col-sm-7 > div > span > button',
        public addedMessage = 'h4[class="modal-title w-100"]',
        public viewCartButton = 'p[class="text-center"] > a',
    ) { }
}
