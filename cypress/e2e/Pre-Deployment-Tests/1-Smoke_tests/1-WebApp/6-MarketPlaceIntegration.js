/// <reference types="Cypress" />
const deploymentLocators = require("../../../../Locators/DeploymentLocators")
const IntegrationLocators = require("../../../../Locators/IntegrationLocators")
const Data = require("../../../../fixtures/Integration_data.json")
const deployment = require("../../../../support/businessActions/deployment")

import "cypress-file-upload"
let win
describe.skip("Creating market Place Integration", () => {
  before(() => {

  })

  it("Market place Integration", () => {
    if (Cypress.config().baseUrl.includes("app") || Cypress.config().baseUrl.includes("3006")) {
      cy.readFile("cypress/fixtures/newUrl.json").then(data => {

        cy.intercept("POST", "v2/integration/*").as("createFlow")
        cy.intercept("DELETE", "/setup/template/**").as("deleteFlow")

        cy.forceVisit(data.newUrl)
        deployment.loginOfMp(Data.MarketPlaceIntegration)
        deployment.configureFlowForIntegration(Data.MarketPlaceIntegration)
        deployment.deleteFlow("Insightly Flow")
      })
    }
  })
})
