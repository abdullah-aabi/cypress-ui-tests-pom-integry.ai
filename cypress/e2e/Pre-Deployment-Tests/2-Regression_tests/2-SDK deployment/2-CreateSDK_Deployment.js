/// <reference types="Cypress" />
const deployment = require("../../../../support/businessActions/deployment")
import "cypress-file-upload"
import deploymentLocators from "../../../../Locators/DeploymentLocators.js"

describe("Creating Sdk deployment", () => {
  before(() => {

  })

  beforeEach(() => {
    cy.loginWithApi()
    cy.visit("/wapp/deployments/v3")
    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("Sdk deployment", () => {
    cy.fixture("Deployment_data").then(data => {
      //Visit Sdk deployment
      deployment.createDeployment(0)

      // cy.wait(['@GetAllApps'])
      cy.get(deploymentLocators.Sdk.titleText).clear().type(data.Sdk.title) //name of you app
      cy.get(deploymentLocators.Sdk.liveSwitchBtn).click({ force: true }) //switch button to active sdk app
      cy.get(deploymentLocators.Sdk.passwordPreview).eq(0).click()
      cy.get(deploymentLocators.Sdk.passwordPreview).eq(1).click()
      cy.get(deploymentLocators.Sdk.passwordPreview).eq(2).click()
      cy.get(deploymentLocators.Sdk.saveBtn).click()
      cy.get(deploymentLocators.Sdk.successMsg).should("have.text", "Deployment updated successfully")
      cy.get(deploymentLocators.Sdk.createGuidedFlowBtn).eq(1).click({ force: true }) //create guided flow for sdk embed
    })
  })
})