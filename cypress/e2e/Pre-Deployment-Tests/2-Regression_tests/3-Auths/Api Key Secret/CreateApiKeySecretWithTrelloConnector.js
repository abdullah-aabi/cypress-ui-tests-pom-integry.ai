const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const data = require("../../../../../fixtures/Connectors_data.json")
import "cypress-file-upload"

describe("Create Trello Connector Using API Key And Secret", () => {
  before(() => {

  })

  beforeEach(() => {
    cy.loginWithApi()

    connector.createAppUsingApi(data.apiKeySecret.appData, [data.apiKeySecret.userInfoEndpoint], true)

    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("should create Trello connector using API Key and Secret", () => {
    connector.selectAuthType(data.apiKeySecret)
    connector.submitAuth(data.apiKeySecret.authVerificationEndpoint)
    connector.authenticateAPI(data.apiKeySecret)
    connector.verifyAuthTestResult(data.apiKeySecret)
    connector.testEndPoints(data.apiKeySecret)
  })
})