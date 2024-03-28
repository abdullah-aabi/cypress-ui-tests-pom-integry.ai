
import IntViewLocators from "../../Locators/IntViewLocators.js"
const app = require("../../support/businessActions/app.js")
let val

export function previewSetupForEnabledIntegration(valueObj) {
    cy.fillField(IntViewLocators.search, valueObj.enabledIntegration)
    app.assertAPIResponse("@IntSearch", 200)
    checkNoOfRows(1)
    cy.clickButton(IntViewLocators.allIntegrations.meatBall, true)
    cy.get(IntViewLocators.previewSetup.previewSetupButton).click()
    app.assertAPIResponse("@PreviewSetup", 200)
    cy.get("h1").should("contain", valueObj.previewSetupHeading)
    cy.get(IntViewLocators.previewSetup.previewSetupDescription).should("contain", valueObj.description)
    cy.get(IntViewLocators.previewSetup.versionLabel).should("contain", "Version")

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.connectApp1Heading)
    cy.get(IntViewLocators.previewSetup.connectedAccountOfApp).should("contain", valueObj.connectedOAuth)
    cy.get(IntViewLocators.previewSetup.topNavigation2ndTab).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.configureApp1Heading)
    app.assertAPIResponse("@endPoint", 200)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown1Val)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown2Val)
    cy.get(IntViewLocators.previewSetup.nextButton).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.connectApp2Heading)
    cy.get(IntViewLocators.previewSetup.connectedAccountOfApp).should("contain", valueObj.connectedAPIKey)
    cy.get(IntViewLocators.previewSetup.nextButton).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.configureApp2Heading)
    app.assertAPIResponse("@endPoint", 200)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown3Val)

    cy.get(IntViewLocators.previewSetup.versionDropdown).click({ force: true })
    cy.get(IntViewLocators.previewSetup.initailVersion).click()
    app.assertAPIResponse("@sdkConfig", 200)
    app.assertAPIResponse("@VersionChange", 200)

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.connectApp1Heading)
    cy.get(IntViewLocators.previewSetup.connectedAccountOfApp).should("contain", valueObj.connectedOAuth)
    cy.get(IntViewLocators.previewSetup.topNavigation2ndTab).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.configureApp1Heading)
    app.assertAPIResponse("@endPoint", 200)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown1Val)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown2Val)
    cy.get(IntViewLocators.previewSetup.nextButton).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.connectApp2Heading)
    cy.get(IntViewLocators.previewSetup.connectedAccountOfApp).should("contain", valueObj.connectedAPIKey)
    cy.get(IntViewLocators.previewSetup.nextButton).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.configureApp2Heading)
    app.assertAPIResponse("@endPoint", 200)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown3Val)

    cy.get(IntViewLocators.previewSetup.nextButton).click()

}

export function previewSetupForDisabledIntegration(valueObj) {
    cy.fillField(IntViewLocators.search, valueObj.disabledIntegration)
    app.assertAPIResponse("@IntSearch", 200)
    checkNoOfRows(1)
    cy.clickButton(IntViewLocators.allIntegrations.meatBall, true)
    cy.get(IntViewLocators.previewSetup.previewSetupButton).click()
    app.assertAPIResponse("@PreviewSetup", 200)
    cy.get("h1").should("contain", valueObj.previewSetupHeading)
    cy.get(IntViewLocators.previewSetup.previewSetupDescription).should("contain", valueObj.description)
    cy.get(IntViewLocators.previewSetup.versionLabel).should("contain", "Version")

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.connectApp1Heading)
    cy.get(IntViewLocators.previewSetup.connectedAccountOfApp).should("contain", valueObj.connectedOAuth2)
    cy.get(IntViewLocators.previewSetup.topNavigation2ndTab).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.configureApp1Heading)
    app.assertAPIResponse("@endPoint", 200)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown1ValforAccount2)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown2Val)
    cy.get(IntViewLocators.previewSetup.nextButton).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.connectApp2Heading)
    cy.get(IntViewLocators.previewSetup.connectedAccountOfApp).should("contain", valueObj.connectedAPIKey)
    cy.get(IntViewLocators.previewSetup.nextButton).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.configureApp2Heading)
    app.assertAPIResponse("@endPoint", 200)
    cy.get(IntViewLocators.previewSetup.changedTag).should("contain", "Changed")
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.updatedDropdown3Val)

    cy.get(IntViewLocators.previewSetup.versionDropdown).click({ force: true })
    cy.get(IntViewLocators.previewSetup.initailVersion).click()
    app.assertAPIResponse("@sdkConfig", 200)
    app.assertAPIResponse("@VersionChange", 200)

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.connectApp1Heading)
    cy.get(IntViewLocators.previewSetup.connectedAccountOfApp).should("contain", valueObj.connectedOAuth2)
    cy.get(IntViewLocators.previewSetup.topNavigation2ndTab).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.configureApp1Heading)
    app.assertAPIResponse("@endPoint", 200)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown1ValforAccount2)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown2Val)
    cy.get(IntViewLocators.previewSetup.nextButton).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.connectApp2Heading)
    cy.get(IntViewLocators.previewSetup.connectedAccountOfApp).should("contain", valueObj.connectedAPIKey)
    cy.get(IntViewLocators.previewSetup.nextButton).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.configureApp2Heading)
    app.assertAPIResponse("@endPoint", 200)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown3Val)

    cy.get(IntViewLocators.previewSetup.nextButton).click()
}

