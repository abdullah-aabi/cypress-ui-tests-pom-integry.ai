/*	Business helper functions i.e. app focused
    Each business helper function will internally call technical helper functions to execute desired steps
    Test cases will primarily call these business helper functions
*/

import { generateUUID } from "../commands.js"

const connectorLocators = require("../../Locators/ConnectorsLocators.js")
const app = require("./app.js")

//	Connector related functions

export function goToConnectorsTab() {
    //cy.clickButton(connectorLocators.connectorNavLink) // For Normal user
    cy.visit("/wapp/apps/v4/internal/ie") // For Internal IEs to access apps.
    app.assertAPIResponse("@getAllApps")
}

export function createConnector() {
    cy.clickButton(connectorLocators.createConnectorBtn)
}

export function openConnector(appName, id) {
    const connectorName = appName + "_" + id
    cy.clickButton("[id*=" + connectorName + "]")
    app.assertAPIResponse("@getEndpoints")
}

//	Basic Info functions
export function createQueryActivity(objName) {
    cy.clickButton(connectorLocators.editEndPonit.sidebarNav, true, 3)
    cy.clickButton(connectorLocators.queryPage.createQueryBtn)
    cy.fillField(connectorLocators.queryPage.name, objName.name)
    cy.fillField(connectorLocators.queryPage.description, objName.description)
    cy.selectFromDropdown(connectorLocators.queryPage.authSelectionDropDown, objName.authType, 0)
    cy.selectFromDropdown(connectorLocators.queryPage.inputObjectDropDown, objName.inputObjValue)
    cy.selectFromDropdown(connectorLocators.queryPage.objectActionDropDown, objName.objActionValue)
    // cy.clickButton(connectorLocators.queryPage.pollBasedSlider)
    cy.selectFromDropdown(connectorLocators.queryPage.triggerEndpointDropDown, objName.pollEndpoint)
}
export function addHomepageUrl(homepageUrl) {
    cy.fillField(connectorLocators.homepageUrl, homepageUrl)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@UpdateApp")
}

export function addBasicInfo(basicInfoObj) {
    cy.fillField(connectorLocators.title, basicInfoObj.title, true)
    cy.fillField(connectorLocators.description, basicInfoObj.description)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@UpdateApp")
    app.assertAPIResponse("@WaitApp")
}
export function updateBasicInfo(basicInfoObj) {
    cy.clickButton(connectorLocators.appDetailsBtn)
    cy.fillField(connectorLocators.description, basicInfoObj.description)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@UpdateApp")
}

//	Authorizations functions

export function openAuthorizations() {
    cy.clickButton(connectorLocators.sideBar, false, 1)
    app.assertAPIResponse("@authTypes")
    app.assertAPIResponse("@verifyConnection")
    cy.clickButton(connectorLocators.authRow)
    app.assertAPIResponse("@connectedAccounts")
    app.assertAPIResponse("@endPointAuth")
}

export function openAuthConfigStep(name, index) {
    cy.clickButton(connectorLocators.authStep, true, index)
    cy.assertText(connectorLocators.authStepName, name)
}

export function selectAuthType(authName) {
    cy.selectFromDropdown(connectorLocators.dropdown, authName)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@authTypes")
    app.assertAPIResponse("@UpdateApp")
    app.assertAPIResponse("@connectedAccounts")
}

export function authenticateAPI(reqObj) {
    addReqDetails(reqObj)
    testAuthorization()
    addCredentials(reqObj)
    submitCredentials(reqObj.submitBtnText)
}

