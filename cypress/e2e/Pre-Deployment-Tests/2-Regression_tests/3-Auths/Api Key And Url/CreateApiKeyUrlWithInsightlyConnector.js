
/// <reference types="Cypress" />
import 'cypress-file-upload'
import ConnectorsLocators from '../../../../../Locators/ConnectorsLocators'
import { getCredsType } from '../../../../../support/commands'
const connector = require("../../../../../support/businessActions/connector.js")
const app = require("../../../../../support/businessActions/app.js")
const data = require("../../../../../fixtures/Connectors_data.json")

describe("Api key and Url auth test with Insightly connector", () => {
    before(() => {

    })

    beforeEach(() => {
        cy.loginWithApi()

        connector.createAppUsingApi(data.apiKeyURL.appData, [data.apiKeyURL.userInfoEndpoint], true)

        // Verify, the user is logged in successfully.
        cy.isUserLoggedIn()
        cy.log("Test Start")
    })

    it("should Create Insightly connector with Api key and Url auth.", () => {
        connector.selectAuthType(data.apiKeyURL)
        connector.submitAuth(data.apiKeyURL.authVerificationEndpoint)
        connector.authenticateAPI(data.apiKeyURL)
        connector.verifyAuthTestResult(data.apiKeyURL)
        connector.testEndPoints(data.apiKeyURL)
    })
})