export function previewSetupForDeletedIntegration(valueObj) {

    cy.fillField(IntViewLocators.search, valueObj.deletedIntegration)
    app.assertAPIResponse("@IntSearch", 200)
    checkNoOfRows(1)
    cy.clickButton(IntViewLocators.allIntegrations.viewRunsButton, true)
    app.assertAPIResponse('@AllRuns', 200)
    //cy.get(IntViewLocators.previewSetup.previewSetupButton).click()
    // app.assertAPIResponse("@PreviewSetup", 200)
    cy.get(IntViewLocators.previewSetup.previewSetupButtonOnRunsPage).click()
    cy.get("h1").should("contain", valueObj.previewSetupHeading)
    cy.get(IntViewLocators.previewSetup.previewSetupDescription).should("contain", valueObj.description)
    cy.get(IntViewLocators.previewSetup.versionLabel).should("contain", "Version")

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.connectApp1Heading)
    cy.get(IntViewLocators.previewSetup.connectedAccountOfApp).should("contain", valueObj.connectedOAuth2)
    cy.get(IntViewLocators.previewSetup.topNavigation2ndTab).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.configureApp1Heading)
    app.assertAPIResponse("@endPoint", 200)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown1ValforAccount2)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.updatedDropdown2Val)
    cy.get(IntViewLocators.previewSetup.nextButton).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.connectApp2Heading)
    cy.get(IntViewLocators.previewSetup.connectedAccountOfApp).should("contain", valueObj.connectedAPIKey)
    cy.get(IntViewLocators.previewSetup.nextButton).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.configureApp2Heading)
    app.assertAPIResponse("@endPoint", 200)
    cy.get(IntViewLocators.previewSetup.changedTag).should("contain", "Changed")
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown3Val)

    cy.get(IntViewLocators.previewSetup.versionDropdown).click({ force: true })
    cy.get(IntViewLocators.previewSetup.initailVersion).click()
    app.assertAPIResponse("@sdkConfig", 200)
    app.assertAPIResponse("@VersionChange", 200)

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.connectApp1Heading)
    cy.get(IntViewLocators.previewSetup.connectedAccountOfApp).should("contain", valueObj.connectedOAuth2)
    cy.get(IntViewLocators.previewSetup.topNavigation2ndTab).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.configureApp1Heading)
    app.assertAPIResponse("@endPoint", 200)
    cy.get(IntViewLocators.previewSetup.subheaidng).should("be.visible")
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown1ValforAccount2)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown2Val)
    cy.get(IntViewLocators.previewSetup.nextButton).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.connectApp2Heading)
    cy.get(IntViewLocators.previewSetup.connectedAccountOfApp).should("contain", valueObj.connectedAPIKey)
    cy.get(IntViewLocators.previewSetup.nextButton).click()

    cy.get(IntViewLocators.previewSetup.stepHeading).should("contain", valueObj.configureApp2Heading)
    app.assertAPIResponse("@endPoint", 200)
    cy.get(IntViewLocators.previewSetup.dropdown).should("contain", valueObj.dropdown3Val)

    cy.get(IntViewLocators.previewSetup.nextButton).click()
}

