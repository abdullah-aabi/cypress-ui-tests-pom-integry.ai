const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const data = require("../../../../../fixtures/Connectors_data.json")
import "cypress-file-upload"

describe("Create Atlassian Connector Using Jira Basic With URL", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.loginWithApi()

    connector.createAppUsingApi(data.jiraBasicURL.appData, [data.jiraBasicURL.userInfoEndpoint], true)

    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("should create Atlassian connector using Jira Basic with URL", () => {
    connector.selectAuthType(data.jiraBasicURL)
    connector.submitAuth(data.jiraBasicURL.authVerificationEndpoint)
    connector.authenticateAPI(data.jiraBasicURL)
    connector.verifyAuthTestResult(data.jiraBasicURL)
    connector.testEndPoints(data.jiraBasicURL)

    // app.assertAPIResponse("@getAllApps")

    // connector.createConnector()

    // connector.newAppHomepageUrl(data.jiraBasicURL)
    // connector.addBasicInfo(data.jiraBasicURL)
    // connector.createApp()
    // connector.selectAuthType(data.jiraBasicURL.authType)

    // connector.authenticateAPI(data.jiraBasicURL)
    // connector.verifyTestResult(data.bannerSuccessMsg)
    // connector.verifyNextStepName(data.activitiesRoute, data.activitiesStep)
  })
})