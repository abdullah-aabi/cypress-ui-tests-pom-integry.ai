/// <reference types="Cypress" />
const connector = require("../../support/businessActions/connector")
const app = require("../../support/businessActions/app");
const data = require("../../fixtures/Connectors_data.json");
import "cypress-file-upload";
describe("Create Insightly Connector", () => {
    before(() => {

    });

    beforeEach(() => {
        cy.closeWindow()
        cy.readFile('src/utils/user-creds.json').then((creds) => {
            cy.loginWithUI(creds.username, creds.password, creds.userid)
            cy.log("Current User", creds.username)
            // cy.loginWithUI(creds.username, creds.password, creds.userid)
            // window.localStorage.setItem("hideWebsiteOnboardingSuccessPortal_3254", "true")
        })
        cy.log("Test Start")
    })

    it("Create Insightly Connector.", () => {
        app.assertAPIResponse("@getAllApps");
        connector.goToConnectorsTab("v4");
        connector.createConnector()
        connector.addHomepageUrl(data.fillBaseUrlApi_Url);
        connector.addBasicInfo(data.fillBasicInfoApi_Url);
        connector.selectAuthType(data.authorizatonType);
        connector.createNewEndPoint(data.endpointApi_Url)
        connector.authenticateAPI(data.fillAuthInfo);
        connector.verifyAuthTestResult(data.connectedAccount);
        connector.createActionActivity(data.actionPage)
        connector.createActionEndpoint(data.actionEndpoint, data.jsonInputActionApi_Url)
        cy.fixture("UniqueIds").then((data) => {
            data.insightlyConnectorId = window.uniqueId;
            cy.writeFile("cypress/fixtures/UniqueIds.json", JSON.stringify(data));
        });
    });
});