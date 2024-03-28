/// <reference types="Cypress" />
const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const activity = require("../../../../../support/businessActions/activity.js")
const data = require("../../../../../fixtures/Connectors_data.json")

import "cypress-file-upload";
describe("Create Mailchimp Connector Using Basic", () => {
  before(() => {

  })

  beforeEach(() => {
    cy.readFile('src/utils/user-creds.json').then((creds) => {
      cy.loginWithUI(creds.username, creds.password, creds.userid)
      cy.log("Current User", creds.username)
    })
    cy.log("Test Start")
  })

  it("should create Mailchimp connector using Basic", () => {
    app.assertAPIResponse("@getAllApps")
    connector.goToConnectorsTab()
    connector.createConnector()
    connector.addHomepageUrl(data.fillBaseUrlBasic.appBaseUrl)
    connector.addBasicInfo(data.fillBasic)
    connector.selectAuthType(data.fillAuthFormBasic.authType)
    connector.authenticateAPI(data.fillAuthFormBasic)
    connector.verifyTestResult(data.bannerSuccessMsg)
    connector.verifyNextStepName(data.activitiesRoute, data.activitiesStep)

    connector.openActivityType("Action", 0)
    connector.addActionInfo(data.selectAndFillActivityTypeAction)
    connector.addActionTextField(data.addTextFieldToActivity)
    connector.addActionTextField(data.addTextFieldToActivitySecond)
    connector.connectActionAccount(data.actionConnect)


  })
})