export function addReqDetails(reqObj) {
    // case for "API Key + secret", and required for every other auth type
    cy.fillField(connectorLocators.baseUrl, reqObj.baseUrl)
    cy.fillField(connectorLocators.action, reqObj.action)

    switch (reqObj.authType) {
        case "API key + secret + region":
            cy.assertText(connectorLocators.reqUrl, reqObj.reqUrl)
            cy.selectFromDropdown(connectorLocators.dropdown, reqObj.reqType)
            cy.fillJson(connectorLocators.json, reqObj.json)
            break

        case "API Secret":
            cy.assertText(connectorLocators.reqUrl, reqObj.reqUrl)
            cy.fillField(connectorLocators.firstHeaderKey, reqObj.apiTokenKey)
            cy.fillField(connectorLocators.firstHeaderValue, reqObj.apiTokenValue)
            break

        case "API key + URL":
            cy.assertText(connectorLocators.reqUrl, reqObj.reqUrl)
            cy.fillField(connectorLocators.firstHeaderKey, reqObj.authKey)
            cy.fillField(connectorLocators.firstHeaderValue, reqObj.authValue)
            break

        case "Basic + URL":
            cy.assertText(connectorLocators.reqUrl, reqObj.reqUrl)
            cy.fillField(connectorLocators.firstHeaderKey, reqObj.authKey)
            cy.fillField(connectorLocators.firstHeaderValue, reqObj.authValue)
            break

        case "Jira Basic + URL":
        case "OAuth2":
            cy.assertText(connectorLocators.reqUrl, reqObj.reqUrl)
            cy.fillField(connectorLocators.firstHeaderKey, reqObj.authKey)
            cy.fillField(connectorLocators.firstHeaderValue, reqObj.authValue)
            cy.clickButton(connectorLocators.addReqHeaderBtn)
            cy.fillField(connectorLocators.secHeaderKey, reqObj.contentTypeKey)
            cy.fillField(connectorLocators.secHeaderValue, reqObj.contentTypeValue)
            break

        default:
        //	"API Key + secret" don't need any default case
    }
}

export function testAuthorization() {

    cy.saveWindow(connectorLocators.testAuthenticationBtn)
    app.assertAPIResponse("@endPointAuth")
    app.assertAPIResponse("@authTypes")
    app.assertAPIResponse("@UpdateApp")
}

export function addCredentials(reqObj) {
    cy.detectWindow()
    cy.isElementVisible(connectorLocators.authName)
    cy.fillField(connectorLocators.authName, reqObj.authName)
    switch (reqObj.authType) {
        case "API key + secret":
            cy.fillField(connectorLocators.apiKey, reqObj.apiKey)
            cy.fillField(connectorLocators.apiSecret, reqObj.apiSecret)
            break

        case "API key + URL":
            cy.fillField(connectorLocators.url, reqObj.baseUrl)
            cy.fillField(connectorLocators.authApi, reqObj.apiKey)
            break

        case "API key + secret + region":
            cy.fillField(connectorLocators.apiKey, reqObj.apiKey)
            cy.fillField(connectorLocators.apiSecret, reqObj.apiSecret)
            cy.fillField(connectorLocators.region, reqObj.region)
            break

        case "API Secret":
            cy.fillField(connectorLocators.apiSecret, reqObj.apiSecret)
            break
        case "Basic":
            cy.fillField(connectorLocators.username, reqObj.username)
            cy.fillField(connectorLocators.password, reqObj.password)
            break
        default: // For "Basic + URL" and "Jira Basic + URL"
            cy.fillField(connectorLocators.url, reqObj.baseUrl)
            cy.fillField(connectorLocators.username, reqObj.username)
            cy.fillField(connectorLocators.password, reqObj.password)
    }
}

export function submitCredentials(buttonText) {
    cy.assertText(connectorLocators.submitBtn, buttonText)
    cy.clickButton(connectorLocators.submitBtn)
    app.assertAPIResponse("@connectedAccounts")
    app.assertAPIResponse("@authTypes")
    app.assertAPIResponse("@UpdateApp")
    app.assertAPIResponse("@endPointAuth")
}

export function configureOAuth2(clientId, clientSecret, reqObj) {
    cy.fillField(connectorLocators.clientId, clientId)
    cy.fillField(connectorLocators.clientSecret, clientSecret)
    cy.selectFromDropdown(connectorLocators.dropdown, reqObj.grantType)
    cy.fillField(connectorLocators.authorizationUri, reqObj.authorizationUri)
    cy.clickButton(connectorLocators.customizeTokenBtn)
    cy.fillField(connectorLocators.baseUrl, reqObj.baseUrl)
    cy.fillField(connectorLocators.action, reqObj.tokenAction)
    cy.assertText(connectorLocators.reqUrl, reqObj.tokenUrl)
    testAuthorization()
}

export function addOAuth2Credentials(reqObj) {
    cy.detectWindow()
    cy.isElementVisible(connectorLocators.username)
    cy.fillField(connectorLocators.username, reqObj.username)
    cy.fillField(connectorLocators.oauth2Password, reqObj.password)
    cy.assertValue(connectorLocators.submitBtn, reqObj.logInBtnText)
    cy.clickButton(connectorLocators.submitBtn)
    app.assertAPIResponse("@mailchimpAuthPost", 302)
    app.assertAPIResponse("@mailchimpConfirmAuth")
    cy.loadWindow()
    cy.wait(Cypress.env("minTimeout"))
    cy.detectWindow()
    cy.isElementVisible(connectorLocators.submitBtn)
    cy.assertValue(connectorLocators.submitBtn, reqObj.allowBtnText)
    cy.clickButton(connectorLocators.submitBtn, true)
    app.assertAPIResponse("@mailchimpConfirmAuthPost", 302)
    app.assertAPIResponse("@redirectAuth")
}

