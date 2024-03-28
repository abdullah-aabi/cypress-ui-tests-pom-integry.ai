/// <reference types="Cypress" />
const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const activity = require("../../../../../support/businessActions/activity.js")
const data = require("../../../../../fixtures/Connectors_data.json")
import "cypress-file-upload";

describe("Create Mailchimp Connector Using Basic", () => {
  before(() => {

  })

  beforeEach(() => {
    cy.loginWithApi()

    connector.createAppUsingApi(data.basicAuth.appData, [data.basicAuth.userInfoEndpoint], true)

    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("should create Mailchimp connector using Basic", () => {
    connector.basicSelectAuthType(data.basicAuth)
    connector.submitAuth(data.basicAuth.authVerificationEndpoint)
    connector.authenticateAPI(data.basicAuth)
    connector.verifyAuthTestResult(data.basicAuth)
    connector.testEndPoints(data.basicAuth)
  })
})
