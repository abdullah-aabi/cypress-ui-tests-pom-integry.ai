/// <reference types="Cypress" />
const connector = require("../../support/businessActions/connector")
const app = require("../../support/businessActions/app");
const data = require("../../fixtures/Connectors_data.json");
import "cypress-file-upload";
import ConnectorsLocators from "../../Locators/ConnectorsLocators";
describe("Create Less Annoying Connector", () => {
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

    it("Create Less Annoying Connector.", () => {
        app.assertAPIResponse("@getAllApps");
        // connector.goToConnectorsTab("v4");
        // connector.createConnector()
        // connector.addBasicInfo(data.lessAnnoyingCRMInfo);
        // connector.addApiBaseURL(data.lessAnnoyingCRMInfo)
        // connector.addHomePageUrl(data.lessAnnoyingCRMInfo)
        // connector.enableTogglesofBasicInfo()
        // connector.createApp()
        // connector.selctAuthType(data.lessAnnoyingCRMInfo)
        // connector.createLessAnnoyingAuthEndpoint(data.lessAnnoyingCRMInfo)
        // connector.testAuthorization()
        // connector.authorizationApiKeyAuth(data.lessAnnoyingCRMInfo)
        // connector.verifyAuthTestResult(data.connectedAccount)

        cy.visit("https://beta.integry.io/wapp/apps/v3/33139/edit/triggers/38630/edit/")
        // connector.createTriggerActivity(data.lessAnnoyingCRMTrigger)
        cy.selectFromDropdown(ConnectorsLocators.triggerpage.triggerEndpointDropDown, data.lessAnnoyingCRMTrigger.pollEndpoint)

        connector.createTriggerEndpoint(data.triggerEndpoint)
        // cy.fixture("UniqueIds").then((data) => {
        //   data.insightlyConnectorId = window.uniqueId;
        //   cy.writeFile("cypress/fixtures/UniqueIds.json", JSON.stringify(data));
        // });
    });
});