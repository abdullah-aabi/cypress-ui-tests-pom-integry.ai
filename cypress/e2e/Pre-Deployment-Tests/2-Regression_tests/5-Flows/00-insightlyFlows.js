const app = require("../../../../support/businessActions/app.js")
const flow = require("../../../../support/businessActions/Flows.js")
const data = require("../../../../fixtures/Flows_data.json")
import "cypress-file-upload"

describe.skip("create Insightly flow and add side menu configurations", () => {

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

  it("should create a flow with \"schedule\" step", () => {
    flow.createFlow()
    flow.addFlowDetails(data.scheduleFlow)

    //  Root Step
    flow.selectAppConnector(data.scheduleFlow.systemApp)
    flow.configureSystemApp(data.scheduleFlow)
    flow.proceedToNextStep(data.scheduleFlow.doneBtnText)

    //  Child Step
    flow.selectAppConnector(data.scheduleFlow.clientApp)
    flow.selectActivity(data.scheduleFlow.action)
    flow.connectApp(data.scheduleFlow.account)
    flow.proceedToNextStep(data.scheduleFlow.continueBtnText)
    app.assertAPIResponse("@postTemplate")
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testTemplate")

    flow.addFieldsValue(data.scheduleFlow.fields)
    flow.proceedToNextStep(data.scheduleFlow.testBtnText)
    app.assertAPIResponse("@postPartialTemplate")
    app.assertAPIResponse("@getTemplateActivities")
    app.assertAPIResponse("@testAction")
    app.assertAPIResponse("@updateTemplate")

    flow.proceedToNextStep(data.scheduleFlow.doneBtnText, 1)
    flow.saveFlow(data.scheduleFlow.saveBtnText, data.scheduleFlow.successMessage)

    cy.readFile("cypress/fixtures/UniqueIds.json").then(ids => {
      ids.scheduleFlowId = window.uniqueId
      cy.writeFile('cypress/fixtures/UniqueIds.json', JSON.stringify(ids))
    })
  })

  it("should add general settings", () => {
    cy.readFile("cypress/fixtures/UniqueIds.json").then(ids => {
      flow.openFlow(data.scheduleFlow.title, ids.scheduleFlowId)
    })

    flow.openGeneralSettings()
    flow.addGeneralSeetings(data.generalSettings.add)
    flow.closeGeneralSettings()
    flow.assertFlowDetails(data.generalSettings.add)

    cy.readFile("cypress/fixtures/UniqueIds.json").then(ids => {
      ids.scheduleFlowId = window.uniqueId
      cy.writeFile('cypress/fixtures/UniqueIds.json', JSON.stringify(ids))
    })
  })

  it("should update general settings", () => {
    cy.readFile("cypress/fixtures/UniqueIds.json").then(ids => {
      flow.openFlow(data.generalSettings.add.title, ids.scheduleFlowId)
    })

    flow.openGeneralSettings()
    flow.addGeneralSeetings(data.generalSettings.update)
    flow.closeGeneralSettings()
    flow.assertFlowDetails(data.generalSettings.update)

    cy.readFile("cypress/fixtures/UniqueIds.json").then(ids => {
      ids.scheduleFlowId = window.uniqueId
      cy.writeFile('cypress/fixtures/UniqueIds.json', JSON.stringify(ids))
    })
  })
})