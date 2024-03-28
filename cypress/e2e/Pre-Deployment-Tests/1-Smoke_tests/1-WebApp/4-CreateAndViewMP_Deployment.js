/// <reference types="Cypress" />
const deploymentLocators = require("../../../../Locators/DeploymentLocators")
const deployment = require("../../../../support/businessActions/deployment")
const app = require("../../../../support/businessActions/app.js")
const data = require("../../../../fixtures/Deployment_data.json")
import "cypress-file-upload"

describe.skip("Creating market Place deployment", () => {
  before(() => {
    cy.intercept('GET', Cypress.env('base_url') + '/app/').as('GetAllApps'); //intercept /app/ API call and return all apps.


  })

  beforeEach(() => {
    cy.loginWithApi()
    cy.visit("/wapp/deployments/v3")
    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("Market place deployment", () => {
    deployment.createDeployment(1)
    cy.get(deploymentLocators.v3.urlTextBox).clear().type(data.v3.urlTextBox)
    cy.get(deploymentLocators.v3.baseUrl).invoke("attr", "value").should("contain", "integry")
    // window.uniqueId = generateUUID();
    cy.get(deploymentLocators.v3.baseUrl).type("-" + window.uniqueId)
    deployment.fillBasicInfoScreen()

    deployment.fillMarketPlaceAppearnceScreen(data.fillMarketPlaceAppearnceScreen)

    deployment.selectColorForMarketPlaceLogo(data.selectColorForMarketPlaceLogo)

    deployment.fillCTA_BarInfo(data.fillCTA_BarInfo)
    deployment.fillSocailMediaLinks(data.addingCard)

    cy.url().then((href) => {
      cy.log(href)
      cy.writeFile('cypress/fixtures/newUrl.json', {
        newUrl: href
      })
      cy.fixture("UniqueIds").then((data) => {
        data.marketPlaceId = window.uniqueId;
        cy.writeFile("cypress/fixtures/UniqueIds.json", JSON.stringify(data));
      })
    })

  })

  it("Adding cards in MP", () => {
    deployment.goToDeploymentTab()
    deployment.addingDetails(data.addingCard)
  })

  it("View MP in new tab or in preview mode", () => {
    deployment.goToDeploymentTab()
    deployment.selectFirstMP()
    app.assertAPIResponse("@getBundles")
    deployment.previewMode(data.addingCard)
  })
})
