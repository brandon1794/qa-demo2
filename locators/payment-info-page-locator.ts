export class PaymentInfoLocators {
    constructor(
        //Payment Page
        public nameOnCardField = 'name-on-card',
        public cardNumberField = 'card-number',
        public cvcField = 'cvc',
        public expirationMonthField = 'expiry-month',
        public expirationYearField = 'expiry-year',
        public payConfirmButton = 'pay-button',

        //Confirmed Order Page
        public continueAfterPayingButton = 'continue-button',

        //Review Order Page
        public reviewOrderBeforePaymentTitle = 'Review Your Order',
        public placeMessageForOrder = 'textarea[name="message"]',
        public placeOrderButton = '//a[contains(@class, "check_out")]'
    ) { }
}