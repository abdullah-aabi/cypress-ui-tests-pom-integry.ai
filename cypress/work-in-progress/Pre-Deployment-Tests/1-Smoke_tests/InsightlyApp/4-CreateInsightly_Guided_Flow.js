/// <reference types="Cypress" />
import FlowsLocators from "../../../../Locators/FlowsLocators"
import { createContactInInsightly } from "../../../../support/businessActions/CreateOpsUsingApi"
const data = require("../../../../fixtures/Flows_data.json")
const connectorData = require("../../../../fixtures/Connectors_data.json")
const flows = require("../../../../support/businessActions/Flows")
const app = require("../../../../support/businessActions/app")
//import "cypress-file-upload"
describe("creating guided flow", () => {

  before(() => {

  })
  beforeEach(() => {
    cy.readFile('src/utils/user-creds.json').then((creds) => {
      cy.loginWithUI(creds.username, creds.password, creds.userid)
      cy.log("Current User", creds.username)
    })
    cy.log("Test Start")
  })
  it("guided flow for Insightly", () => {
    flows.goToFlowsTab()
    flows.createFlow()
    flows.addFlowDetails(data.selectACTrigger)
    flows.selectApp(data.selectACTrigger.search)
    flows.selectTrigger()
    flows.connectApp(connectorData.fillAuthInfo)
    cy.clickButton("button.directory-next-button-v3")
    cy.clickButton("button.template-secondary-button")
    cy.get("button.retry-button").should('have.text', "Start")
    app.assertAPIResponse("@testQuery")
    createContactInInsightly()
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testTemplate")
    app.assertAPIResponse("@testQuery")
    cy.clickButton("button.retry-button")
    app.assertAPIResponse("@testQuery")
    cy.clickButton(FlowsLocators.doneButton, false, 0)
    app.assertAPIResponse("@updateTemplate")
    flows.selectActionConnector(data.selectActionConnector)
    //fill form for Action connector
    flows.fillActionForm(data.fillActionForm)
    //select market place to publish your app
    flows.publishFlowInMarketPlace(data.publishFlowInMarketPlace)

    //})
  })
})
