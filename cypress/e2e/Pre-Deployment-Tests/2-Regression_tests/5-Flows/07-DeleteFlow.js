/// <reference types="Cypress" />
import flowsLocators from "../../../../Locators/FlowsLocators"
const data = require("../../../../fixtures/Flows_data.json")
const flow = require("../../../../support/businessActions/Flows")
const app = require("../../../../support/businessActions/app")
//import "cypress-file-upload"
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

    it("Delete a Flow", () => {
        cy.clickButton(flowsLocators.flowsNavLink)
        flow.deleteFlow(data.v7)
    })
})