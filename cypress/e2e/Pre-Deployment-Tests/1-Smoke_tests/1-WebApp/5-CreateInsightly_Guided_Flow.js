/// <reference types="Cypress" />
import FlowsLocators from "../../../../Locators/FlowsLocators"
import { createContactInInsightly } from "../../../../support/businessActions/CreateOpsUsingApi"
import { getCredsType } from "../../../../support/commands"
const data = require("../../../../fixtures/Flows_data.json")
const connectorData = require("../../../../fixtures/Connectors_data.json")
const flows = require("../../../../support/businessActions/Flows")
const app = require("../../../../support/businessActions/app")
const connector = require("../../../../support/businessActions/connector")

describe("creating guided flow", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.loginWithApi()
    // Create Insightly app, endpoints and trigger
    connector.createAppUsingApi(
      connectorData.apiKeyURL.appData,
      [connectorData.apiKeyURL.userInfoEndpoint, connectorData.apiKeyURL.triggerEndpoint],
      false,
      connectorData.apiKeyURL.createAuth,
      [connectorData.apiKeyURL.trigger]
    )

    // Create SIB app, endpoints and action
    connector.createAppUsingApi(
      connectorData.fillSendInBlueInfo.appData,
      [connectorData.fillSendInBlueInfo.userInfoEndpoint, connectorData.fillSendInBlueInfo.actionEndpoint],
      false,
      connectorData.fillSendInBlueInfo.createAuth,
      [connectorData.fillSendInBlueInfo.action]
    )

    cy.visit("/")
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("guided flow for Insightly", () => {

    if (Cypress.config().baseUrl.includes("beta") || Cypress.config().baseUrl.includes("8000")) { // flag for new flow update
      cy.visit("https://beta.integry.io/wapp/templates/v6/create/data-flow/")
    } else {
      flows.goToFlowsTab()
      flows.createNewFlow()
    }

    flows.addFlowDetails(data.selectACTrigger)

    // Create When step
    flows.selectApp(data.selectACTrigger.search + "_" + window.uniqueId)
    flows.selectTrigger()
    flows.connectApp(connectorData.apiKeyURL)
    cy.clickButton("button.directory-next-button-v3")
    cy.clickButton("button.template-secondary-button")
    cy.get("div.spinner-v2").should("not.exist")

    createContactInInsightly()
    cy.get("button.retry-button").should('have.text', "Start")
    app.assertAPIResponse("@testQuery")
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testTemplate")
    app.assertAPIResponse("@testQuery")
    cy.clickButton("button.retry-button")
    app.assertAPIResponse("@testQuery")
    cy.get("div.success-message > div").should("have.text", "Your test was successful! Let’s proceed.")
    cy.clickButton(FlowsLocators.doneButton, false, 0)
    app.assertAPIResponse("@updateTemplate")

    // Create Then Step 
    flows.selectActionConnector(data.selectActionConnector.search + "_" + window.uniqueId)
    flows.connectApp(connectorData.fillSendInBlueInfo)
    //fill form for Action connector
    flows.fillActionForm(data.fillActionForm)
    //select market place to publish your app
    flows.publishFlowInMarketPlace(data.publishFlowInMarketPlace)
    // cy.fixture("UniqueIds").then((data) => {
    //   data.insightlyFlowId = window.uniqueId;
    //   cy.writeFile("cypress/fixtures/UniqueIds.json", JSON.stringify(data));
    // })
  })
})
