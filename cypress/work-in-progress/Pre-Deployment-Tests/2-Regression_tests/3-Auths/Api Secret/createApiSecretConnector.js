const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const activity = require("../../../../../support/businessActions/activity.js")
const data = require("../../../../../fixtures/Connectors_data.json")

import "cypress-file-upload"
describe("Create ConvertKit Connector Using API Secret", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.readFile('src/utils/user-creds.json').then((creds) => {
      cy.loginWithUI(creds.username, creds.password, creds.userid)
      cy.log("Current User", creds.username)
    })
    cy.log("Test Start")
  })

  it("should create ConvertKit connector using API Secret", () => {
    app.assertAPIResponse("@getAllApps")
    connector.goToConnectorsTab()
    connector.createConnector()

    connector.addHomepageUrl(data.apiSecret.homepageUrl)
    connector.addBasicInfo(data.apiSecret)
    connector.selectAuthType(data.apiSecret.authType)

    connector.authenticateAPI(data.apiSecret)
    connector.verifyTestResult(data.bannerSuccessMsg)

    connector.verifyNextStepName(data.activitiesRoute, data.activitiesStep)
    activity.openActivityType("Trigger", 1)

    activity.addActivityInfo(data.apiSecretTrigger)
    activity.addTextFields(data.apiSecretTrigger.textfield)
    activity.connectAccount(data.apiSecretTrigger)
    activity.addFieldsValue(data.apiSecretTrigger.textfield)

    activity.selectTriggerType("Poll Based")
    activity.testActivity(data.apiSecretTrigger)
    activity.verifyActivityResult(data.bannerSuccessMsg)
  })
})