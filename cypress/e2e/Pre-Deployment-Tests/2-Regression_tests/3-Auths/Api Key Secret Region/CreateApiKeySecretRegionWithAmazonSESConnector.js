const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const data = require("../../../../../fixtures/Connectors_data.json")

import "cypress-file-upload"

describe("Create AmazonSES Connector Using API Key, Secret And Region", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.loginWithApi()

    connector.createAppUsingApi(data.apiKeySecretRegion.appData, [data.apiKeySecretRegion.userInfoEndpoint], true)

    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("should create AmazonSES connector using API Key, Secret and Region", () => {
    connector.selectAuthType(data.apiKeySecretRegion)
    connector.submitAuth(data.apiKeySecretRegion.authVerificationEndpoint)
    connector.authenticateAPI(data.apiKeySecretRegion)
    connector.verifyAuthTestResult(data.apiKeySecretRegion)
    connector.testEndPoints(data.apiKeySecretRegion)
  })
})