export function verifyTestResult(successMsg) {
    cy.loadWindow()
    cy.assertText(connectorLocators.bannerSuccessMsg, successMsg)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@UpdateApp")
    app.assertAPIResponse("@authTypes")
    app.assertAPIResponse("@endPointAuth")
}

export function verifyNextStepName(route, name) {
    cy.assertPageUrl(route)
    cy.assertText(connectorLocators.activitiesStep, name)
}

export function processResponse(resObj, isActivity) {
    cy.containsText(connectorLocators.runBtn, resObj.runBtnText)
    cy.clickButton(connectorLocators.runBtn, true)
    app.assertAPIResponse("@render")
    cy.assertText(connectorLocators.bannerSuccessMsg, resObj.statusSuccessMsg)
    cy.containsText(connectorLocators.continueBtn, resObj.continueBtnText)
    cy.clickButton(connectorLocators.continueBtn, true)
    app.assertAPIResponse("@render")
    app.assertAPIResponse("@endPointAuth")
    if (isActivity)
        app.assertAPIResponse("@updateActivity")
    else
        app.assertAPIResponse("@authTypes")
    app.assertAPIResponse("@UpdateApp")
    cy.containsText(connectorLocators.authStepName, resObj.otherInfoStep)
    cy.containsText(connectorLocators.continueBtn, resObj.doneBtnText)
    cy.clickButton(connectorLocators.continueBtn)
}
export function triggerComplete(resObj) {
    cy.containsText(connectorLocators.runBtn, resObj.runBtnText)
    cy.clickButton(connectorLocators.runBtn, true)
    app.assertAPIResponse("@render")
    cy.assertText(connectorLocators.bannerSuccessMsg, resObj.statusSuccessMsg)
    cy.containsText(connectorLocators.continueBtn, resObj.continueBtnText)
}

//	Activities functions

export function openActivityType(name, index) {
    cy.assertText(connectorLocators.activityType, name, index)
    cy.clickButton(connectorLocators.activityType, false, index)
    app.assertAPIResponse("@endpointTypes")
}

export function addActionInfo(infoObj) {
    cy.fillField(connectorLocators.name, infoObj.name)
    cy.fillField(connectorLocators.description, infoObj.description)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@updateActivity")
    app.assertAPIResponse("@UpdateApp")
}
export function addTriggerInfo(infoObj) {
    window.uniqueId = generateUUID();
    cy.fillField(connectorLocators.name, infoObj.name + window.uniqueId)
    cy.fillField(connectorLocators.description, infoObj.description)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@updateActivity")
    app.assertAPIResponse("@UpdateApp")
    cy.fixture("UniqueIds").then(data => {
        data.insightlyTriggerId = window.uniqueId
        cy.writeFile('cypress/fixtures/UniqueIds.json', JSON.stringify(data))
    })
}

export function addQueryInfo(infoObj) {
    window.uniqueId = generateUUID();
    cy.fillField(connectorLocators.name, infoObj.name + window.uniqueId)
    cy.fillField(connectorLocators.description, infoObj.description)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@updateActivity")
    app.assertAPIResponse("@UpdateApp")
    // cy.fixture("UniqueIds").then(data => {
    // 	data.insightlyQueryId = window.uniqueId
    // 	cy.writeFile('cypress/fixtures/UniqueIds.json', JSON.stringify(data))
    // })
}

export function addActionTextField(actionObj) {
    cy.selectFromDropdown(connectorLocators.fieldType, actionObj.fieldType)
    cy.fillField(connectorLocators.title, actionObj.title)
    cy.fillField(connectorLocators.titleDescription, actionObj.titleDescription)
    cy.fillField(connectorLocators.placeholder, actionObj.placeholder)
    cy.clickButton(connectorLocators.closeBtn)
    // cy.assertText(connectorLocators.titleText, actionObj.title)
    // cy.assertText(connectorLocators.descText, actionObj.titleDescription)
    // cy.assertValue(connectorLocators.placeholderValue, actionObj.placeholder)
}

