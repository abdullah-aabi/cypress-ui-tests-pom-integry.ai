/// <reference types="Cypress" />
const deploymentLocators = require("../../../../Locators/DeploymentLocators")
const IntegrationLocators = require("../../../../Locators/IntegrationLocators")
const Data = require("../../../../fixtures/Integration_data.json")
const deployment = require("../../../../support/businessActions/deployment")

import "cypress-file-upload"
let win
describe("Creating market Place Integration", () => {
  before(() => {

  })

  beforeEach(() => {
    cy.readFile('src/utils/user-creds.json').then((creds) => {
      cy.loginWithUI(creds.username, creds.password, creds.userid)
      cy.log("Current User", creds.username)
    })
    cy.log("Test Start")
  })

  it("Market place deployment", () => {
    cy.fixture("Deployment_data").then(data => {
      cy.intercept('GET', Cypress.env('base_url') + '/app/').as('GetAllApps'); //intercept /app/ API call and return all apps.
      cy.visit("/")
      cy.get(deploymentLocators.v3.deploymentBtn).click()
      cy.wait("@GetAllApps").its("response.statusCode").should("eq", 200) //waits for the apps to load
      cy.get(deploymentLocators.v3.appCardBtn).first().should("have.attr", "href").then((href) => {
        win = href
        cy.log(win)
        cy.writeFile('cypress/fixtures/newUrl.json', {
          newUrl: win
        })
      })
      cy.log(win)
    })
  })

  it("Market place Integration", () => {
    // cy.fixture("newUrl").then(data => 
    cy.readFile("cypress/fixtures/newUrl.json").then(data => {
      cy.forceVisit(data.newUrl)
      // cy.log(data.newUrl)


      // it("Market place Integration", () => {
      //   cy.fixture("newUrl").then(data => {
      //     cy.forceVisit(data.newUrl)
      //     cy.log(data.newUrl)


      deployment.loginOfMp(Data.MarketPlaceIntegration)
      // deployment.configureFlowForIntegration(Data.MarketPlaceIntegration)
    })
  })
})
