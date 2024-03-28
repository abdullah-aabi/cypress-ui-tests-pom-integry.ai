/// <reference types="Cypress" />
import 'cypress-file-upload'
const connector = require("../../../../../support/businessActions/connector.js")
const app = require("../../../../../support/businessActions/app.js")
const data = require("../../../../../fixtures/Connectors_data.json")

describe("Test Api key auth using Doneday connector", () => {
    before(() => {

    })

    beforeEach(() => {
        cy.loginWithApi()

        connector.createAppUsingApi(data.apiKey.appData, [data.apiKey.userInfoEndpoint], true)

        // Verify, the user is logged in successfully.
        cy.isUserLoggedIn()
        cy.log("Test Start")
    })

    it("should Test Api key auth using DoneDay connector", () => {
        connector.selectAuthType(data.apiKey)
        connector.submitAuth(data.apiKey.authVerificationEndpoint)
        connector.addNewDoneDayAccount(data.apiKey)
        connector.verifyAuthTestResult(data.apiKey)
        connector.testEndPoints(data.apiKey)
    })
})