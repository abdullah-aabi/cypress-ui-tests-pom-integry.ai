const connectorLocators = require("../../Locators/ConnectorsLocators.js")
const app = require("./app.js")

//	Activity functions

/*
	Functions which are common irrespective of the activity type
*/

export function goToActivities() {
	cy.clickButton(connectorLocators.sideBar, false, 2)
	// app.assertAPIResponse("@getActivity")
}

export function createActivity(buttonText) {
	cy.assertText(connectorLocators.createActivityBtn, buttonText)
	cy.clickButton(connectorLocators.createActivityBtn)
}

export function openActivityType(name, index) {
	cy.assertText(connectorLocators.activityType, name, index)
	cy.clickButton(connectorLocators.activityType, false, index)
	app.assertAPIResponse("@endpointTypes")
}

export function addActivityInfo(infoObj) {
	cy.fillField(connectorLocators.name, infoObj.name + window.uniqueId)
	cy.fillField(connectorLocators.description, infoObj.description)
	cy.clickButton(connectorLocators.continueBtn)
	app.assertAPIResponse("@updateActivity")
	app.assertAPIResponse("@UpdateApp")
}

export function addTextFields(fieldArray) {
	//	Includes fields which requires text input e.g. textfield, textarea, password, hidden
	fieldArray.forEach((field, index) => {
		cy.selectFromDropdown(connectorLocators.fieldType, field.fieldType)
		cy.fillField(connectorLocators.title, field.title)
		cy.fillField(connectorLocators.titleDescription, field.titleDescription)
		cy.fillField(connectorLocators.placeholder, field.placeholder)
		cy.clickButton(connectorLocators.closeBtn)
		cy.assertText(connectorLocators.titleText, field.title, index)
		cy.assertText(connectorLocators.descText, field.titleDescription, index)
		cy.assertValue(connectorLocators.placeholderValue, field.placeholder, index)
	})
	cy.clickButton(connectorLocators.continueBtn)
	app.assertAPIResponse("@updateActivity")
	app.assertAPIResponse("@UpdateApp")
}

export function addAdvancedFields(fieldArray) {
	//	Includes fields which requires option selection e.g. checkbox, radio
	fieldArray.forEach((field, index) => {
		cy.selectFromDropdown(connectorLocators.fieldType, field.fieldType)
		cy.fillField(connectorLocators.title, field.title)
		cy.fillField(connectorLocators.titleDescription, field.titleDescription)
		if (field.fieldType === "Checkbox") {
			cy.clickButton(connectorLocators.addDataSource)
			// cy.selectFromDropdown(connectorLocators.dropdown, field.addDataSource)
			configureDataSource(field)
		}
		else if (field.fieldType === "Radio" || field.fieldType === "Dropdown")
			cy.selectFromDropdown(connectorLocators.dropdown, field.endpointName)
		else if (field.fieldType === "Field Mapping") {
			cy.selectFromDropdown(connectorLocators.dropdown, field.addDataSource)
			// cy.clickButton(connectorLocators.addDataSource)
			configureDataSource(field)
		}
		cy.clickButton(connectorLocators.closeBtn)
		cy.assertText(connectorLocators.titleText, field.title, index)
		cy.assertText(connectorLocators.descText, field.titleDescription, index)
	})
	cy.clickButton(connectorLocators.continueBtn)
	app.assertAPIResponse("@updateActivity")
	app.assertAPIResponse("@UpdateApp")
}

export function configureDataSource(config) {
	app.assertAPIResponse("@verifyConnection")
	cy.clickButton(connectorLocators.continueBtn)
	cy.fillField(connectorLocators.endpoint, config.endpointName)
	addReqDetails(config)
	addHeaders(config)
	cy.clickButton(connectorLocators.testAuthenticationBtn)
	app.assertAPIResponse("@endPointAuth")
	cy.assertText(connectorLocators.bannerSuccessMsg, config.successMessage)
	cy.clickButton(connectorLocators.continueBtn)
	app.assertAPIResponse("@endPointAuth")
	cy.fillCode(connectorLocators.json, config.jsonCode)
	cy.clickButton(connectorLocators.runBtn)
	app.assertAPIResponse("@render")
	cy.assertText(connectorLocators.bannerSuccessMsg, config.statusSuccessMsg)
	cy.clickButton(connectorLocators.continueBtn)
	app.assertAPIResponse("@render")
	app.assertAPIResponse("@endPointAuth")
}

