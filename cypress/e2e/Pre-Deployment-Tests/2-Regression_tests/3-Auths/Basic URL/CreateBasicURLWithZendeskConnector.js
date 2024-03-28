const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const data = require("../../../../../fixtures/Connectors_data.json")
import "cypress-file-upload"

describe("Create Zendesk Connector Using Basic With URL", () => {

  before(() => {
  })

  beforeEach(() => {
    cy.loginWithApi()

    connector.createAppUsingApi(data.basicURL.appData, [data.basicURL.userInfoEndpoint], true)

    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("should create Zendesk connector using Basic with URL", () => {
    connector.selectAuthType(data.basicURL)
    connector.submitAuth(data.basicURL.authVerificationEndpoint)
    connector.authenticateAPI(data.basicURL)
    connector.verifyAuthTestResult(data.basicURL)
    connector.testEndPoints(data.basicURL)
  })
})