export function openIntView() {
    cy.get(IntViewLocators.allIntegrations.integrationsView).should("be.visible")
    cy.get(IntViewLocators.allIntegrations.integrationsView).click() // clicking the integrations from flow page
    app.assertAPIResponse("@AllIntegration", 200)
}

export function clearFilter() {
    cy.get(IntViewLocators.clearAllFilters).click()
    app.assertAPIResponse("@AllIntegration", 200)
    cy.get(IntViewLocators.allIntegrations.newRow2).should("be.visible")
}
export function clearFilterOnRunsPage() {
    cy.get(IntViewLocators.clearAllFilters).click()
    app.assertAPIResponse("@AllIntegration", 200)
    cy.get(IntViewLocators.allIntegrations.newRow3).should("be.visible")
}

export function applyCompletedandEnabledFilter(enabledStatus, completedStatus) {
    cy.clickButton(IntViewLocators.filter, true)
    cy.get(IntViewLocators.allIntegrations.completedStatusRadioButton).click({ force: true })
    cy.get(IntViewLocators.allIntegrations.enabledRadioButton).click({ force: true })
    cy.get(IntViewLocators.filterApplyButton).click({ force: true })
    app.assertAPIResponse('@FilterOnAllIntPage', 200)
    cy.get(IntViewLocators.firstFilterPill).should("contain", enabledStatus)
    cy.get(IntViewLocators.secondFilterPill).should("contain", completedStatus)
    checkNoOfRows(2)
}

export function checkNoOfRows(val) {
    cy.get(IntViewLocators.totalRows) // this yields us a jquery object
        .its('length') // calls 'length' property returning that value
        .should('be.eq', val)

}

export function close2ndFilter() {
    cy.get(IntViewLocators.closeSecondFilter).click()
    app.assertAPIResponse("@AllIntegration", 200)
    cy.get(IntViewLocators.newRow).should("be.visible")
}

export function searchByUserID(val) {
    cy.fillField(IntViewLocators.search, val)
    app.assertAPIResponse("@IntSearch", 200)
    checkNoOfRows(1)
    cy.get(IntViewLocators.allIntegrations.userID).should("contain", val)
    cy.get(IntViewLocators.allIntegrations.integrationID).should("contain", "156900")
    cy.get(IntViewLocators.allIntegrations.integrationStatus + ":contains(Enabled)").should("be.visible")

}

export function enableDisbaleIntegration(diable_val, enable_val) {
    cy.clickButton(IntViewLocators.allIntegrations.meatBall, true)
    cy.get(IntViewLocators.allIntegrations.disableEnableButton).click()
    app.assertAPIResponse('@IntDisable', 200)
    cy.get(IntViewLocators.allIntegrations.toaste).should("contain", diable_val)

    cy.get(IntViewLocators.allIntegrations.closeToast).click()
    checkNoOfRows(1)
    cy.get(IntViewLocators.allIntegrations.userID).should("contain", 'api-key---rlw1-6695')
    cy.get(IntViewLocators.allIntegrations.integrationID).should("contain", "156900")
    //  cy.get(IntViewLocators.allIntegrations.integrationStatus).should("contain", 'Disabled')

    cy.get(IntViewLocators.allIntegrations.integrationStatus + ":contains(Disabled)").should("be.visible")




    cy.clickButton(IntViewLocators.allIntegrations.meatBall, true)
    cy.get(IntViewLocators.allIntegrations.disableEnableButton).click()
    app.assertAPIResponse('@IntEnable', 200)
    cy.get(IntViewLocators.allIntegrations.toaste).should("contain", enable_val)
    cy.get(IntViewLocators.allIntegrations.closeToast).click()
    //cy.get(IntViewLocators.allIntegrations.integrationStatus).should("contain", 'Enabled')
    checkNoOfRows(1)
    cy.get(IntViewLocators.allIntegrations.integrationStatus + ":contains(Enabled)").should("be.visible")
}

export function searchByIntegrationID(val) {
    cy.fillField(IntViewLocators.search, val)
    app.assertAPIResponse("@IntSearch", 200)
}

