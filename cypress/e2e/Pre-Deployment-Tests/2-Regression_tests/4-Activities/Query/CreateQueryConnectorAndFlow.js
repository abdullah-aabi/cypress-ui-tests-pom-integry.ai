/// <reference types="Cypress" />
const data = require("../../../../../fixtures/Connectors_data.json")
const ConnectorsLocators = require("../../../../../Locators/ConnectorsLocators.js")
const connector = require("../../../../../support/businessActions/connector.js")
const app = require("../../../../../support/businessActions/app.js")
const activity = require("../../../../../support/businessActions/activity.js")
const flowsData = require("../../../../../fixtures/Flows_data.json")
const flow = require("../../../../../support/businessActions/Flows")

import "cypress-file-upload"

describe.skip("Create Insightly Connector", () => {
    beforeEach(() => {
        cy.closeWindow()
        cy.loginWithApi()
        cy.visit("/wapp/apps/v4/")
        // Verify, the user is logged in successfully.
        cy.isUserLoggedIn()
        cy.log("Test Start")
    })

    it("Create Insightly Connector Query.", () => {
        app.assertAPIResponse("@getAllApps")

        cy.fixture("UniqueIds").then(ids => {
            cy.get("div[id*='Insightly_" + ids.insightlyConnectorId + "'] h3 a").first().click()
            connector.updateBasicInfo(data.fillBasicInfoApi_Url)
            cy.get(ConnectorsLocators.createNewBtn).should("have.text", "Create New Authorization")
            activity.goToActivities()
            activity.createActivity(data.insightlyActions.activityBtnText)
            connector.openActivityType("Query", 2)
            connector.addQueryInfo(data.selectAndFillActivityTypeQuery)
            connector.connectUpdateAccount(data.actionConnectAccount)
            connector.poolApiCallForQuery(data.queryPollApi_Url)
            app.assertAPIResponse("@updateActivity")
            app.assertAPIResponse("@testQuery")
        })
    })

    it("Create flow for Insightly Connector query.", () => {
        app.assertAPIResponse("@getAllApps")

        flow.goToFlowsTab()
        flow.createFlow()
        flow.addFlowDetails(flowsData.setupFlow)

        //  Root Step
        flow.selectAppConnector(flowsData.setupFlow.systemApp)
        flow.configureSystemApp(flowsData.setupFlow)
        flow.proceedToNextStep(flowsData.setupFlow.doneBtnText)

        // //  Child Step
        flow.selectQueryConnectorApp(flowsData.setupFlow.clientApp)
        flow.selectQuery(flowsData.querySetupFlow.query + window.uniqueId)
        flow.connectApp(flowsData.setupFlow.account)
        flow.queryNextStep()

        // app.assertAPIResponse("@postTemplate")
        // app.assertAPIResponse("@getTemplateActivities")
        // app.assertAPIResponse("@testTemplate")
    })
})