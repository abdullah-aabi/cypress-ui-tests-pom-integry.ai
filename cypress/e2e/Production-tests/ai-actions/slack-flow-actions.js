/// <reference types="Cypress" />
import FlowsLocators from "../../../Locators/FlowsLocators"
import { createContactInInsightly } from "../../../support/businessActions/CreateOpsUsingApi"
import { getCredsType } from "../../../support/commands"
const data = require("../../../fixtures/Flows_data.json")
const connectorData = require("../../../fixtures/Connectors_data.json")
const flows = require("../../../support/businessActions/Flows")
const app = require("../../../support/businessActions/app")

describe("creating guided flow", () => {
  let workspaceId = 16425

  before(() => {

  })

  beforeEach(() => {
    cy.loginWithApi("abdullah+turbo@integry.io", "meAabi13119", "Muhammad Abdullah")

    cy.visit("/")
    cy.isUserLoggedIn("abdullah+turbo@integry.io", "meAabi13119", "Muhammad Abdullah")
    window.localStorage.setItem("globallySelectedApp", workspaceId)
    cy.log("Test Start")
  })

  it("guided flow for Insightly", () => {
    flows.goToFlowsTab()
    flows.createNewFlow()

    flows.addFlowDetails(data.selectACTrigger)

    // Create When step
    flows.selectApp("Setup")
    cy.clickButton(FlowsLocators.doneButton, false, 0)

    // Start
    // Create step and Select App
    cy.getCookie('csrftoken').then(csrftoken => {
      cy.request({
        url: Cypress.env("base_url") + "/api/activities/?app=" + workspaceId + "&type=ACTION",
        method: "GET",
        headers: {
          "X-CSRFToken": csrftoken.value,
          // accept: "application/json, text/plain, */*",
          "content-type": "application/json"
        },
        followRedirect: false
      }).then((resp) => {
        expect(resp.status).to.eq(200); // verifies the success of the API call
        for (let i = 0; i < resp.body.length; i++) {
          flows.selectApp("Slack TestApp For Imports")

          // Select action
          flows.selectAction(i)

          flows.connectApp(connectorData.slack)

          // Dynamicall get the field and add values. 

          cy.get("div.configure-fields-section > div").its("length").then(totalFields => {
            for (let j = 0; j < totalFields; j++) {
              cy.get("div.configure-fields-section > div")
                .eq(j)
                .find("div.field-configuration-v6 > div")
                .invoke("class")
                .then(fieldType => {
                  cy.log(fieldType)
                  switch (fieldType) {
                    case "textfield":
                  }
                })
            }
          })
          // cy.clickButton("button.directory-next-button-v3")
          // cy.clickButton("button.template-secondary-button")
          // cy.get("div.spinner-v2").should("not.exist")

          // createContactInInsightly()
          // cy.get("button.retry-button").should('have.text', "Start")
          // app.assertAPIResponse("@testQuery")
          // app.assertAPIResponse("@getTemplateActivities")
          // app.assertAPIResponse("@testTemplate")
          // app.assertAPIResponse("@testQuery")
          // cy.clickButton("button.retry-button")
          // app.assertAPIResponse("@testQuery")
          // cy.get("div.success-message > div").should("have.text", "Your test was successful! Let’s proceed.")
          // cy.clickButton(FlowsLocators.doneButton, false, 0)
          // app.assertAPIResponse("@updateTemplate")

          // end
        }
      });
    });
  });
})