export function connectAccount(accountObj, isVerified, isConnected) {
	if (!isConnected) {
		cy.assertText(connectorLocators.connectionLabel, accountObj.connectionLabel)
		app.assertAPIResponse("@verifyConnection")
	}
	else
		cy.assertText(connectorLocators.connectionName, accountObj.connectionLabel)
	if (!isVerified)
		cy.assertText(connectorLocators.connectionStatus, accountObj.connectionStatus)
	cy.clickButton(connectorLocators.continueBtn)
	app.assertAPIResponse("@updateActivity")
	app.assertAPIResponse("@UpdateApp")
}

export function addFieldsValue(dataArray) {
	dataArray.forEach((data, index) => {
		if (data.fieldType === "Textarea") {
			cy.fillField(connectorLocators.textareaValue, data.value)
		}
		else if (data.fieldType === "Checkbox") {
			app.assertAPIResponse("@endPoint")
			cy.clickButton(connectorLocators.checkbox, false, index)
		}
		else if (data.fieldType === "Radio") {
			app.assertAPIResponse("@endPoint")
			cy.clickButton(connectorLocators.radio, false, index)
		}
		else if (data.fieldType === "Dropdown") {
			app.assertAPIResponse("@endPoint")
			cy.selectFromDropdown(connectorLocators.dropdown, data.value)
		}
		else if (data.fieldType === "Field Mapping") {
			app.assertAPIResponse("@endPoint")
			cy.fillField(connectorLocators.textfieldValue, data.value, false, index)
		}
		else {
			if (data.title === "Email") {
				cy.enterUniqueEmail(connectorLocators.textfieldValue, data.value, index)
			}
			else {
				cy.fillField(connectorLocators.textfieldValue, data.value, false, index)
			}
		}
	})
	cy.clickButton(connectorLocators.continueBtn)
	app.assertAPIResponse("@updateActivity")
	app.assertAPIResponse("@UpdateApp")
}

export function addReqDetails(reqObj, isJsonReq, jsonObj) {
	if (isJsonReq)
		cy.fillJson(connectorLocators.json, jsonObj)
	cy.fillField(connectorLocators.baseUrl, reqObj.baseUrl)
	cy.fillField(connectorLocators.action, reqObj.action)
	cy.assertText(connectorLocators.reqUrl, reqObj.reqUrl)
	cy.selectFromDropdown(connectorLocators.dropdown, reqObj.reqType)
}

export function addHeaders(reqObj) {
	switch (reqObj.activityType) {
		case "action":
			cy.fillField(connectorLocators.firstHeaderKey, reqObj.authKey)
			cy.fillField(connectorLocators.firstHeaderValue, reqObj.authValue)
			break

		default:
	}
}

export function testActivity(reqObj, isJsonReq, jsonObj) {
	cy.isElementVisible(connectorLocators.testAuthenticationBtn)
	cy.assertText(connectorLocators.activityStepName, reqObj.stepName)
	addReqDetails(reqObj, isJsonReq, jsonObj)
	addHeaders(reqObj)
	cy.clickButton(connectorLocators.testAuthenticationBtn)
	app.assertAPIResponse("@endPointAuth")
	app.assertAPIResponse("@updateActivity")
	app.assertAPIResponse("@UpdateApp")
}

export function verifyActivityResult(successMsg) {
	cy.assertText(connectorLocators.bannerSuccessMsg, successMsg)
	cy.clickButton(connectorLocators.continueBtn)
	app.assertAPIResponse("@updateActivity")
	app.assertAPIResponse("@UpdateApp")
	app.assertAPIResponse("@endPointAuth")
}

//	Action functions

/*
	Move core activity --> action functions from /businessActions/connector.js to here
*/


//	Trigger functions

/*
	Move core activity --> trigger functions from /businessActions/connector.js to here
*/

export function selectTriggerType(type) {
	if (type === "Poll Based")
		cy.clickButton(connectorLocators.pollRadioBtn)
	cy.clickButton(connectorLocators.continueBtn)
	app.assertAPIResponse("@ApiEndpoints")
	app.assertAPIResponse("@updateActivity")
	app.assertAPIResponse("@UpdateApp")
	app.assertAPIResponse("@endPointAuth")
}

//	Query functions

/*
	Core activity --> query functions
*/