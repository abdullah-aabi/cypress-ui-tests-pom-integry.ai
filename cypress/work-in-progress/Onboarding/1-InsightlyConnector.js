/// <reference types="Cypress" />
const connector = require("../../support/businessActions/connector.js")
const app = require("../../support/businessActions/app.js")
const data = require("../../fixtures/Connectors_data.json")
import "cypress-file-upload"
describe("Create Insightly Connector", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.readFile('src/utils/user-creds.json').then((creds) => {
      cy.loginWithUI(creds.username, creds.password, creds.userid)
      cy.log("Current User", creds.username)
    })
    cy.log("Test Start")
  })

  it("Create Insightly Connector.", () => {
    app.assertAPIResponse("@getAllApps")
    connector.goToConnectorsTab()
    connector.createConnector()

    connector.addHomepageUrl(data.fillBaseUrlApi_Url.appBaseUrl)

    connector.addBasicInfo(data.fillBasicInfoApi_Url)
    connector.selectAuthType(data.authorizatonType.authType)
    connector.authenticateAPI(data.fillAuthInfo)

    connector.verifyTestResult(data.bannerSuccessMsg)
    connector.verifyNextStepName(data.activitiesRoute, data.activitiesStep)

    connector.openActivityType("Action", 0)
    connector.addActionInfo(data.selectAndFillActivityTypeAction)
    connector.addActionTextField(data.addTextFieldToActivity)
    connector.addActionTextField(data.addTextFieldToActivitySecond)
    connector.connectActionAccount(data.actionConnectAccount)
    connector.addTextFieldsValueWithUniqueEmail(data.fillActivityForm)

    connector.apiPostCall(data.jsonInputActionApi_Url, data.sendApiCallApi_Url)
    connector.verifyActionResult(data.bannerSuccessMsg)

    cy.fixture("UniqueIds").then(data => {
      data.insightlyConnectorId = window.uniqueId
      cy.writeFile('cypress/fixtures/UniqueIds.json', JSON.stringify(data))
    })
    connector.addConnectorEndpoint()
  })
})