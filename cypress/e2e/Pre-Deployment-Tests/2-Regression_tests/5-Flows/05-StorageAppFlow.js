/// <reference types="Cypress" />
const data = require("../../../../fixtures/Flows_data.json")
const flows = require("../../../../support/businessActions/Flows")
const app = require("../../../../support/businessActions/app")

describe.skip("Guided flow", () => {

    before(() => {
        cy.intercept('GET', Cypress.env('base_url') + '/app/').as('GetAllApps'); //intercept /app/ API call and return all apps.

    })

    beforeEach(() => {
        cy.closeWindow()
        cy.loginWithApi()
        cy.visit("/wapp/templates/v6")
        // Verify, the user is logged in successfully.
        cy.isUserLoggedIn()
        cy.log("Test Start")

        app.assertAPIResponse("@getAllApps")
    })

    it("Storage App FLow", () => {
        cy.fixture("UniqueIds").then(ids => {
            flows.goToFlowsTab()
            flows.createFlow()
            flows.addFlowDetails(data.storageFlow)
            flows.selectAppConnector(data.setupFlow.systemApp)
            flows.configureSystemApp(data.setupFlow)
            flows.proceedToNextStep(data.setupFlow.doneBtnText)

            //  Select Insightly app at child step

            flows.selectConnector()
            flows.selectActivity(data.storageFlow.action)
            flows.connectAccount(data.storageFlow.account)
            flows.configureInsightlyApp(data.storageFlow)
            app.assertAPIResponse("@postTemplate")
            app.assertAPIResponse("@getTemplateActivities")
            app.assertAPIResponse("@testTemplate")

            flows.addStepInChildStep()
            flows.selectAppConnector(data.storageFlow.storageTitle)
            flows.selectActivity(data.storageFlow.storageAction)
            flows.configureStorage(data.storageFlow)
        })
    })
})