export function connectActionAccount(accountObj) {
    cy.intercept("POST", Cypress.env("base_url") + "/auth/verify*").as("verifyInsightlyConnection")
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@updateActivity")
    app.assertAPIResponse("@UpdateApp")
    cy.assertText(connectorLocators.connectionLabel, accountObj.connectionLabel)
    app.assertAPIResponse("@verifyInsightlyConnection")
    cy.assertText(connectorLocators.connectionStatus, accountObj.connectionStatus)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@updateActivity")
    app.assertAPIResponse("@UpdateApp")
}

export function connectUpdateAccount(accountObj) {
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@updateActivity")
    app.assertAPIResponse("@UpdateApp")
    cy.assertText(connectorLocators.connectionLabel, accountObj.connectionLabel)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@updateActivity")
    app.assertAPIResponse("@UpdateApp")
}

export function addTextFieldsValueWithUniqueEmail(valueObj) {
    cy.enterUniqueEmail(connectorLocators.emailValue, valueObj.email_Unique)
    cy.fillField(connectorLocators.fieldValue2, valueObj.firstName_Unique)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@updateActivity")
    app.assertAPIResponse("@UpdateApp")
}
export function selectTriggerType(type) {
    if (type === "Poll Based")
        cy.clickButton(connectorLocators.pollRadioBtn)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@ApiEndpoints")
    app.assertAPIResponse("@updateActivity")
    app.assertAPIResponse("@UpdateApp")
    // app.assertAPIResponse("@endPointAuth")
}

export function verifyTriggerResult(successMsg) {
    cy.assertText(connectorLocators.bannerSuccessMsg, successMsg)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@updateActivity")
    app.assertAPIResponse("@UpdateApp")
    app.assertAPIResponse("@endPointAuth")
}
export function apiPostCall(reqObj, valueObj) {
    cy.fillJson(connectorLocators.json, reqObj.payloadJsonInput)
    cy.fillField(connectorLocators.sendApiCall.baseUrl, valueObj.baseUrl)
    cy.fillField(connectorLocators.sendApiCall.authAction, valueObj.authAction)
    cy.fillField(connectorLocators.sendApiCall.headerKey, valueObj.headerKey)
    cy.fillField(connectorLocators.sendApiCall.headerValue, valueObj.headerValue)
    cy.clickButton(connectorLocators.sendApiCall.addHeaderBtn)
    cy.clickButton(connectorLocators.sendApiCall.header2KeyBtn)
    cy.clickButton(connectorLocators.sendApiCall.header2OptionTextButton, 1)
    cy.fillField(connectorLocators.sendApiCall.header2Value, valueObj.header2Value)
    cy.clickButton(connectorLocators.testAuthenticationBtn)
}

export function apiQueryCall(valueObj) {
    cy.clickButton(connectorLocators.sendQueryApiCall.requestMethodBtn)
    cy.clickButton(connectorLocators.sendQueryApiCall.requestoptionBtn, 0)
    cy.fillField(connectorLocators.sendQueryApiCall.baseUrl, valueObj.baseUrl)
    cy.fillField(connectorLocators.sendQueryApiCall.headerKey, valueObj.headerKey)
    cy.fillField(connectorLocators.sendQueryApiCall.headerValue, valueObj.headerValue)
    cy.clickButton(connectorLocators.sendQueryApiCall.paginationBtn)
    cy.fillField(connectorLocators.sendQueryApiCall.pageLimit, valueObj.pageLimit)
    cy.fillField(connectorLocators.sendQueryApiCall.pageSize, valueObj.pageSize)
    cy.fillField(connectorLocators.sendQueryApiCall.pageOffSet, valueObj.pageOffSet)
    cy.fillField(connectorLocators.sendQueryApiCall.totalItems, valueObj.totalItems)
    cy.clickButton(connectorLocators.sendQueryApiCall.advanceSettingBtn)
    cy.fillField(connectorLocators.sendQueryApiCall.dynamicPage, valueObj.dynamicPage)
    cy.fillField(connectorLocators.sendQueryApiCall.dynamicOffSet, valueObj.dynamicOffSet)
    cy.fillField(connectorLocators.sendQueryApiCall.nextLink, valueObj.nextLink)
    cy.fillField(connectorLocators.sendQueryApiCall.itemVariable, valueObj.itemVariable)
    cy.fillField(connectorLocators.sendQueryApiCall.increamentVariable, valueObj.increamentVariable)
    cy.clickButton(connectorLocators.testAuthenticationBtn)
    cy.assertText(connectorLocators.sendQueryApiCall.bannerSuccessTextMsg, valueObj.bannerSuccessTextMsg)
    cy.assertText(connectorLocators.sendQueryApiCall.continueTextButton, valueObj.continueTextButton)
    cy.clickButton(connectorLocators.sendQueryApiCall.continueTextButton)
    app.assertAPIResponse("@UpdateApp")


}

