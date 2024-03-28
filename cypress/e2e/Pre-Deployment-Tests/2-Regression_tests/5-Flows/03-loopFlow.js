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

  it("should create a flow with \"loop\" step added in a \"child\" step", () => {
    flow.addFlowDetails(data.loopFlow)

    //  Add Setup app at root step
    flow.selectAppConnector(data.setupFlow.systemApp)
    flow.configureSystemApp(data.setupFlow)
    flow.proceedToNextStep(data.setupFlow.doneBtnText)

    //  Select Mailchimp app at child step
    flow.selectAppConnector(data.loopFlow.clientApp)
    flow.selectActivity(data.loopFlow.action)
    flow.connectApp(data.loopFlow.account)
    flow.configureMailchimpApp(data.loopFlow)
    flow.proceedToNextStep(data.loopFlow.continueBtnText)
    app.assertAPIResponse("@postTemplate")
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testTemplate")

    flow.proceedToNextStep(data.loopFlow.testBtnText)
    app.assertAPIResponse("@postPartialTemplate")
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testTemplate")
    app.assertAPIResponse("@updateTemplate")
    app.assertAPIResponse("@testQuery")
    cy.get('@testQuery').then(xhr => {
      cy.writeFile('cypress/fixtures/loopFlowRequestBody.json', JSON.stringify(xhr.request.body))
    })
    flow.proceedToNextStep(data.loopFlow.doneBtnText, 1)

    //  Select Loop app at sub-child step
    flow.addChildStep(1)
    flow.selectAppConnector(data.loopFlow.systemApp)
    flow.configureSystemApp(data.loopFlow)
    flow.proceedToNextStep(data.loopFlow.testBtnText)
    app.assertAPIResponse("@postPartialTemplate")
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testTemplate")
    app.assertAPIResponse("@updateTemplate")
    flow.assertLoopIteration(data.loopFlow)

    flow.proceedToNextStep(data.loopFlow.doneBtnText, 1)
    flow.saveFlow(data.loopFlow.saveBtnText, data.loopFlow.successMessage)
  })
})