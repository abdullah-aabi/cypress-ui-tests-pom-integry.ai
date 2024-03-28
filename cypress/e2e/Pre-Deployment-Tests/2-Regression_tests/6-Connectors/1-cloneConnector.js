/// <reference types="Cypress" />
const data = require("../../../../fixtures/Connectors_data.json")
const connector = require("../../../../support/businessActions/connector")
const app = require("../../../../support/businessActions/app")

describe.skip("Connector", () => {

    before(() => {

    })

    beforeEach(() => {
        cy.closeWindow()
        cy.loginWithApi()
        cy.visit("/wapp/apps/v4/")
        // Verify, the user is logged in successfully.
        cy.isUserLoggedIn()
        cy.log("Test Start")
    })

    it("Clone a connector", () => {
        connector.cloneConnector(data.cloneConnector)
    })
})
