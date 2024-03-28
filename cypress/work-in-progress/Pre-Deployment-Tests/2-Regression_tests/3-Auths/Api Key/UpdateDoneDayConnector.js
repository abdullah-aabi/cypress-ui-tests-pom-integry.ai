/// <reference types="Cypress" />
import 'cypress-file-upload'
const ConnectorLocators = require("../../../../../Locators/ConnectorsLocators")

const connector = require("../../../../../support/businessActions/connector.js")
const app = require("../../../../../support/businessActions/app.js")
const data = require("../../../../../fixtures/Connectors_data.json")

describe("Update Doneday connector", () => {
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

    it("Update DoneDay connector", () => {
        app.assertAPIResponse("@getAllApps")
        connector.goToConnectorsTab()
        connector.createConnector()

        connector.addHomepageUrl(data.doneDayAppUrl.appBaseUrl)

        connector.addBasicInfo(data.fillBasicInfoDoneDay)
        connector.selectAuthType(data.authorizatonApiType.authType)
        // connector.authenticateAPI(data.fillDoneDayAuthInfo)

        // cy.get(ConnectorLocators.v4.connectorBtn).click({ force: true }) // click on Apps tab 
        // cy.wait("@getAllApps").its("response.statusCode").should("eq", 200)
        cy.fixture("Connectors_data").then(data => {
            cy.wait("@getAllApps").its("response.statusCode").should("eq", 200)

            cy.get(".form-control").first().click()
            cy.get(".single-tag").eq(1).click({ force: true })
            cy.get(".form-control").eq(2).click({ force: true })
            cy.get(".option-row").eq(1).click({ force: true })
            cy.get(".align-center").last().click()
            // cy.get(".object-key").contains("Access Token").should("be.visible")
            cy.get(".object-key").eq(0).click({ force: true })

            cy.wait("@UpdateApp").its("response.statusCode").should("eq", 200)
            cy.saveWindow(ConnectorLocators.testAuthenticationBtn, "@endPointAuthLocal")
            cy.detectWindow()
            cy.get("#apikey").should("be.visible")
            cy.get("#apikey").type("8pjI97clYJO7q9RM7VYy")
            cy.get(ConnectorLocators.fillAuthPopupApi_Url.proceedBtn).click()
            // cy.wait(10000)
            cy.loadWindow()

            cy.wait("@endPointAuth").its("response.statusCode").should("eq", 200)

            //  cy.get(ConnectorLocators.v4.exitBtn).click()
            cy.get(ConnectorLocators.triggerPage.bannerSuccessTextMsg).should("have.text", data.v4.verifyAuthorization)
            cy.wait("@UpdateApp").its("response.statusCode").should("eq", 200)
            cy.wait("@endPointAuthLocal").its("response.statusCode").should("eq", 200)
            cy.get(ConnectorLocators.triggerPage.continueBtn).click()
            cy.wait("@endPointAuthLocal").its("response.statusCode").should("eq", 200)

        })
    })
})