export function verifyActionResult(successMsg) {
    cy.assertText(connectorLocators.bannerSuccessMsg, successMsg)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@updateActivity")
    app.assertAPIResponse("@UpdateApp")
    app.assertAPIResponse("@endPointAuth")
}

export function cloneConnector(obj) {
    cy.get(connectorLocators.hover).eq(0).trigger("mouseover")
    cy.clickButton(connectorLocators.cloneConnector.dropDownBtn)
    cy.clickButton(connectorLocators.cloneConnector.cloneBtn)
    cy.clickButton(connectorLocators.cloneConnector.submitBtn)
    cy.assertText(connectorLocators.cloneConnector.tostfyMsg, obj.cloneMsg)
    cy.clickButton(connectorLocators.cloneConnector.toastCloseBtn)
    cy.get(connectorLocators.hover).eq(1).trigger("mouseover")
    cy.clickButton(connectorLocators.cloneConnector.dropDownBtn, true)
    cy.clickButton(connectorLocators.cloneConnector.deleteBtn)
    cy.clickButton(connectorLocators.cloneConnector.redBtn)
    cy.assertText(connectorLocators.cloneConnector.tostfyMsg, obj.deleteMsg)
}
export function poolApiCall(valueObj) {
    // cy.get(connectorLocators.testAuthenticationBtn).should("be.visible")
    // cy.get(connectorLocators.sendApiCall.base_UrlTagBtn).should("be.visible")
    // cy.get(connectorLocators.sendApiCall.base_UrlTagBtn).should("not.have.class", "selected")
    cy.clickButton(connectorLocators.sendApiCall.base_UrlTagBtn)
    cy.get(connectorLocators.sendApiCall.base_UrlTagBtn).invoke("attr", "class").then(btnClass => {
        if (btnClass.includes("selected")) {
        }
        else {
            cy.clickButton(connectorLocators.sendApiCall.base_UrlTagBtn)
        }
    })
    // click text of the button. selected > class
    cy.clickSpecificButton(valueObj.baseUrlOption, connectorLocators.sendApiCall.base_UrlTageDropdown, 0)
    cy.fillField(connectorLocators.sendApiCall.authAction, valueObj.authAction)
    cy.fillField(connectorLocators.sendApiCall.headerKey, valueObj.headerKey)
    cy.fillField(connectorLocators.sendApiCall.headerValue, valueObj.headerValue)
    cy.clickButton(connectorLocators.sendApiCall.addHeaderBtn)
    cy.clickButton(connectorLocators.sendApiCall.header2KeyBtn)
    cy.clickButton(connectorLocators.sendApiCall.header2OptionTextButton, 1)
    cy.fillField(connectorLocators.sendApiCall.header2Value, valueObj.header2Value)
    cy.clickButton(connectorLocators.sendApiCall.paginationSlider)
    cy.fillField(connectorLocators.sendApiCall.limitCount, valueObj.limitCount)
    cy.fillField(connectorLocators.sendApiCall.limitValue, valueObj.limitValue)
    cy.fillField(connectorLocators.sendApiCall.offset, valueObj.offsetParameter)
    cy.clickButton(connectorLocators.testAuthenticationBtn)
    cy.clickButton(connectorLocators.continueBtn)
    cy.clickButton(connectorLocators.sendApiCall.object, true)
    cy.clickButton(connectorLocators.sendApiCall.objectDropdown, true, 2)
    cy.clickButton(connectorLocators.sendApiCall.object, true, 1)
    cy.clickButton(connectorLocators.sendApiCall.objectDropdown, true)
    cy.clickButton(connectorLocators.continueBtn)
    app.assertAPIResponse("@updateActivity")
    app.assertAPIResponse("@testQuery")
    // cy.isElementVisible(connectorLocators.continueBtn)
    cy.clickButton(connectorLocators.continueBtn + ":contains(Continue)")
    cy.isElementVisible("a:contains('Test Trigger" + window.uniqueId + "')")
}
//For v3
export function triggerTrackingProperty(objName) {
    cy.clickButton(connectorLocators.editEndPonit.sidebarNav, true, 5)

    cy.fixture("Connectors_data").then(data => {
        cy.fixture("UniqueIds").then(ids => {
            cy.get("a:contains(Test Trigger" + window.uniqueId + ")").first().click()
        })

    })
    // cy.get(connectorLocators.editEndPonit.triggerBtn).last().click()
    cy.get(connectorLocators.editEndPonit.ednpointBtn).invoke('removeAttr', 'target').click()
    cy.clickButton(connectorLocators.editEndPonit.baseUrlv3)
    cy.clickButton(connectorLocators.editEndPonit.caseUrlDropDOwn, true, 2)
    cy.fillField(connectorLocators.editEndPonit.propertyName, objName.propertyNameText)
    cy.clickButton(connectorLocators.editEndPonit.saveBtn)
}
export function poolApiCallForQuery(valueObj) {
    cy.get(connectorLocators.testAuthenticationBtn).should("be.visible")
    cy.get(connectorLocators.sendApiCall.base_UrlTagBtn).should("be.visible")
    cy.get(connectorLocators.sendApiCall.base_UrlTagBtn).should("not.have.class", "selected")
    cy.clickButton(connectorLocators.sendApiCall.base_UrlTagBtn)
    cy.get(connectorLocators.sendApiCall.base_UrlTagBtn).invoke("attr", "class").then(btnClass => {
        if (btnClass.includes("selected")) {
        }
        else {
            cy.clickButton(connectorLocators.sendApiCall.base_UrlTagBtn)
        }
    })
    // click text of the button. selected > class
    cy.clickSpecificButton(valueObj.baseUrlOption, connectorLocators.sendApiCall.base_UrlTageDropdown, 0)

    // cy.fillField(connectorLocators.sendApiCall.baseUrl, valueObj.baseUrl)
    cy.fillField(connectorLocators.sendApiCall.authAction, valueObj.authAction)
    cy.fillField(connectorLocators.sendApiCall.headerKey, valueObj.headerKey)
    cy.fillField(connectorLocators.sendApiCall.headerValue, valueObj.headerValue)
    cy.clickButton(connectorLocators.sendApiCall.addHeaderBtn)
    cy.clickButton(connectorLocators.sendApiCall.header2KeyBtn)
    cy.clickButton(connectorLocators.sendApiCall.header2OptionTextButton, 1)
    cy.fillField(connectorLocators.sendApiCall.header2Value, valueObj.header2Value)
    cy.clickButton(connectorLocators.sendApiCall.paginationSlider)
    cy.fillField(connectorLocators.sendApiCall.limitCount, valueObj.limitCount)
    cy.fillField(connectorLocators.sendApiCall.limitValue, valueObj.limitValue)
    cy.fillField(connectorLocators.sendApiCall.offset, valueObj.offsetParameter)
    cy.clickButton(connectorLocators.testAuthenticationBtn)
    cy.clickButton(connectorLocators.continueBtn)
    cy.clickButton(connectorLocators.continueBtn)
    cy.get('p.text-heading').should('have.text', "Output")
    cy.clickButton(connectorLocators.continueBtn)
    cy.clickButton(connectorLocators.sendApiCall.object)
    cy.clickButton(connectorLocators.sendApiCall.objectDropdown, true, 2)
    cy.clickButton(connectorLocators.sendApiCall.object, true, 1)
    cy.clickButton(connectorLocators.sendApiCall.objectDropdown, true, 1)
    cy.clickButton(connectorLocators.continueBtn)

}

export function exitConnector() {
    cy.clickButton(connectorLocators.actionPage.exitBtn)
    app.assertAPIResponse("@UpdateApp")
}
export function addConnectorEndpoint() {
    cy.visit("/wapp/apps/v3/") // For Internal IEs to access apps.
    app.assertAPIResponse("@getAllApps")
    cy.fixture("Connectors_data").then(data => {
        cy.fixture("UniqueIds").then(ids => {
            cy.get("a:contains(Insightly_" + window.uniqueId + ")").first().click()
        })
    })
    cy.clickButton(connectorLocators.editEndPonit.sidebarNav, true, 1)
    cy.clickButton(connectorLocators.editEndPonit.editAuthBtn)
    cy.clickButton(connectorLocators.editEndPonit.authDropDown, false, 2)
    cy.clickButton(connectorLocators.editEndPonit.authEndpointOption, false, 1)
    cy.clickButton(connectorLocators.editEndPonit.saveAuthBtn)
}