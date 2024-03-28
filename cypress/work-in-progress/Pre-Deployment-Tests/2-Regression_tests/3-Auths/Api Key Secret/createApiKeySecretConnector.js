const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const data = require("../../../../../fixtures/Connectors_data.json")

import "cypress-file-upload"
describe("Create Trello Connector Using API Key And Secret", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.readFile('src/utils/user-creds.json').then((creds) => {
      cy.loginWithUI(creds.username, creds.password, creds.userid)
      cy.log("Current User", creds.username)
    })
    cy.log("Test Start")
  })

  it("should create Trello connector using API Key and Secret", () => {
    app.assertAPIResponse("@getAllApps")
    connector.goToConnectorsTab()
    connector.createConnector()

    connector.addHomepageUrl(data.apiKeySecret.homepageUrl)
    connector.addBasicInfo(data.apiKeySecret)
    connector.selectAuthType(data.apiKeySecret.authType)

    connector.authenticateAPI(data.apiKeySecret)
    connector.verifyTestResult(data.bannerSuccessMsg)
    connector.verifyNextStepName(data.activitiesRoute, data.activitiesStep)
  })
})