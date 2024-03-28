
/// <reference types="Cypress" />
import 'cypress-file-upload'
import ConnectorsLocators from '../../../../Locators/ConnectorsLocators'
import { getCredsType } from '../../../../support/commands'
const connector = require("../../../../support/businessActions/connector.js")
const app = require("../../../../support/businessActions/app.js")
const data = require("../../../../fixtures/Connectors_data.json")
const flows = require("../../../../support/businessActions/Flows")
const flowData = require("../../../../fixtures/Flows_data.json")

describe("Insightly connector", () => {
    before(() => {
        cy.loginWithApi()
        connector.createAppUsingApi(
            data.apiKeyURL.appData,
            [data.apiKeyURL.userInfoEndpoint, data.apiKeyURL.triggerEndpoint],
            true,
            data.apiKeyURL.createAuth
        )

        // Verify, the user is logged in successfully.
        cy.isUserLoggedIn()
        cy.log("Test Start")
    })

    it("Create Insightly connector with a trigger.", () => {
        connector.isAccountConnected(data.apiKeyURL)

        connector.createTriggerActivity(data.triggerDetailPage)
        connector.submitTriggerAuth(data.apiKeyURL.triggerEndpoint.endpoint_name)

        connector.testTriggerEndpoint(data.triggerEndpoint) // insightly limit issue
    })
})