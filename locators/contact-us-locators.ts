export class ContactUsPageLocators {
    constructor(
        public getInTouchTitle = 'GET IN TOUCH',
        public contactName = 'name',
        public contactEmail = 'email',
        public contactSubject = 'subject',
        public contactMessage = 'message',
        public contactSubmit = 'submit-button',
        public contactUsNavBar = 'li > a[href="/contact_us"]',
        public successMessage = '.status.alert.alert-success'
    ) { }
}
