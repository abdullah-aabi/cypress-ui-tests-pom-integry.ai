/// <reference types="Cypress" />
const data = require("../../../../fixtures/intView_data.json")
const intViewLocators = require("../../../../Locators/IntViewLocators")
const intview = require("../../../../support/businessActions/integrationView")

describe("Integration View Sanity", () => {
    if (Cypress.config().baseUrl.includes("app") || Cypress.config().baseUrl.includes("3006")) {
        beforeEach(() => {
            cy.loginWithUI(data.credentialsToLogin.username, data.credentialsToLogin.password, data.credentialsToLogin.user_id)

            intview.openIntView();//open intview from Flow listing
            intview.clearFilter();

        })
        it("Previw Setup", () => {


            intview.previewSetupForEnabledIntegration(data.previewSetup)
            intview.previewSetupForDisabledIntegration(data.previewSetup)
            intview.previewSetupForDeletedIntegration(data.previewSetup)


        })

        it("Integration View for a specific Automation Flow", () => {





            intview.applyCompletedandEnabledFilter(data.integrationData.enabledStatus, data.integrationData.completedStatus); //Apply filters


            intview.close2ndFilter() //close second filter
            intview.checkNoOfRows(3)

            intview.clearFilter() //clear all filters
            intview.checkNoOfRows(8)
            //Search By User ID
            intview.searchByUserID(data.integrationData.searchUserID)
            intview.enableDisbaleIntegration(data.integrationData.intDisabled, data.integrationData.intEnabled)//Enable and Disbale of Integration
            intview.searchByIntegrationID(data.integrationData.integrationID_val)

            intview.verifyAllIntegrationsPageTableHeadings(data)
            intview.verifyIntegrationData(data.integrationData)

            intview.verifyErrorNotifMessage(data)

            intview.clickViewRunsButton()

            //--------------------------RUNS PAGE---------------------------------


            intview.verifyRunsPageHeadings(data.runsData.runHeading)

            intview.verifyFlowsMetaData(data.runsData)//flow meta data
            intview.verifyIntegrationsMetaData(data.integrationData, intViewLocators.metaData.integrationID)//int meta data

            intview.verifyRunsPageTableHeadings(data.runsData) //runs data

            //search from within the steps and without them using email
            intview.searchRuns(data.runs)
            intview.searchWithinSteps(data.runs.internalStepDetail)

            ///filters
            intview.apply200andCompletedFilters(data.runs)
            intview.close2ndFilter()
            intview.checkNoOfRows(6)

            intview.clearFilterOnRunsPage()
            intview.checkNoOfRows(8)

            //search By Trigger App
            intview.searchByTriggerApp(data.runsData.triggerApp_val)

            //search by run id 
            intview.searchByRunID(data.runsData.runID_val)
            intview.verifyRunData(data.runsData)

            intview.clickViewStepsButton()

            //--------------------------STEPS PAGE---------------------------------

            intview.verifyStepsPageHeading(data.steps)
            intview.verifyFlowsMetaData(data.runsData)//flow meta data

            intview.verifyIntegrationsMetaData(data.integrationData, intViewLocators.metaData.integrationIDStepPage)
            intview.verifyRunsMetaData(data.runsData) //int meta
            intview.verifyStepsPageHeadings(data.steps)//runs meta

            intview.verifyTriggerData(data.trigger, data.runsData)//data of the trigger
            intview.verifyIfCOnditionData(data.ifCondition)//data of if condition
            //intview.clickExpandStepsButton()
            intview.verifyActionData(data.action)//date for action
            intview.verifyTriggerPayload(data)//trigger Payload
            // intview.verifyIfConditionPayload(data) //if Payload
            intview.verifyActionPayload(data)// Action Payload
            intview.verifyErrorNotifMessage(data)


        })
    }

})