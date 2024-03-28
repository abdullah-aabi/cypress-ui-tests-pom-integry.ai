import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

const commonLocators = require("../Locators/commonLocators");

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    console.log("Error Occurred: ", "err");
    return false;
});

beforeEach(() => {
    //   cy.restoreLocalStorage();
    cy.runRoutes();
});

before(() => {
    // Login in to app.
    cy.log("This is outer before call");
    // cy.loginWithUI(Cypress.env("Username"), Cypress.env("Password"))
    // cy.runRoutes();
    cy.wrap({ foo: "bar" }).its("quux").should("not.exist");
    Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        console.log("Error Occurred: ", "err");
        return false;
    });
});

after(() => {
    // cy.clearLocalStorage()
    // cy.deleteAccountUsingApi()
});

afterEach(() => {
    // cy.saveLocalStorage()
});
