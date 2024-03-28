/// <reference types="Cypress" />
const deploymentLocators = require("../../../Locators/DeploymentLocators")
const deployment = require("../../../support/businessActions/deployment")
const app = require("../../../support/businessActions/app.js")
const data = require("../../../fixtures/Deployment_data.json")
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

    it("Create Market place deployment", () => {
        cy.fixture("Deployment_data").then(data => {
            deployment.goToDeploymentTab()
            deployment.createDeployment(1)
            cy.get(deploymentLocators.v3.urlTextBox).clear().type(data.v3.urlTextBox)
            cy.get(deploymentLocators.v3.baseUrl).invoke("attr", "value").should("contain", "integry")
            cy.get(deploymentLocators.v3.baseUrl).type("-" + window.uniqueId)
            // deployment.fillBasicInfoScreen()
            cy.clickButton('#sso_none')
            cy.clickButton(deploymentLocators.fillBasicInfoScreen.continueAssertText)


            deployment.fillMarketPlaceAppearnceScreen(data.fillMarketPlaceAppearnceScreen)

            deployment.selectColorForMarketPlaceLogo(data.selectColorForMarketPlaceLogo)

            deployment.fillCTA_BarInfo(data.fillCTA_BarInfo)
            deployment.fillSocailMediaLinks(data.addingCard)
            cy.url().then((href) => {
                cy.log(href)
                cy.writeFile('cypress/fixtures/newUrl.json', {
                    newUrl: href
                })
            })
        })
    })
    it("View MP in preview mode", () => {
        deployment.goToDeploymentTab()
        deployment.selectFirstMP()
        app.assertAPIResponse("@getBundles")
        deployment.previewMode(data.addingCard)
        deployment.noneSigninMarketplace(data.marketPlace)
    })
})
