/// <reference types="Cypress" />
const customflowLocators = require("../../../Locators/customflowsLocators.json");

describe("Custom Flows Tests", () => {
  before(() => {
    cy.visit("https://integrations.tatango.com/");
  });

  it("Signs In the marketplace", () => {
    cy.fixture("Custom_flows_data").then((data) => {
      cy.get(customflowLocators.v1.NavSignInBtn).contains("Sign in").click();
      cy.get(customflowLocators.v1.SignInUsername).type(data.v1.Username);
      cy.get(customflowLocators.v1.SignInPass).type(data.v1.Password);
      cy.get(customflowLocators.v1.SignInBtn).click();
      cy.get(customflowLocators.v1.CustomflowBtn).contains("Create Flow");
      cy.get(customflowLocators.v1.CustomflowBtn).click();
      cy.get(customflowLocators.v1.customflowNav).contains(
        "Back to Marketplace"
      );
      cy.wait("@getCustomFlow").its("response.statusCode").should("eq", 200);
      cy.wait("@GetLists").its("response.statusCode").should("eq", 200);
      cy.wait("@GetActivities").its("response.statusCode").should("eq", 200);
      //cy.wait("@GetBundle").its("response.statusCode").should("eq", 200)
    });
  });
  it("interactes with iframe & builds a custom flow", () => {
    // cy.get(".lite-template-builder").then(($iFrame) => {
    //   const iframeElement = $iFrame.contents().find("div > #app_id_0");
    //   cy.wrap(iframeElement).click();
    // });

   // cy.get('.lite-template-builder').its('0.contentDocument.body').find('div > #app_id_0').click().type("Todoist")
    cy.get('.lite-template-builder div > #app_id_0').should('be.visible').type("Todoist")
  
    // cy.get('.lite-template-builder').its('0.contentDocument.body').then(($iFrame) =>
    
    // { 
    //   const iframeElements = $iFrame.find('div > #app_id_0')
    //   cy.wrap(iframeElements)
    //   .click()
    //   .type("Todoist")
    // })
  });

  //  cy.get(customflowLocators.v1.connectorselectdropdown).click();
});
