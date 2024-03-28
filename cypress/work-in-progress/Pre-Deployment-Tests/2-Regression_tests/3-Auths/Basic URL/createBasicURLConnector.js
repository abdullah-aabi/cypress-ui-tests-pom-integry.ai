const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const data = require("../../../../../fixtures/Connectors_data.json")

import "cypress-file-upload"
describe("Create Zendesk Connector Using Basic With URL", () => {

  before(() => {
  })

  beforeEach(() => {
    cy.readFile('src/utils/user-creds.json').then((creds) => {
      cy.loginWithUI(creds.username, creds.password, creds.userid)
      cy.log("Current User", creds.username)
    })
    cy.log("Test Start")
  })

  it("should create Zendesk connector using Basic with URL", () => {
    app.assertAPIResponse("@getAllApps")
    connector.goToConnectorsTab()
    connector.createConnector()

    connector.addHomepageUrl(data.basicURL.homepageUrl)
    connector.addBasicInfo(data.basicURL)
    connector.selectAuthType(data.basicURL.authType)

    connector.authenticateAPI(data.basicURL)
    connector.verifyTestResult(data.bannerSuccessMsg)
    connector.verifyNextStepName(data.activitiesRoute, data.activitiesStep)
  })
})