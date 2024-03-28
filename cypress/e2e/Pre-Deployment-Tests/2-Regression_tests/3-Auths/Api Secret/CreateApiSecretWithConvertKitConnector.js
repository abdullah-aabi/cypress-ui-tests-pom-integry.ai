const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const activity = require("../../../../../support/businessActions/activity.js")
const data = require("../../../../../fixtures/Connectors_data.json")

import "cypress-file-upload"

describe("Create ConvertKit Connector Using API Secret", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.loginWithApi()

    connector.createAppUsingApi(data.apiSecret.appData, [data.apiSecret.userInfoEndpoint], true)

    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("should create ConvertKit connector using API Secret", () => {
    connector.selectAuthType(data.apiSecret)
    connector.submitAuth(data.apiSecret.authVerificationEndpoint)
    connector.authenticateAPI(data.apiSecret)
    connector.verifyAuthTestResult(data.apiSecret)
    connector.testEndPoints(data.apiSecret)
  })
})