export function verifyAllIntegrationsPageTableHeadings(valueObj) {
    cy.get(IntViewLocators.containerHeading1).should("contain", valueObj.integrationData.integrationID)
    cy.get(IntViewLocators.containerHeading2).should("contain", valueObj.integrationData.userID)
    //cy.get(IntViewLocators.ContainerHeading3).should("contain", valueObj.IntegrationData.UserAuth)
    cy.get(IntViewLocators.containerHeading4).should("contain", valueObj.integrationData.dateCreated)
    cy.get(IntViewLocators.containerHeading5).should("contain", valueObj.integrationData.lastRunStart)
    cy.get(IntViewLocators.containerHeading6).should("contain", valueObj.integrationData.lastRunStatus)
    cy.get(IntViewLocators.containerHeading7).should("contain", valueObj.integrationData.integrationStatus)
    cy.get(IntViewLocators.allIntegrations.pages).should("contain", valueObj.noOfPages)
}

/* export function toUTCTimeZone(date) {

    let a = new Date(date)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var string = `${month[a.getUTCMonth()]}` + ` ` + `${a.getUTCDate()}, ` + `${a.getUTCHours() % 12 || 12}` + `:` + `${a.getUTCMinutes()} ` + `${a.getUTCHours() >= 12 ? 'PM' : 'AM'}`
    //console.log(string)
    return string;
} */



