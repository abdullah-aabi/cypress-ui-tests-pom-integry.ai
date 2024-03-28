/// <reference types="Cypress" />
const data = require("../../../../fixtures/Flows_data.json")
const flows = require("../../../../support/businessActions/Flows")
const app = require("../../../../support/businessActions/app")
describe("Guided flow", () => {

    before(() => {
        cy.intercept('GET', Cypress.env('base_url') + '/app/').as('GetAllApps'); //intercept /app/ API call and return all apps.

    })
    beforeEach(() => {
        cy.closeWindow()
        cy.readFile('src/utils/user-creds.json').then((creds) => {
            cy.loginWithUI(creds.username, creds.password, creds.userid)
            cy.log("Current User", creds.username)
        })

        cy.log("Test Start")
    })
    
    it("Storage App FLow", () => {
        flows.goToFlowsTab()
        flows.createFlow()
        flows.addFlowDetails(data.storageFlow)
        flows.selectAppConnector(data.setupFlow.systemApp)
        flows.configureSystemApp(data.setupFlow)
        flows.proceedToNextStep(data.setupFlow.doneBtnText)

        //  Select Mailchimp app at child step
        flows.selectAppConnector(data.storageFlow.clientApp)
        flows.selectActivity(data.storageFlow.action)
        flows.connectApp(data.storageFlow.account)
        flows.configureMailchimpApp(data.storageFlow)
        flows.proceedToNextStep(data.storageFlow.continueBtnText)
        app.assertAPIResponse("@postTemplate")
        app.assertAPIResponse("@getTemplateActivities")
        app.assertAPIResponse("@testTemplate")

        flows.proceedToNextStep(data.storageFlow.testBtnText)
        app.assertAPIResponse("@postPartialTemplate")
        app.assertAPIResponse("@getTemplateActivities")
        app.assertAPIResponse("@testTemplate")
        app.assertAPIResponse("@updateTemplate")
        flows.proceedToNextStep(data.storageFlow.doneBtnText, 1)
        flows.addChildStep()
        flows.selectAppConnector(data.storageFlow.storageTitle)
        flows.selectActivity(data.storageFlow.storageAction)
        flows.configureStorage(data.storageFlow)
    })
})