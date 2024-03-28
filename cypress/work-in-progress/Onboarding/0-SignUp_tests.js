/// <reference types="Cypress" />
import SignUpLocators from "../../Locators/SignUpLocators.js";

import {
  createUserCredsForLocalMachine,
  getCodeUsingMailosaur,
  signUpUser,
} from "../../support/businessActions/SignUp.js";

describe("Signs up the user", () => {
  before(() => {
    // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
    // cy.visit(Cypress.env("sign_up_url")); //opens the sign up page
    // Uncomment below command if you want to Create a user on your Local Machine
    createUserCredsForLocalMachine();
  });

  // it("Book A Call with Integry Sales", () => {
  //   cy.visit(Cypress.env("website_url")); // opens the Webiste home page
  //   cy.performOperation("bookACallForm", "validFields", "SignUp");
  // });

  it("Mandatory Fields Validations.", () => {
    cy.visit(Cypress.env("sign_up_url")); //opens the sign up page
    cy.performOperation("mandatoryFields", "mandatoryFields", "SignUp");
  });

  it("Validate Invalid Fields Validations.", () => {
    cy.performOperation("invalidFields", "invalidFields", "SignUp");
  });

  it("Validate already existing email and password similar to email and username.", () => {
    // Validating exisiting email.
    cy.performOperation(
      "alreadyExistingEmail",
      "alreadyExistingEmail",
      "SignUp"
    );

    // Validation: Password similar to email
    cy.performOperation(
      "alreadyExistingPasswordWithEmail",
      "alreadyExistingPasswordWithEmail",
      "SignUp"
    );

    // Validation: Password similar to Username
    cy.performOperation(
      "alreadyExistingPasswordWithUserName",
      "alreadyExistingPasswordWithUserName",
      "SignUp"
    );
  });

  it("The user is able to create a new account.", () => {
    cy.readFile("src/utils/user-creds.json").then((creds) => {
      // cy.performOperation("validFields", "validFields", "SignUp")

      signUpUser();
      /* 
      // Get the security code from Email and finish onboarding.
      getCodeUsingMailosaur(creds.username, SignUpLocators.securityCode);

      cy.get(SignUpLocators.submitBtn).click();

      cy.performOperation("onboarding", "onboarding", "SignUp");

      cy.get(SignUpLocators.mockApp + " p")
        .eq(0)
        .click();

      cy.performOperation("selectApp", "onboarding", "SignUp"); 
      */ // Removed as per new updates
      cy.get(SignUpLocators.letsGoButton).click().should("not.exist");
      cy.isUserLoggedIn();
    });
  });
});
