/// <reference types="Cypress" />
const connector = require("../../../../support/businessActions/connector")
const app = require("../../../../support/businessActions/app");
const data = require("../../../../fixtures/Connectors_data.json");
import "cypress-file-upload";

describe("Create SendInBlue Connector", () => {
    before(() => {

    });

    beforeEach(() => {
        cy.closeWindow()
        cy.loginWithApi()
        cy.visit("/")

        // Verify, the user is logged in successfully.
        cy.isUserLoggedIn()
        cy.log("Test Start")
    })

    it("Create Connector with Insightly App and verify the details.", () => {
        // app.assertAPIResponse("@getAllApps");
        connector.goToConnectorsTab()

        // Creating app from UI // Remove this when we add it from Api
        connector.createConnector()
        // connector.sendInBlueHomepageUrl(data.fillSendInBlueInfo);
        connector.fillBasicInfoPage(data.apiKeyURL);
        connector.createApp(data.apiKeyURL.appData.app_name + "_" + window.uniqueId)

        // Retrieve
        connector.verifyBasicInfoPage(data.apiKeyURL)

    })

    it("Update Connector with SIB App and verify the details.", () => {
        // connector.createAppUsingApi(
        //     data.apiKeyURL.appData,
        //     false,
        //     true
        // )
        connector.goToConnectorsTab()
        connector.searchAndOpenConnector(data.apiKeyURL.appData.app_name + "_" + window.uniqueId, true)

        // Update
        connector.updateBasicInfoPage(data.fillSendInBlueInfo);
        connector.updateApp(data.fillSendInBlueInfo.appData.app_name + "_" + window.uniqueId)

        // Retrieve updated changes
        connector.verifyBasicInfoPage(data.fillSendInBlueInfo)

    });

    it.skip("Delete Connector with SIB App and verify it.", () => {
        // connector.createAppUsingApi(
        //     data.apiKeyURL.appData,
        //     false,
        //     true
        // )
        connector.goToConnectorsTab()
        connector.searchAndOpenConnector(data.fillSendInBlueInfo.appData)

        // Update
        connector.updateBasicInfoPage(data.fillSendInBlueInfo);
        connector.updateApp()

        // Retrieve updated changes
        connector.verifyBasicInfoPage(data.fillSendInBlueInfo)

    });
});