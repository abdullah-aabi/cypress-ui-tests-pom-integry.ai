/// <reference types="Cypress" />
const deploymentLocators = require("../../../Locators/DeploymentLocators")
const deployment = require("../../../support/businessActions/deployment")
const app = require("../../../support/businessActions/app.js")
const Data = require("../../../fixtures/Deployment_data.json")
import "cypress-file-upload"
//import { data } from "cypress/types/jquery";
describe("Creating market Place deployment With None Signin Method", () => {
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
    it("Creating MarketPlace Integration with Non Signin Method", () => {
        if (Cypress.config().baseUrl.includes("app") || Cypress.config().baseUrl.includes("3006")) {
            cy.readFile("cypress/fixtures/newUrl.json").then(data => {

                cy.intercept("POST", "v2/integration/*").as("createFlow")
                cy.intercept("DELETE", "/setup/template/**").as("deleteFlow")

                cy.forceVisit(data.newUrl)
                deployment.setupInsightlyFLowForIntegration()
                deployment.addInsightlyCredentials(Data.mPIntegration)
                app.assertAPIResponse("@verifyConnection")
                deployment.integrationConfigtaion(Data.mPIntegration)

                // deployment.connectAccountinMp()
                // deployment.connectAccountinMp()
                // deployment.configureFlowForIntegration(Data.MarketPlaceIntegration)
                deployment.deleteFlow("Insightly Flow")
            })
        }

    })
})
