
/// <reference types="Cypress" />
import 'cypress-file-upload'
import ConnectorsLocators from '../../../../Locators/ConnectorsLocators'
const connector = require("../../../../support/businessActions/connector.js")
const app = require("../../../../support/businessActions/app.js")
const data = require("../../../../fixtures/Connectors_data.json")
const activity = require("../../../../support/businessActions/activity.js")

describe("Update Insightly connector", () => {
    before(() => {

    })

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

    it("Update Insightly connector", () => {
        app.assertAPIResponse("@getAllApps")
        connector.goToConnectorsTab()
        cy.fixture("UniqueIds").then(ids => {
            cy.get("div[id*='Insightly_" + ids.insightlyConnectorId + "'] h3 a").first().click()
            connector.updateBasicInfo(data.fillBasicInfoApi_Url)
            cy.get(ConnectorsLocators.createNewBtn).should("have.text", "Create New Authorization")

            activity.goToActivities()
            activity.createActivity(data.insightlyActions.activityBtnText)

            connector.openActivityType("Trigger", 1)
            connector.addTriggerInfo(data.selectAndFillActivityTypeTrigger)
            connector.connectUpdateAccount(data.actionConnectAccount)
            connector.selectTriggerType('Poll Based')
            connector.poolApiCall(data.pollApi_Url)

            cy.visit("/wapp/apps/v3/") // For Internal IEs to access apps.
            app.assertAPIResponse("@getAllApps")
            cy.get("a:contains(Insightly_" + ids.insightlyConnectorId + ")").first().click()
            connector.triggerTrackingProperty(data.trackingPropertyv3)
        })
    })
})