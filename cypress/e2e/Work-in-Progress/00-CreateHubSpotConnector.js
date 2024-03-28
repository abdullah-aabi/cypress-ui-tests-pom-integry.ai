/// <reference types="Cypress" />
const connector = require("../../support/businessActions/connector")
const app = require("../../support/businessActions/app");
const data = require("../../fixtures/Connectors_data.json");
import "cypress-file-upload";
describe("Create SendInBlue Connector", () => {
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

    it("Create HubSpot Connector.", () => {
        app.assertAPIResponse("@getAllApps");
        connector.goToConnectorsTab("v4");
        // connector.createConnector()
        // connector.addBasicInfo(data.fillHubSpotInfo);
        // connector.addApiBaseURL(data.fillHubSpotInfo)
        // connector.addHomePageUrl(data.fillHubSpotInfo)
        // connector.enableTogglesofBasicInfo()
        // connector.fillOauthSetupGuide(data.fillHubSpotInfo)
        // connector.createApp()
        // connector.oAuthAuthorization(data.fillHubSpotInfo)
        // connector.createTokenEndpoint(data.fillHubSpotInfo)
        // connector.authVarificationEndpoint(data.fillAuthVerificationEndpoint)
        // connector.createAuthorization()
        connector.yewo()



        // connector.createAuthEndPointForSendInBlue(data.fillSendInBlueInfo)
        // connector.testAuthorization()
        // connector.authorizationApiKeyAuth(data.fillSendInBlueInfo)
        // connector.verifyAuthTestResult(data.connectedAccount);
        // connector.createActionNewActivity(data.fillSendInBlueInfo)
        // connector.createNewActionEndpoint(data.fillSendInBlueInfo)
        // cy.fixture("UniqueIds").then((data) => {
        //   data.insightlyConnectorId = window.uniqueId;
        //   cy.writeFile("cypress/fixtures/UniqueIds.json", JSON.stringify(data));
        // });
    });
});