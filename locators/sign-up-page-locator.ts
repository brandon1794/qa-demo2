export class SignUpLocators {
    constructor(
        //ENTER ACCOUNT INFORMATION SELECTORS
        public signUpTitle = 'New User Signup!',
        public nameField = 'signup-name',
        public emailField = 'signup-email',
        public signUpButton = 'signup-button',
        public enterInformationTitle = 'Enter Account Information',
        public genderMrField = '#id_gender1',
        public genderMrsField = '#id_gender2',
        public nameOnInput = 'name',
        public emailOnInput = 'email',
        public passwordField = 'password',
        public dateOfBirthDay = 'days',
        public dateOfBirthMonth = 'months',
        public dateOfBirthYear = 'years',

        //ADDRESS INFORMATION SELECTORS
        public adressFirstNameField = 'first_name',
        public adressLastNameField = 'last_name',
        public adressCompanyField = 'company',
        public adress1Field = 'address',
        public adress2Field = 'address2',
        public adressCountryField = 'country',
        public adressStateField = 'state',
        public adressCityField = 'city',
        public adressZipCodeField = 'zipcode',
        public addressPhoneNumberField = 'mobile_number',
        public addressCreateAccountButton = 'create-account',

        //Account Created
        public accountCreatedTitle = 'account-created',
        public continueButton = 'continue-button',

        //Login
        public loginEmail = 'login-email',
        public loginPassword = 'login-password',
        public loginButton = 'login-button'
    ) { }
}