export function verifyIntegrationData(valueObj) {
    cy.get(IntViewLocators.allIntegrations.integrationID).should("contain", valueObj.integrationID_val)
    cy.get(IntViewLocators.allIntegrations.userID).should("contain", valueObj.userID_val)
    //cy.get(IntViewLocators.AllIntegrations.UserAuth).should("contain", '')
    const date = new Date();
    //cy.log((new Date).toString());
    const date_string = date.toString();

    if (date_string.indexOf("Pakistan") >= 0) {
        cy.get(IntViewLocators.allIntegrations.dateCreated).should("contain", valueObj.dateCreated_val)
        cy.get(IntViewLocators.allIntegrations.lastRunStart).should("contain", valueObj.lastRunStart_val)
    }

    else {

        cy.get(IntViewLocators.allIntegrations.dateCreated).should("contain", valueObj.dateCreated_val_inUTC)
        cy.get(IntViewLocators.allIntegrations.lastRunStart).should("contain", valueObj.lastRunStart_val_inUTC)
    }

    cy.get(IntViewLocators.allIntegrations.lastRunStatus).should("contain", valueObj.completedStatus)
    cy.get(IntViewLocators.allIntegrations.integrationStatus).should("contain", valueObj.enabledStatus)
    cy.get(IntViewLocators.allIntegrations.intCount).should("contain", valueObj.intCountAfterSearch)
    cy.get(IntViewLocators.allIntegrations.viewRunsButton).should("be.visible")
    cy.get(IntViewLocators.allIntegrations.meatBall).should("be.visible")
}
export function verifyErrorNotifMessage(valueObj) {
    cy.get(IntViewLocators.errorNotficationMessage).should("contain", valueObj.errorMessage)
}
export function clickViewRunsButton() {
    cy.clickButton(IntViewLocators.allIntegrations.viewRunsButton, true)
    app.assertAPIResponse('@AllRuns', 200)
}
export function verifyRunsPageHeadings(val) {

    cy.get(IntViewLocators.allRuns.runsPageHeading).should("contain", val)

}
export function verifyFlowsMetaData(valueObj) {
    cy.get(IntViewLocators.metaData.flowIcon).should("be.visible")
    cy.get(IntViewLocators.metaData.flowNameHeading).should("contain", valueObj.flowNameHeading)
    cy.get(IntViewLocators.metaData.flowName).should("contain", valueObj.flowName)
    cy.get(IntViewLocators.metaData.flowIDHeading).should("contain", valueObj.flowID)
    cy.get(IntViewLocators.metaData.flowID).should("contain", valueObj.flowID_val)
    cy.get(IntViewLocators.metaData.flowStatusHeading).should("contain", valueObj.flowStatus)
    cy.get(IntViewLocators.metaData.flowStatus).should("contain", valueObj.flowStatus_val)
}
export function verifyIntegrationsMetaData(valueObj, val) {
    cy.get(IntViewLocators.metaData.integrationHeading).should("contain", valueObj.integrationHeading)
    cy.get(IntViewLocators.metaData.integrationIDHeading).should("contain", valueObj.integrationID)
    cy.get(IntViewLocators.metaData.userIDHeading).should("contain", valueObj.userID)
    cy.get(IntViewLocators.metaData.userAuthHeading).should("contain", valueObj.userAuth)
    cy.get(IntViewLocators.metaData.dateCreatedHeading).should("contain", valueObj.dateCreated)
    cy.get(IntViewLocators.metaData.lastRunStartHeading).should("contain", valueObj.lastRunStart)
    cy.get(IntViewLocators.metaData.lastRunStatusHeading).should("contain", valueObj.lastRunStatus)
    cy.get(IntViewLocators.metaData.integrationStatusHeading).should("contain", valueObj.integrationStatus)
    cy.get(val).should("contain", valueObj.integrationID_val)
    cy.get(IntViewLocators.metaData.userID).should("contain", valueObj.userID_val)

    const date = new Date();
    const date_string = date.toString();
    if (date_string.indexOf("Pakistan") >= 0) {
        cy.get(IntViewLocators.metaData.dateCreated).should("contain", valueObj.dateCreated_val)
        cy.get(IntViewLocators.metaData.lastRunStart).should("contain", valueObj.lastRunStart_val)
    }
    else {
        cy.get(IntViewLocators.metaData.dateCreated).should("contain", valueObj.dateCreated_val_inUTC)
        cy.get(IntViewLocators.metaData.lastRunStart).should("contain", valueObj.lastRunStart_val_inUTC)
    }
    cy.get(IntViewLocators.metaData.lastRunStatus).should("contain", valueObj.completedStatus)
    cy.get(IntViewLocators.metaData.integrationStatus).should("contain", valueObj.enabledStatus)
}
export function verifyRunsPageTableHeadings(valueObj) {
    cy.get(IntViewLocators.allRuns.runsPageSubHeading).should("contain", valueObj.runSubHeading)
    cy.get(IntViewLocators.allRuns.containerHeading1).should("contain", valueObj.runsID)
    cy.get(IntViewLocators.allRuns.containerHeading2).should("contain", valueObj.triggerApp)
    cy.get(IntViewLocators.allRuns.containerHeading3).should("contain", valueObj.triggerName)
    cy.get(IntViewLocators.allRuns.containerHeading4).should("contain", valueObj.triggerType)
    cy.get(IntViewLocators.allRuns.containerHeading5).should("contain", valueObj.startTime)
    cy.get(IntViewLocators.allRuns.containerHeading6).should("contain", valueObj.duration)
    cy.get(IntViewLocators.allRuns.containerHeading7).should("contain", valueObj.status)
    cy.get(IntViewLocators.allRuns.containerHeading8).should("contain", valueObj.networkCode)
    cy.get(IntViewLocators.allRuns.containerHeading9).should("contain", valueObj.runCount)
}
export function searchRuns(valueObj) {
    cy.get(IntViewLocators.search).type(valueObj.searchstringWithinRuns)
    app.assertAPIResponse("@RunSearch", 200)
    cy.get(IntViewLocators.noSearchResult).should("contain", valueObj.zeroSearchResults)
}
export function searchWithinSteps(val) {
    cy.get(IntViewLocators.allRuns.hoverInternalSteps).trigger('mouseover')
    cy.get(IntViewLocators.allRuns.tooltipInternalSteps).should("contain", val)
    cy.get(IntViewLocators.allRuns.internalStepCheckBox).click()
    app.assertAPIResponse("@RunSearch", 200)
    checkNoOfRows(2)
    cy.get(IntViewLocators.allRuns.clearSearch).click()
    app.assertAPIResponse('@AllRuns', 200)

}
export function apply200andCompletedFilters(valueObj) {
    cy.clickButton(IntViewLocators.filter, true)
    cy.get(IntViewLocators.allRuns.filterCompletedRadioButton).check({ force: true })
    cy.get(IntViewLocators.allRuns.filter2xxRadiobutton).check({ force: true })
    cy.clickButton(IntViewLocators.filterApplyButton, true)
    app.assertAPIResponse('@FilterOnAllRunsPage', 200)
    cy.get(IntViewLocators.firstFilterPill).should("be.visible")
    cy.get(IntViewLocators.firstFilterPill).should("contain", valueObj.completed2xx)
    cy.get(IntViewLocators.secondFilterPill).should("contain", valueObj.completed)
    checkNoOfRows(6)

}
export function searchByRunID(val) {
    cy.get(IntViewLocators.search).type(val)
    app.assertAPIResponse("@RunSearch", 200)
    checkNoOfRows(1)
}

