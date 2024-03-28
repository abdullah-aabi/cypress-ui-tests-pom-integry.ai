/// <reference types="Cypress" />
const data = require("../../../../fixtures/Connectors_data.json")
const connector = require("../../../../support/businessActions/connector")
const app = require("../../../../support/businessActions/app")
//import "cypress-file-upload"
describe("Connector", () => {

    before(() => {

    })
    beforeEach(() => {
        cy.closeWindow()
        cy.readFile('src/utils/user-creds.json').then((creds) => {
            cy.loginWithUI(creds.username, creds.password, creds.userid)
            cy.log("Current User", creds.username)
        })
        cy.log("Test Start")
    })

    it("Clone a connector", () => {
        connector.goToConnectorsTab()
        connector.cloneConnector(data.cloneConnector)
    })
})
