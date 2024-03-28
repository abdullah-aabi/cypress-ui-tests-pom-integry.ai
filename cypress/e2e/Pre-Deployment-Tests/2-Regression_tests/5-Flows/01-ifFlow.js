const app = require("../../../../support/businessActions/app.js")
const flow = require("../../../../support/businessActions/Flows.js")
const data = require("../../../../fixtures/Flows_data.json")

import "cypress-file-upload"

describe.skip("create Mailchimp flow", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.loginWithApi()
    cy.visit("/wapp/templates/v6")
    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")

    app.assertAPIResponse("@getAllApps")
    flow.createFlow()
  })

  it("should create a flow with \"if\" and \"else if\" steps added in a \"child\" step", () => {
    flow.addFlowDetails(data.ifFlow)

    //  Add Setup app at root step
    flow.selectAppConnector(data.setupFlow.systemApp)
    flow.configureSystemApp(data.setupFlow)
    flow.proceedToNextStep(data.setupFlow.doneBtnText)

    //  Select Mailchimp app at child step
    flow.selectAppConnector(data.ifFlow.clientApp)
    flow.selectActivity(data.ifFlow.action)
    flow.connectApp(data.ifFlow.account)
    flow.configureMailchimpApp(data.ifFlow)
    flow.proceedToNextStep(data.ifFlow.continueBtnText)
    app.assertAPIResponse("@postTemplate")
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testTemplate")

    flow.proceedToNextStep(data.ifFlow.testBtnText)
    app.assertAPIResponse("@postPartialTemplate")
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testTemplate")
    app.assertAPIResponse("@updateTemplate")
    flow.proceedToNextStep(data.ifFlow.doneBtnText, 1)

    //  Select If app at sub-child step
    flow.addChildStep(1)
    flow.selectAppConnector(data.ifFlow.systemApp)
    flow.configureSystemApp(data.ifFlow)
    flow.proceedToNextStep(data.ifFlow.testBtnText)
    app.assertAPIResponse("@postPartialTemplate")
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testTemplate")
    app.assertAPIResponse("@updateTemplate")
    flow.assertConditionResult(data.ifFlow)
    flow.proceedToNextStep(data.ifFlow.doneBtnText, 1)

    //  Select Else If app at sub-child step
    flow.addChildStep(1)
    flow.selectAppConnector(data.elseIfFlow.systemApp)
    flow.configureSystemApp(data.elseIfFlow)
    flow.proceedToNextStep(data.elseIfFlow.testBtnText)
    app.assertAPIResponse("@postPartialTemplate")
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testTemplate")
    app.assertAPIResponse("@updateTemplate")
    flow.assertConditionResult(data.elseIfFlow)
    flow.proceedToNextStep(data.elseIfFlow.doneBtnText, 1)
    flow.saveFlow(data.ifFlow.saveBtnText, data.ifFlow.successMessage)
  })
})