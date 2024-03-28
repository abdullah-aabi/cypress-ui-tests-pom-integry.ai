const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const data = require("../../../../../fixtures/Connectors_data.json")

import "cypress-file-upload"
describe("Create Teamgate Connector Using API Key, Secret And Region", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.readFile('src/utils/user-creds.json').then((creds) => {
      cy.loginWithUI(creds.username, creds.password, creds.userid)
      cy.log("Current User", creds.username)
    })
    cy.log("Test Start")
  })

  it("should create Teamgate connector using API Key, Secret and Region", () => {
    app.assertAPIResponse("@getAllApps")
    connector.goToConnectorsTab()
    connector.createConnector()

    connector.addHomepageUrl(data.apiKeySecretRegion.homepageUrl)
    connector.addBasicInfo(data.apiKeySecretRegion)
    connector.selectAuthType(data.apiKeySecretRegion.authType)

    connector.authenticateAPI(data.apiKeySecretRegion)
    connector.verifyTestResult(data.bannerSuccessMsg)
    connector.verifyNextStepName(data.activitiesRoute, data.activitiesStep)
  })
})