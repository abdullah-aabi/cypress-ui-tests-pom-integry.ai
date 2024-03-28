const app = require("../../../../support/businessActions/app.js")
const flow = require("../../../../support/businessActions/Flows.js")
const data = require("../../../../fixtures/Flows_data.json")

import "cypress-file-upload"

describe.skip("create Insightly flow", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.loginWithApi()
    cy.visit("/wapp/templates/v6")
    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")

    app.assertAPIResponse("@getAllApps")
  })

  it("should create a flow with \"setup\" step", () => {
    flow.createFlow()
    flow.addFlowDetails(data.setupFlow)

    //  Root Step
    flow.selectAppConnector(data.setupFlow.systemApp)
    flow.configureSystemApp(data.setupFlow)
    flow.proceedToNextStep(data.setupFlow.doneBtnText)

    //  Child Step
    flow.selectAppConnector(data.setupFlow.clientApp)
    flow.selectActivity(data.setupFlow.action)
    flow.connectApp(data.setupFlow.account)
    flow.proceedToNextStep(data.setupFlow.continueBtnText)
    app.assertAPIResponse("@postTemplate")
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testTemplate")

    flow.addFieldsValue(data.setupFlow.fields)
    flow.proceedToNextStep(data.setupFlow.testBtnText)
    app.assertAPIResponse("@postPartialTemplate")
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testAction")
    cy.get('@testAction').then(xhr => {
      cy.writeFile('cypress/fixtures/setupFlowRequestBody.json', JSON.stringify(xhr.request.body))
    })
    app.assertAPIResponse("@updateTemplate")

    flow.proceedToNextStep(data.setupFlow.doneBtnText, 1)
    flow.saveFlow(data.setupFlow.saveBtnText, data.setupFlow.successMessage)

    cy.readFile("cypress/fixtures/UniqueIds.json").then(ids => {
      ids.setupFlowId = window.uniqueId
      cy.writeFile('cypress/fixtures/UniqueIds.json', JSON.stringify(ids))
    })
  })
})