export function searchByTriggerApp(val) {
    cy.get(IntViewLocators.search).type(val)
    app.assertAPIResponse("@RunSearch", 200)
    checkNoOfRows(8)
    cy.get(IntViewLocators.allRuns.clearSearch).click()
    app.assertAPIResponse('@AllRuns', 200)
}

export function verifyRunData(valueObj) {
    cy.get(IntViewLocators.allIntegrations.integrationID).should("contain", valueObj.runID_val)
    cy.get(IntViewLocators.allRuns.triggeredAppLogo).should('be.visible')
    cy.get(IntViewLocators.allRuns.triggeredApp).should("contain", valueObj.triggerApp_val)
    cy.get(IntViewLocators.allRuns.triggerName).should("contain", valueObj.triggerName_val)
    cy.get(IntViewLocators.allRuns.triggerType).should("contain", valueObj.triggerType_val)
    const date = new Date();
    const date_string = date.toString();
    if (date_string.indexOf("Pakistan") >= 0) {
        cy.get(IntViewLocators.allRuns.startTime).should("contain", valueObj.startTime_val)
    }
    else {
        cy.get(IntViewLocators.allRuns.startTime).should("contain", valueObj.startTime_val_inUTC)
    }

    cy.get(IntViewLocators.allRuns.duration).should("contain", valueObj.duration_val)
    cy.get(IntViewLocators.allRuns.status).should("contain", valueObj.status_val)
    cy.get(IntViewLocators.allRuns.networkCode).should("contain", valueObj.networkCode_val)
}

export function clickViewStepsButton() {
    cy.clickButton(IntViewLocators.allRuns.stepsViewButton, true)
    app.assertAPIResponse('@AllSteps')

}
export function verifyStepsPageHeading(valueObj) {
    const date = new Date();
    const date_string = date.toString();
    if (date_string.indexOf("Pakistan") >= 0) {
        cy.get(IntViewLocators.steps.stepPageHeading).should("contain", valueObj.stepPageHeading)
    }
    else {
        cy.get(IntViewLocators.steps.stepPageHeading).should("contain", valueObj.stepPageHeading_inUTC)
    }

}

export function verifyRunsMetaData(valueObj) {
    cy.get(IntViewLocators.metaData.runsHeading).should("contain", valueObj.run)
    cy.get(IntViewLocators.metaData.runIDHeading).should("contain", valueObj.runsID)
    cy.get(IntViewLocators.metaData.runID).should("contain", valueObj.runID_val)
    cy.get(IntViewLocators.metaData.triggerAppHeading).should("contain", valueObj.triggerApp)
    cy.get(IntViewLocators.metaData.triggerNameHeading).should("contain", valueObj.triggerName)
    cy.get(IntViewLocators.metaData.triggerTypeHeading).should("contain", valueObj.triggerType)
    cy.get(IntViewLocators.metaData.startTimeHeading).should("contain", valueObj.startTime)
    cy.get(IntViewLocators.metaData.durationHeading).should("contain", valueObj.duration)
    cy.get(IntViewLocators.metaData.runStatusHeading).should("contain", valueObj.status)
    cy.get(IntViewLocators.metaData.triggerApp).should("contain", valueObj.triggerApp_val)
    cy.get(IntViewLocators.metaData.triggerName).should("contain", valueObj.triggerName_val)
    cy.get(IntViewLocators.metaData.triggerType).should("contain", valueObj.triggerType_val)

    const date = new Date();
    const date_string = date.toString();
    if (date_string.indexOf("Pakistan") >= 0) {
        cy.get(IntViewLocators.metaData.startTime).should("contain", valueObj.startTime_val)
    }
    else {
        cy.get(IntViewLocators.metaData.startTime).should("contain", valueObj.startTime_val_inUTC)
    }
    cy.get(IntViewLocators.metaData.duration).should("contain", valueObj.duration_val)
    cy.get(IntViewLocators.metaData.status).should("contain", valueObj.status_val)
}

