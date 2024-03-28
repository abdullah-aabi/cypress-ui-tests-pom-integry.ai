const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const data = require("../../../../../fixtures/Connectors_data.json")

import "cypress-file-upload"
describe("Create Atlassian Connector Using Jira Basic With URL", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.readFile('src/utils/user-creds.json').then((creds) => {
      cy.loginWithUI(creds.username, creds.password, creds.userid)
      cy.log("Current User", creds.username)
    })
    cy.log("Test Start")
  })

  it.skip("should create Atlassian connector using Jira Basic with URL", () => {
    app.assertAPIResponse("@getAllApps")
    connector.goToConnectorsTab()
    connector.createConnector()

    connector.addHomepageUrl(data.jiraBasicURL.homepageUrl)
    connector.addBasicInfo(data.jiraBasicURL)
    connector.selectAuthType(data.jiraBasicURL.authType)

    connector.authenticateAPI(data.jiraBasicURL)
    connector.verifyTestResult(data.bannerSuccessMsg)
    connector.verifyNextStepName(data.activitiesRoute, data.activitiesStep)
  })
})