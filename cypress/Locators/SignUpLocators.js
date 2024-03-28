let firstName = "#id_first_name";
let lastName = "#id_last_name";
let emailField = "#id_username";
let passwordField = "#id_password1";
let submitButton = "#second-button";
let appUrl = "#account_link";
let accountName = "#account_name"

let firtNameErrorMsg = "#error_id_first_name";
let lastNameErrorMsg = "#error_id_last_name";
let emailErrorMsg = "#error_id_username";
let passwordErrorMsg = "#error_id_password1";
let appLinkErrorMsg = "#error_account_link";
let accountNameErrorMsg = "#error_account_name";
let createSampleEntitiesCheck = "#create_sample_entities";
let dropdownOption = "div.select__option";

export default {
  signUpHeader: ".signup-form-wrapper h1",
  submitBtn: submitButton,
  securityCode: "#verify-code",
  // loggedInAccount: ".username",
  loggedInAccount: "div.navbar-dropdown-tooltip-wrapper div:nth-child(2)",
  popupCloseBtn: "img.osp-close-btn",
  signupPopup: 'div.osp-container',
  signupCLoseBtn: "[alt='close_icon']",
  bookACallHeaderBtn: "a#book-call-header",

  bookACallForm: {
    firtNameField_Unique: "#name",
    emailField_Unique: "#email",
    apps: "#apps-2",
    flows: "#flow-2",
    hearAboutTextButton: "select#marketing_response option",
    bookACallSubmitBtn: "#calendyButton",
    "@onboardCustomer": 200
    // dateAvailable: "button[aria-label*=' - Times available']",
    // timeAvailable: "button[data-container='time-button']",
    // confirmBtn: "button[data-container='confirm-button']",
  },
  validFields: {
    firtNameField_Unique: firstName,
    lastNameField: lastName,
    emailField_Unique: emailField,
    passwordField: passwordField,
    appUrl: appUrl,
    accountName: accountName,
    createSampleEntitiesCheck: createSampleEntitiesCheck,
    submitBtn: submitButton,
    "@internalSignup": 200,
  },
  mandatoryFields: {
    submitBtn: submitButton,
    firtNameMsg: firtNameErrorMsg,
    lastNameMsg: lastNameErrorMsg,
    emailMsg: emailErrorMsg,
    passwordMsg: passwordErrorMsg,
    appLinkErrorMsg: appLinkErrorMsg,
    accountNameErrorMsg: accountNameErrorMsg
  },
  alreadyExistingEmail: {
    alreadyExistingEmailField: emailField,
    appUrl: appUrl,
    accountName: accountName,
    createSampleEntitiesCheck: createSampleEntitiesCheck,
    submitBtn: submitButton,
    "@internalSignup": 200,
    emailMsg: emailErrorMsg,
  },
  alreadyExistingPasswordWithEmail: {
    passwordField: passwordField,
    appUrl: appUrl,
    accountName: accountName,
    createSampleEntitiesCheck: createSampleEntitiesCheck,
    submitBtn: submitButton,
    "@internalSignup": 200,
    passwordMsg: passwordErrorMsg,
  },
  alreadyExistingPasswordWithUserName: {
    emailField_Unique: emailField,
    firtNameField_Unique: firstName,
    passwordFieldName_Unique: passwordField,
    appUrl: appUrl,
    accountName: accountName,
    createSampleEntitiesCheck: createSampleEntitiesCheck,
    submitBtn: submitButton,
    "@internalSignup": 200,
    passwordMsg: passwordErrorMsg,
  },
  invalidFields: {
    emailField: emailField,
    emailMsg: emailErrorMsg,
    passwordField: passwordField,
    passwordMsg: passwordErrorMsg,
    alreadyExistingEmailField: emailField,
    appUrl: appUrl,
    appLinkErrorMsg: appLinkErrorMsg,
    firtNameField: firstName,
    lastNameField: lastName,
    submitBtn: submitButton,
    // firtNameMsg: firtNameErrorMsg,
    // lastNameMsg: lastNameErrorMsg, // bug
  },
  onboarding: {
    roleDropdown: {
      dropdown: "div.turbo-input-field:nth-child(1) div.select__control",
      options: dropdownOption,
    },
    platformTypesDropdown: {
      dropdown: "div.turbo-input-field:nth-child(2) div.select__control",
      options: dropdownOption,
    },
    companySizeDropdown: {
      dropdown: "div.turbo-input-field:nth-child(3) div.select__control",
      options: dropdownOption,
    },
    companyLink: "input#companyLink",
    submitBtn: "button.turbo-btn",
    "@getOnboardingApps": 200,
  },
  mockApp: "div.connector-card",
  mockAppName: "input.connector-listing__search-bar",
  skeletonLoaderNotInDOM: "div.animated-background",
  selectApp: {
    tellUsMoreBtn: "button.request-CTA__button",
    // appNames: "div.mip-container__control-group input",
    flowsName: "div.mip-container__control-group textarea",
    continueTextButton: "button.mip-container__actions_btn",
    doMeetingLaterTextButton: "div.calendly-widget__actions button",
    successMsg: "div.osp-container__heading",
  },
};