export function verifyStepsPageHeadings(valueObj) {

    cy.get(IntViewLocators.steps.stepHeading).should("contain", valueObj.step)
    cy.get(IntViewLocators.steps.stepIDHeading).should("contain", valueObj.stepID)
    cy.get(IntViewLocators.steps.stepAppHeading).should("contain", valueObj.stepApp)
    cy.get(IntViewLocators.steps.stepNameHeading).should("contain", valueObj.stepName)
    cy.get(IntViewLocators.steps.startTimeHeading).should("contain", valueObj.startTime)
    cy.get(IntViewLocators.steps.duration).should("contain", valueObj.duration)
    cy.get(IntViewLocators.steps.status).should("contain", valueObj.status)
    cy.get(IntViewLocators.steps.networkCode).should("contain", valueObj.networkCode)
}
export function verifyTriggerData(valueObj1, valueObj2) {

    cy.get(IntViewLocators.steps.triggerStepID).should("contain", valueObj1.stepID_val)
    cy.get(IntViewLocators.steps.triggerStepApp).should("contain", valueObj2.triggerApp_val)
    cy.get(IntViewLocators.steps.triggerStepName).should("contain", valueObj2.triggerName_val)

    const date = new Date();
    const date_string = date.toString();
    if (date_string.indexOf("Pakistan") >= 0) {
        cy.get(IntViewLocators.metaData.startTime).should("contain", valueObj2.startTime_val)
    }
    else {
        cy.get(IntViewLocators.metaData.startTime).should("contain", valueObj2.startTime_val_inUTC)
    }
    cy.get(IntViewLocators.steps.triggerStepDuration).should("contain", valueObj2.duration_val)
    cy.get(IntViewLocators.steps.triggerStepStatus).should("contain", valueObj1.status_val)
    cy.get(IntViewLocators.steps.triggerStepNetworkCode).should("contain", valueObj1.networkCode_val)
}

export function verifyIfCOnditionData(valueObj) {
    cy.get(IntViewLocators.steps.ifStepID).should("contain", valueObj.stepID_val)
    cy.get(IntViewLocators.steps.ifStepApp).should("contain", valueObj.stepApp_val)
    cy.get(IntViewLocators.steps.ifStepName).should("contain", valueObj.stepName_val)

    const date = new Date();
    const date_string = date.toString();
    if (date_string.indexOf("Pakistan") >= 0) {
        cy.get(IntViewLocators.steps.ifStepTime).should("contain", valueObj.stepTime_val)
    }
    else {
        cy.get(IntViewLocators.steps.ifStepTime).should("contain", valueObj.stepTime_val_inUTC)
    }

    cy.get(IntViewLocators.steps.ifStepDuration).should("contain", valueObj.duration_val)
    cy.get(IntViewLocators.steps.ifStepStatus).should("contain", valueObj.status_val)
    cy.get(IntViewLocators.steps.ifStepNetworkCode).should("contain", valueObj.networkCode_val)
}

export function clickExpandStepsButton() {
    cy.get(IntViewLocators.steps.expandSteps).click()
}

export function verifyActionData(valueObj) {
    cy.get(IntViewLocators.steps.actionStepID).should("contain", valueObj.stepID_val)
    cy.get(IntViewLocators.steps.actionStepApp).should("contain", valueObj.stepApp_val)
    cy.get(IntViewLocators.steps.actionStepName).should("contain", valueObj.stepName_val)

    const date = new Date();
    const date_string = date.toString();
    if (date_string.indexOf("Pakistan") >= 0) {
        cy.get(IntViewLocators.steps.actionStepTime).should("contain", valueObj.stepTime_val)
    }
    else {
        cy.get(IntViewLocators.steps.actionStepTime).should("contain", valueObj.stepTime_val_inUTC)
    }


    cy.get(IntViewLocators.steps.actionStepDuration).should("contain", valueObj.duration_val)
    cy.get(IntViewLocators.steps.actionStepStatus).should("contain", valueObj.status_val)
    cy.get(IntViewLocators.steps.actionStepNetworkCode).should("contain", valueObj.networkCode_val)
}

export function clickViewPayloadButton(val1, val2) {
    cy.get(val1).should("contain", val2)
    cy.clickButton(val1, 'true')
    app.assertAPIResponse('@ViewPayload')
}


