/// <reference types="Cypress" />
import flowsLocators from "../../../../Locators/FlowsLocators"
const data = require("../../../../fixtures/Flows_data.json")
const flow = require("../../../../support/businessActions/Flows")
const app = require("../../../../support/businessActions/app")
//import "cypress-file-upload"
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

    it("Unpublish a Flow", () => {
        cy.clickButton(flowsLocators.flowsNavLink)
        flow.unPublishFlow(data.v7)
    })
})