export function testTriggerToggle(valueObj, valueObj2) {
    if (valueObj2 == valueObj.trigger) {
        cy.get(IntViewLocators.steps.toggleSlider).should('have.css', 'background-color', valueObj.greenColor)
        cy.get(IntViewLocators.steps.toggle).click()
        cy.get(IntViewLocators.steps.toggleSlider).should('have.css', 'background-color', valueObj.greyColor)
        cy.get(IntViewLocators.steps.body).should("contain", valueObj2.responseBody_val)
        cy.get(IntViewLocators.steps.toggle).click()
    }
    else {
        cy.get(IntViewLocators.steps.toggleSlider).should('have.css', 'background-color', valueObj.greenColor)
        cy.get(IntViewLocators.steps.toggle).click()
        cy.get(IntViewLocators.steps.toggleSlider).should('have.css', 'background-color', valueObj.greyColor)
        cy.get(IntViewLocators.steps.toggle).click()
        cy.get(IntViewLocators.steps.body).should("contain", valueObj2.responseBody_val)
    }

}

export function verifyResponseData(valueObj, valueObj2) {

    cy.get(IntViewLocators.steps.responseTab).should('have.class', 'active')
    cy.get(IntViewLocators.steps.headerTitle).should("contain", valueObj.headers)
    cy.get(IntViewLocators.steps.bodyTitle).should("contain", valueObj.body)
    testTriggerToggle(valueObj, valueObj2)
}

export function verifyRequestData(valueObj, valueObj2) {

    cy.get(IntViewLocators.steps.requestTab).should("contain", valueObj.request)
    cy.get(IntViewLocators.steps.requestTab).click()
    cy.get(IntViewLocators.steps.requestTab).should("have.class", 'active')
    cy.get(IntViewLocators.steps.headerTitle).should("contain", valueObj.headers)
    cy.get(IntViewLocators.steps.bodyTitle).should("contain", valueObj.body)
    if (valueObj2 == valueObj.action) {
        cy.get(IntViewLocators.steps.URLVerb).should("contain", valueObj.action.POSTVerb)
        cy.get(IntViewLocators.steps.URLValue).should("have.value", valueObj.action.authURL)
        cy.get(IntViewLocators.steps.header).should("contain", valueObj.action.header_val)
        cy.get(IntViewLocators.steps.body).should("contain", valueObj.action.requestBody_val)
    }
    else if (valueObj2 == valueObj.ifCondition) {
        cy.get(IntViewLocators.steps.URLVerb).should("be.empty")
        cy.get(IntViewLocators.steps.URLValue).should("be.empty")
    }
    else {
        cy.get(IntViewLocators.steps.URLVerb).should("contain", valueObj2.POSTVerb)
        cy.get(IntViewLocators.steps.URLValue).should("have.value", valueObj2.endpointCall)
        cy.get(IntViewLocators.steps.header).should("contain", valueObj2.headercall)
        cy.get(IntViewLocators.steps.body).should("contain", valueObj2.body_val)

    }
}
export function verifyObjectData(valueObj) {
    cy.get(IntViewLocators.steps.objectTab).should("contain", valueObj.object)
    cy.get(IntViewLocators.steps.objectTab).click()
    cy.get(IntViewLocators.steps.objectTab).should("have.class", 'active')
    cy.get(IntViewLocators.steps.headerTitle).should("contain", valueObj.headers)
    cy.get(IntViewLocators.steps.bodyTitle).should("contain", valueObj.body)


}
export function verifyTriggerPayload(valueObj) {

    clickViewPayloadButton(IntViewLocators.steps.triggerPayloadButton, valueObj.viewPayload)
    verifyResponseData(valueObj, valueObj.trigger)
    verifyRequestData(valueObj, valueObj.trigger)
    verifyObjectData(valueObj)
    cy.get(IntViewLocators.steps.triggerPayloadButton).should("contain", valueObj.hidePayload)

}


export function verifyActionPayload(valueObj) {
    clickViewPayloadButton(IntViewLocators.steps.actionPayloadButton, valueObj.viewPayload)
    verifyResponseData(valueObj, valueObj.action)
    verifyRequestData(valueObj, valueObj.action)
    verifyObjectData(valueObj)
    clickExpandStepsButton()
}