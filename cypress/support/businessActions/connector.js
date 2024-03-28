/*	Business helper functions i.e. app focused
  Each business helper function will internally call technical helper functions to execute desired steps
  Test cases will primarily call these business helper functions
*/

import connectorLocators from "../../Locators/ConnectorsLocators.js";
const app = require("./app.js")
import "cypress-file-upload";
import { createContactInInsightly } from "./CreateOpsUsingApi.js";
import { getCredsType } from "../commands.js";
import commonLocators from "../../Locators/commonLocators.js";
var CryptoJS = require('crypto-js');

//	Connector related functions

export function goToConnectorsTab() {
	cy.clickButton(connectorLocators.connectorNavLink) // For Normal user
	// cy.visit("/wapp/apps/v4/internal/ie") // For Internal IEs to access apps.
	app.assertAPIResponse("@getAllApps")
}

export function createConnector() {
	cy.isElementVisible(connectorLocators.createConnectorBtn)
	cy.clickButton(connectorLocators.createConnectorBtn)
}

export function updateConnectorName(name, userId) {
	cy.clickButton(connectorLocators.actionPage.sidebar, true, 0)
	cy.isElementVisible(connectorLocators.title)
	cy.fillField(connectorLocators.title, name + userId)
	createApp()
}

export function createConnectorWithType(type) {
	cy.clickButton(connectorLocators.createConnectorBtn)
	cy.clickSpecificButton(type, connectorLocators.connectorType)
}

export function openConnector(appName, id) {
	const connectorName = appName + "_" + id
	cy.clickButton("[id*=" + connectorName + "]")
	app.assertAPIResponse("@getEndpoints")
}

export function createAppUsingApi(appData, endpoints, openApp, createAuth, activities) {
	appData.app_name = appData.app_name + window.uniqueId
	cy.getCookie('csrftoken').then(csrftoken => {
		cy.request({
			url: Cypress.env("base_url") + "/app/",
			method: "POST",
			headers: {
				"X-CSRFToken": csrftoken.value
			},
			body: appData
		}).then((resp) => {
			expect(resp.status).to.eq(200); // verifies the success of the API call
			cy.log(JSON.stringify(resp.body))

			window.appId = resp.body.id
			window.baseUrlId = resp.body.base_urls[0].id
			if (endpoints) {
				cy.request({
					url: Cypress.env("base_url") + "/api/endpoint/types/",
					method: "GET",
					headers: {
						"X-CSRFToken": csrftoken.value
					},
				}).then((endpointTypesResponse) => {
					expect(endpointTypesResponse.status).to.eq(200); // verifies the success of the API call
					cy.log(JSON.stringify(endpointTypesResponse.body))
					for (let ep in endpoints) {
						createEndpointUsingApi(endpoints[ep], resp.body.id, resp.body.base_urls[0].id, endpointTypesResponse, createAuth, activities)
					}
				})

			}

			if (openApp) {
				cy.visit("wapp/apps/v3/" + resp.body.id + "/create/authorizations/")
				cy.get("div.branding-display h1").should("have.text", appData.app_name)
			}

		});
	})
}

export function createEndpointUsingApi(endpointData, appId, baseUrlId, endpointTypesResponse, createAuth, activities) {
	endpointData.app_id = appId
	endpointData.base_url_id = baseUrlId
	cy.log(JSON.stringify(endpointData))
	console.log(JSON.stringify(endpointTypesResponse.body))
	endpointData.endpoint_type = getEndpointType(endpointTypesResponse.body, endpointData.endpoint_name)
	cy.getCookie('csrftoken').then(csrftoken => {
		cy.request({
			url: Cypress.env("base_url") + "/api/endpoints/",
			method: "POST",
			headers: {
				"X-CSRFToken": csrftoken.value,
			},
			followRedirect: false,
			body: endpointData
		}).then((resp) => {
			expect(resp.status).to.eq(200); // verifies the success of the API call
			cy.log(JSON.stringify(resp.body))
			window.endpointId = resp.body.id
			// Create Auth and connect account only if given and the endpoint is "User Info endpoint" 
			if (createAuth) {
				if (endpointData.endpoint_name === "User Info endpoint") {
					createAuthUsingApi(createAuth, appId, resp.body.id)
				} else {
					if (activities) {
						for (let act in activities) {
							createActivityUsingApi(window.authTypeId, appId, resp.body.id, activities[act])
						}
					}
				}
			}
		});
	});
}

export function createAuthUsingApi(createAuth, appId, endpointId) {
	cy.getCookie('csrftoken').then(csrftoken => {

		createAuth.app = appId
		createAuth.userinfo_uri_endpoint = endpointId
		createAuth.userinfo_uri_endpoint_v2 = endpointId
		cy.request({
			url: Cypress.env("base_url") + "/api/authorization_types/",
			method: "POST",
			headers: {
				"X-CSRFToken": csrftoken.value,
			},
			followRedirect: false,
			body: createAuth
		}).then((resp) => {
			expect(resp.status).to.eq(200); // verifies the success of the API call
			cy.log(JSON.stringify(resp.body))
			window.authTypeId = resp.body[0].pk
			window.accountId = resp.body[0].fields.account
			getConnectedAccount(window.authTypeId, appId, createAuth.type_id)
		});
	});
}

export function getConnectedAccount(authTypeId, appId, authType) {
	cy.getCookie('csrftoken').then(csrftoken => {
		cy.fixture(getCredsType()).then(creds => {

			// Just to make the auth working and get the corret state value. 
			cy.request({
				url: Cypress.env("base_url") + "/api/authorization_types/?app=" + appId,
				method: "GET",
				headers: {
					"X-CSRFToken": csrftoken.value,
				},
				followRedirect: false
			}).then((resp) => {
				expect(resp.status).to.eq(200); // verifies the success of the API call

				// To get App key and secret
				cy.request({
					url: Cypress.env("base_url") + "/app/" + appId + "/",
					method: "GET",
					headers: {
						"X-CSRFToken": csrftoken.value,
					},
					followRedirect: false
				}).then((resp) => {
					expect(resp.status).to.eq(200); // verifies the success of the API call
					cy.log(JSON.stringify(resp.body))
					window.key = resp.body.key
					window.secret = resp.body.secret

					// To get Connect Account url > Auth location Url
					cy.request({
						url: Cypress.env("base_url") + "/auth/login/" + authTypeId + "?user_id=" + creds.username + "&app_key=" + resp.body.key + "&hash=" + getAppHash(creds.username, resp.body.secret),
						method: "GET",
						headers: {
							"X-CSRFToken": csrftoken.value,
						},
						followRedirect: false
					}).then((resp) => {
						expect(resp.status).to.eq(302); // verifies the success of the API call
						cy.log(JSON.stringify(resp.headers["location"]))

						// To Connect Account using above Auth location Url
						connectAccount(authType, resp.headers["location"])

					});
				});
			});
		});
	});
}

export function getAppHash(username, secret) {
	const signBytes = CryptoJS.HmacSHA256(username, secret)
	return CryptoJS.enc.Hex.stringify(signBytes)
}

export function connectAccount(authType, locationUrl) {
	let body
	cy.fixture("Connectors_data").then(data => {
		switch (authType) {
			case "APIKeyWithURL":
				body = {
					auth_name: data.apiKeyURL.authName,
					url: data.apiKeyURL.authBaseUrl,
					apikey: data.apiKeyURL.apiKey
				}
				hitConnectAccountRequest(body, locationUrl)
				break
			case "APIKey":
				body = {
					apikey: data.fillSendInBlueInfo.apiKey
				}
				hitConnectAccountRequest(body, locationUrl)
				break
		}
	})
}

export function hitConnectAccountRequest(reqBody, locationUrl) {
	cy.getCookie('csrftoken').then(csrftoken => {

		cy.request({
			url: locationUrl,
			method: "POST",
			headers: {
				"X-CSRFToken": csrftoken.value,
			},
			followRedirect: false,
			form: true,
			body: reqBody
		}).then((resp) => {
			expect(resp.status).to.eq(200); // verifies the success of the API call
			cy.log(JSON.stringify(resp.headers["Location"]))
		});
	});
}

export function isAccountConnected(successMsg) {
	cy.clickButton(connectorLocators.testAUthBtn)
	app.assertAPIResponse("@verifyConnection")
	cy.assertText(connectorLocators.testAuthAssertion, successMsg.connectedAssertion)
}

export function createActivityUsingApi(authTypeId, appId, endpointId, activity) {
	activity.app = appId
	if (activity.type === "TRIGGER") {
		activity.polling_endpoint_ref = endpointId
	} else {
		activity.endpoint_ref = endpointId
	}
	activity.authorization_type = authTypeId
	cy.log(JSON.stringify(activity))
	// if (authTypeId) {
	cy.getCookie('csrftoken').then(csrftoken => {
		cy.request({
			url: Cypress.env("base_url") + "/api/activities/",
			method: "POST",
			headers: {
				"X-CSRFToken": csrftoken.value,
			},
			followRedirect: false,
			body: activity
		}).then((resp) => {
			expect(resp.status).to.eq(200); // verifies the success of the API call
			cy.log(JSON.stringify(resp.body))
			window.activityId = resp.body.id
		});
	});
	// } else {
	// 	createAuthUsingApi(createAuth, appId, endpointId)
	// 	createActivityUsingApi(authTypeId, appId, endpointId, activity)
	// }
}

export function getEndpointType(endpointTypes, endpoint_name) {
	let id
	if (Cypress.config().baseUrl.includes("app") || Cypress.config().baseUrl.includes("3006")) {
		id = 140
	}
	else {
		id = 454
	}
	for (let et in endpointTypes) {
		if (endpoint_name.includes(endpointTypes[et].name)) {
			id = endpointTypes[et].id
		}
	}

	return id
}

export function updateBasicInfoPage(basicInfoObj) {
	fillBasicInfoPage(basicInfoObj)
	cy.get('[alt="Trash Icon"]').last().click()
}

export function fillBasicInfoPage(basicInfoObj) {
	cy.fillField(connectorLocators.title, basicInfoObj.appData.app_name, true)
	cy.fillField(connectorLocators.description, basicInfoObj.appData.app_description)
	cy.attachFileImage(connectorLocators.appLogoImageHolder, basicInfoObj.appLogoImageHolder)
	app.assertAPIResponse("@UploadImage")

	addBaseUrls(basicInfoObj.appData.base_urls)

	cy.fillField(connectorLocators.homepageUrl, basicInfoObj.appData.app_url)
	cy.fillField(connectorLocators.connectorApiVersion, basicInfoObj.appData.api_version)

}

export function addBaseUrls(baseUrls) {
	if (baseUrls) {
		for (let baseUrl in baseUrls) {
			cy.clickButton(connectorLocators.addBaseUrlBtn)
			cy.fillField( // base url name
				connectorLocators.connectorBaseUrlName,
				baseUrls[baseUrl].name
			)
			cy.fillField( // base url
				connectorLocators.connectorBaseUrl,
				baseUrls[baseUrl].url
			)

			// Fill headers if there is any
			addHeadersForBaseUrl(baseUrls[baseUrl].headers)
		}
	}
}

export function addHeadersForBaseUrl(headers) {
	if (headers.length != 0) {
		cy.clickButton("div.add-url-header-label")
		for (let header in headers) {
			cy.get("div.url-headers").should("have.length", parseInt(header) + 1)

			cy.get("div.url-headers").eq(header).within(() => {
				// if (isHeaderDropdown(headers[header].header_name)) {
				// 	cy.selectFromDropdown({ "menu": "div[id*='key_']", "option": "div[id*='react-select-']" }, headers[header].header_name)
				// } else {
				cy.clickButton("div[id*='key_']")
				cy.fillField( // base url name
					"div[id*='key_'] input",
					headers[header].header_name
				)
				cy.clickButton("div[id*='react-select-']")
				// }
				if (isHeaderDropdown(headers[header].value) && headers[header].header_name === "Content-Type") {
					cy.selectFromDropdown({ "menu": "div[id*='value_']", "option": "div[id*='react-select-']" }, headers[header].value)
				} else {
					cy.fillField( // base url
						"input[id*='value_']",
						headers[header].value
					)
				}
			})
			if (headers.length != parseInt(header) + 1) {
				cy.clickButton("div.add-url-headers-button button")
			}
		}
	}
}

export function isHeaderDropdown(headerName) {
	let dropdownHeaders = [
		"Content-Type",
		"Authorization",
		"Accept",
		"application/json",
		"application/x-www-form-urlencoded"
	]

	cy.log(headerName)
	if (dropdownHeaders.includes(headerName)) {
		return true
	} else {
		return false
	}
}

export function addHeadersForEndpoint(headers) {
	if (headers) {
		for (let header in headers) {
			cy.clickButton("button.btn-outline-primary.my-3")
			cy.get("div[id*='key']").should("have.length", parseInt(header) + 1)

			cy.get("div[id*='key']").eq(header).parents("div.row div.row").within(() => {
				// if (isHeaderDropdown(headers[header].header_name)) {
				// 	cy.selectFromDropdown({ "menu": "div[id*='key_']", "option": "div[id*='react-select-']" }, headers[header].header_name)
				// } else {
				cy.clickButton("div[id*='key_']")
				cy.fillField( // base url name
					"div[id*='key_'] input",
					headers[header].header_name
				)
				cy.clickButton("div[id*='react-select-']")
				// }
				if (isHeaderDropdown(headers[header].value) && headers[header].header_name === "Content-Type") {
					cy.selectFromDropdown({ "menu": "div[id*='value_']", "option": "div[id*='react-select-']" }, headers[header].value)
				} else {
					cy.fillField( // base url
						"input[id*='value_']",
						headers[header].value
					)
				}
			})
		}
	}
}

export function verifyBasicInfoPage(basicInfoObj) {
	cy.get(connectorLocators.endpointModal.sideBar).contains('Basic info').click()
	cy.assertText("div.offset-md-1 h2", "Basic Info")

	cy.assertValue(connectorLocators.title, basicInfoObj.appData.app_name, 0, true)
	cy.assertValue(connectorLocators.description, basicInfoObj.appData.app_description)
	cy.isElementVisible("div.image-preview-container")

	verifyBaseUrls(basicInfoObj.appData.base_urls)

	cy.assertValue(connectorLocators.homepageUrl, basicInfoObj.appData.app_url)
	cy.assertValue(connectorLocators.connectorApiVersion, basicInfoObj.appData.api_version)
}

export function verifyBaseUrls(baseUrls) {
	if (baseUrls) {
		for (let baseUrl in baseUrls) {
			cy.assertValue( // base url name
				connectorLocators.connectorBaseUrlName,
				baseUrls[baseUrl].name
			)
			cy.assertValue( // base url
				connectorLocators.connectorBaseUrl,
				baseUrls[baseUrl].url
			)

			// Fill headers if there is any
			verifyHeadersForBaseUrl(baseUrls[baseUrl].headers)
		}
	}
}

export function verifyHeadersForBaseUrl(headers) {
	if (headers.length != 0) {
		for (let header in headers) {
			cy.get("div.url-headers").eq(header).within(() => {
				cy.assertAttribute( // header name
					"div[id*='key_'] input",
					headers[header].header_name,
					"value"
				)
				cy.assertAttribute( // header value
					"input[id*='value_']",
					headers[header].value,
					"value"
				)
			})
		}
	}
}

export function createApp(appName) {
	cy.clickButton(connectorLocators.submitBtn)
	app.assertAPIResponse("@createApp")
	app.assertAPIResponse("@getApp")
	cy.assertText(commonLocators.toastMsg, "App has been created successfully")
	cy.get("div.branding-display h1").should("have.text", appName)
}

export function updateApp(appName) {
	cy.clickButton(connectorLocators.submitBtn)
	app.assertAPIResponse("@UpdateApp")
	app.assertAPIResponse("@getApp")
	cy.assertText(commonLocators.toastMsg, "Basic information of app has been updated successfully")
	cy.get("div.branding-display h1").should("have.text", appName)
}

export function searchAndOpenConnector(appName, openApp) {
	cy.fillField(connectorLocators.searchConnectorsField, appName)
	cy.get(connectorLocators.connectorCard).should("have.length", 1)
	if (openApp) {
		cy.clickSpecificButton(appName, connectorLocators.connectorCard)
		app.assertAPIResponse("@getApp")
		cy.get("div.branding-display h1").should("have.text", appName)
	}
}

// Create Endpoint

export function createAppEndpoint(endpoint) {
	cy.get(connectorLocators.sideBar).contains('Endpoints').click()

	cy.clickButton(connectorLocators.createBtn)

	cy.fillField(connectorLocators.endpointModal.endpointName, endpoint.endpoint_name)
	cy.selectFromDropdown(connectorLocators.endpointTypeDropdown, endpoint.endpoint_type)

	cy.isElementVisible(connectorLocators.endpointModal.requestMethodDropdown.menu)
	cy.selectFromDropdown(connectorLocators.endpointModal.requestMethodDropdown, (endpoint.http_verb).toUpperCase())
	cy.selectFromDropdown(connectorLocators.endpointModal.baseUrlDropdown, endpoint.base_url_id)
	cy.fillField(connectorLocators.endpointModal.endpointUrl_path, endpoint.url_path)

	if (endpoint.is_pagination) {
		cy.get(connectorLocators.endpointModal.isPaginationSwitch)
			.parent()
			.click()

		cy.fillField(connectorLocators.sendApiCall.limitCount, endpoint.pg_limit_variable_name)
		cy.fillField(connectorLocators.sendApiCall.limitValue, endpoint.pg_default_page_size)
		cy.selectFromDropdown(connectorLocators.sendApiCall.limitLocationDropdown, endpoint.pg_limit_variable_location)

		cy.fillField(connectorLocators.sendApiCall.offset, endpoint.pg_offset_variable_name)
		cy.selectFromDropdown(connectorLocators.sendApiCall.offsetLocationDropdown, endpoint.pg_offset_variable_location)

		cy.fillField(connectorLocators.sendApiCall.totalItems, endpoint.pg_total_items_variable)
		cy.selectFromDropdown(connectorLocators.sendApiCall.totalItemsLocationDropdown, endpoint.pg_total_items_variable_location)
	}

	if (endpoint.tracking_property_name != "") {
		cy.fillField(connectorLocators.endpointModal.trackingPropertyName, endpoint.tracking_property_name)
	}
	if (endpoint.request_template != "") {
		cy.clickButton(connectorLocators.sendApiCall.editRequestTemplate)
		cy.fillJson(connectorLocators.sendApiCall.requestTemplate, [endpoint.request_template])
	}

	cy.get(connectorLocators.deleteHeader).click({ multiple: true })
	addHeadersForEndpoint(endpoint.headers)

	cy.clickButton(connectorLocators.endpointModal.createEndpointBtn)
	app.assertAPIResponse("@createEndpoint")
	cy.isElementVisible(commonLocators.toastMsg)
	cy.assertText(commonLocators.toastMsg, "Endpoint has been created successfully")
	cy.isElementVisible(connectorLocators.endpointModal.endPointName + ":contains(" + endpoint.endpoint_name + ")")
}

export function testEndPoint(authData, endpointType) {
	cy.get(connectorLocators.endpointModal.sideBar).contains('Endpoints').click()
	cy.clickSpecificButton(authData[endpointType].endpoint_name, connectorLocators.endpointModal.endPointName)

	cy.clickButton(connectorLocators.endpointModal.testEndPointBtn)
	cy.selectFromDropdown(connectorLocators.endpointModal.authTypeDropDown, authData.authType, 0)
	if (authData.authType === "Basic") {
		cy.selectFromDropdown(connectorLocators.endpointModal.selectAccountDropDown, authData.username, 0)
	}
	else {
		cy.selectFromDropdown(connectorLocators.endpointModal.selectAccountDropDown, authData.authName, 0)
	}

	if (endpointType === "actionEndpoint") {
		cy.clickSpecificButton("Raw JSON", connectorLocators.endpointModal.rawRequestBodyBtn)
		cy.fillField(connectorLocators.endpointModal.rawRequestBody, authData.rawRequestBody)
	}

	cy.clickButton(connectorLocators.endpointModal.sendTestCall)
	app.assertAPIResponse("@testQuery")
	cy.get(connectorLocators.actionPage.actionSuccessMsg).invoke("text").then(msg => {
		expect(msg.trim()).to.eql(authData.authSuccessMsg)
	})
}
//	Basic Info functions
// With 2 headers
export function addHomepageUrl(baseUrlObj) {
	cy.fillField(connectorLocators.homepageUrl, baseUrlObj.baseUrl)
	// cy.clickButton(connectorLocators.continueBtn)
	// app.assertAPIResponse("@UpdateApp")
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.connectorBaseUrlName, "Base URL 42")
	cy.fillField(connectorLocators.connectorBaseUrl, baseUrlObj.appBaseUrl)
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.connectorBaserUrlheader, baseUrlObj.apiBaseUrlHeader)
	cy.fillField(connectorLocators.connectorSecondUrl, baseUrlObj.headerBaseUrl)
	cy.fillField(connectorLocators.connectorApiVersion, baseUrlObj.apiVersion)
	// cy.clickButton('span.slider ', true, 1)
}
// with 2 headers no api version
export function addHomepage(baseUrlObj) {
	cy.fillField(connectorLocators.homepageUrl, baseUrlObj.baseUrl)
	// cy.clickButton(connectorLocators.continueBtn)
	// app.assertAPIResponse("@UpdateApp")
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.connectorBaseUrlName, "Base URL 22")
	cy.fillField(connectorLocators.connectorBaseUrl, baseUrlObj.appBaseUrl)
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.connectorBaserUrlheader, baseUrlObj.apiBaseUrlHeader)
	cy.fillField(connectorLocators.connectorSecondUrl, baseUrlObj.headerBaseUrl)
	// cy.clickButton('span.slider ', true, 1)
}
// with 1 header
export function newAppHomepageUrl(baseUrlObj) {
	cy.fillField(connectorLocators.homepageUrl, baseUrlObj.appBaseUrl)
	// cy.clickButton(connectorLocators.continueBtn)
	// app.assertAPIResponse("@UpdateApp")
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.connectorBaseUrlName, "Base URL 0")
	cy.fillField(connectorLocators.connectorBaseUrl, baseUrlObj.baseUrl)
	cy.fillField(connectorLocators.connectorApiVersion, baseUrlObj.apiVersion)
	cy.clickButton(connectorLocators.submitBtn)
	app.assertAPIResponse("@createApp")
	app.assertAPIResponse("@getApp")
	// cy.clickButton('span.slider ', true, 1)
	// cy.fillField(connectorLocators.linkToUserProfile, baseUrlObj.userProfile)
}
export function homepageUrl(baseUrlObj) {
	cy.fillField(connectorLocators.homepageUrl, baseUrlObj.baseUrl)
	// cy.clickButton(connectorLocators.continueBtn)
	// app.assertAPIResponse("@UpdateApp")
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.connectorBaseUrlName, "Base URl")
	cy.fillField(connectorLocators.connectorBaseUrl, baseUrlObj.appBaseUrl)
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.connectorBaserUrlheader, baseUrlObj.apiBaseUrlHeader)
	cy.fillField(connectorLocators.connectorSecondUrl, baseUrlObj.headerBaseUrl)
	// cy.clickButton('span.slider ', true, 1)
}
export function sendInBlueHomepageUrl(baseUrlObj) {
	cy.fillField(connectorLocators.homepageUrl, baseUrlObj.baseUrl)
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.connectorBaseUrlName, baseUrlObj.apiFirstUrl)
	cy.fillField(connectorLocators.connectorBaseUrl, baseUrlObj.appBaseUrl)
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.connectorBaserUrlheader, baseUrlObj.apiSecondUrl)
	cy.fillField(connectorLocators.connectorSecondUrl, baseUrlObj.appSecondBaseUrl)
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.apiThirdheader, baseUrlObj.apiThrirdUrl)
	cy.fillField(connectorLocators.appThirdBaseUrl, baseUrlObj.appThirdBaseUrl)
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.apiFourthheader, baseUrlObj.apiFourthUrl)
	cy.fillField(connectorLocators.appFourthBaseUrl, baseUrlObj.appFourthBaseUrl)
}
export function addBasicInfo(basicInfoObj) {
	cy.fillField(connectorLocators.title, basicInfoObj.title, true)
	cy.fillField(connectorLocators.description, basicInfoObj.description)
	cy.attachFileImage(connectorLocators.appLogoImageHolder, basicInfoObj.appLogoImageHolder)
	app.assertAPIResponse("@UploadImage")
}

export function fillProductPage(productPageObj) {
	cy.attachFileImage(connectorLocators.productPage.appScreenshot, productPageObj.appScreenshot)
	cy.selectFromDropdown(connectorLocators.productPage.appCategoryDropdown, productPageObj.appCategoryDropdown, 0)
	cy.clickButton(connectorLocators.submitBtn)
	app.assertAPIResponse("@UpdateApp")
	app.assertAPIResponse("@getApp")
}

export function updateBasicInfo(basicInfoObj) {
	cy.clickButton(connectorLocators.appDetailsBtn)
	cy.fillField(connectorLocators.descriptionField, basicInfoObj.description)
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

export function selectAuthType(auth) {
	cy.clickButton(connectorLocators.createAuthBtn)
	cy.selectFromDropdown(connectorLocators.dropdown, auth.authType, 0)
	cy.selectFromDropdown(connectorLocators.endpointDropdown, auth.authVerificationEndpoint)
}

export function submitAuth(endpoint) {
	cy.selectFromDropdown(connectorLocators.userInfoEndpointDropdown, endpoint)
	cy.clickButton(connectorLocators.submitBtn)
	app.assertAPIResponse("@connectedAccounts")
}

export function submitActionAuth(endpoint) {
	cy.selectFromDropdown(connectorLocators.actionPage.actionEndpointDropDown, endpoint)
	cy.clickButton(connectorLocators.actionPage.saveEndPointBtn)
	app.assertAPIResponse('@getEndpoints')
}

export function submitTriggerAuth(endpoint) {
	cy.selectFromDropdown(connectorLocators.triggerpage.triggerEndpointDropDown, endpoint)
	cy.clickButton(connectorLocators.actionPage.saveEndPointBtn)
	app.assertAPIResponse('@getEndpoints')
}

export function basicSelectAuthType(auth) {
	cy.clickButton(connectorLocators.createAuthBtn)
	cy.get(connectorLocators.dropdown.menu)
		.click()

	cy.clickSpecificButton("Basic", connectorLocators.dropdown.option)
	cy.selectFromDropdown(connectorLocators.endpointDropdown, auth.authVerificationEndpoint)
}

export function testEndPoints(authData) {
	cy.get(connectorLocators.apiKeySecret.sideBar).contains('Endpoints').click()
	cy.clickSpecificButton(authData.endpointName, connectorLocators.apiKeySecret.endPointName)

	cy.clickButton(connectorLocators.apiKeySecret.testEndPointBtn)
	cy.selectFromDropdown(connectorLocators.apiKeySecret.authTypeDropDown, authData.authType, 0)
	if (authData.authType === "Basic") {
		cy.selectFromDropdown(connectorLocators.apiKeySecret.selectAccountDropDown, authData.username, 0)
	}
	else {
		cy.selectFromDropdown(connectorLocators.apiKeySecret.selectAccountDropDown, authData.authName, 0)
	}
	cy.clickButton(connectorLocators.apiKeySecret.sendTestCall)
	app.assertAPIResponse('@testQuery')
	cy.get(connectorLocators.actionPage.actionSuccessMsg).invoke("text").then(msg => {
		expect(msg.trim()).to.eql(authData.authSuccessMsg)
	})
}

export function createAuthEndPointForSendInBlue(endpoint) {
	cy.fillField(connectorLocators.endpointModal.endpointName, endpoint.endpointName)
	cy.selectFromDropdown(connectorLocators.endpointModal.requestMethodDropdown, endpoint.requestMethodDropdown)
	cy.selectFromDropdown(connectorLocators.endpointModal.baseUrlDropdown, endpoint.baseUrlDropDownIcon)
	cy.fillField(connectorLocators.endpointModal.endpointUrl_path, endpoint.endpointUrl_path)
	// cy.fillField(connectorLocators.endpointModal.trackingPropertyName, endpoint.trackingPropertyName)
	cy.get(connectorLocators.endpointModal.headerFirstkey).type(endpoint.headerFirstValue)
	cy.clickButton(connectorLocators.endpointModal.addHeaderValue)
	cy.fillField(connectorLocators.endpointModal.header0Value, endpoint.header0Value)
	cy.clickButton(connectorLocators.endpointModal.addHeaderBtn)
	// cy.get(connectorLocators.endpointModal.totalHeaders).its("length").should("eq", 2)
	cy.selectFromDropdown(connectorLocators.endpointModal.header1KeyDropdown, endpoint.header1KeyDropdown)
	cy.fillField(connectorLocators.endpointModal.headerFirstValue, endpoint.header1Value)
	cy.clickButton(connectorLocators.endpointModal.addHeaderBtn)
	cy.selectFromDropdown(connectorLocators.endpointModal.headerSecondKeyDropdown, endpoint.header2ndKeyDropdown)
	cy.selectFromDropdown(connectorLocators.endpointModal.headerSecondValueDropdown, endpoint.headerSecondValueDropdown)
	cy.clickButton(connectorLocators.endpointModal.addHeaderBtn)
	cy.get(connectorLocators.endpointModal.headerThirdkey).type(endpoint.headerThirdValue)
	cy.clickButton(connectorLocators.endpointModal.addHeaderThirdKey)
	cy.fillField(connectorLocators.endpointModal.headerThirdValue, endpoint.header3rdValue)
	cy.clickButton(connectorLocators.endpointModal.createEndpointBtn)
	app.assertAPIResponse("@createEndpoint")
	cy.selectFromDropdown(connectorLocators.userInfoEndpointDropdown, endpoint.endpointName)
	cy.clickButton(connectorLocators.submitBtn)
	// app.assertAPIResponse("@connectedAccounts")

}

export function createNewEndPoint(endpoint) {
	cy.fillField(connectorLocators.endpointModal.endpointName, endpoint.endpointName)
	cy.selectFromDropdown(connectorLocators.endpointModal.requestMethodDropdown, endpoint.requestMethodDropdown)
	cy.selectFromDropdown(connectorLocators.endpointModal.baseUrlDropdown, endpoint.baseUrlDropDownIcon)
	cy.fillField(connectorLocators.endpointModal.endpointUrl_path, endpoint.endpointUrl_path)
	// cy.fillField(connectorLocators.endpointModal.trackingPropertyName, endpoint.trackingPropertyName)
	cy.fillField(connectorLocators.endpointModal.header0Value, endpoint.header0Value)
	cy.clickButton(connectorLocators.endpointModal.addHeaderBtn)
	cy.get(connectorLocators.endpointModal.totalHeaders).its("length").should("eq", 2)
	cy.selectFromDropdown(connectorLocators.endpointModal.header1KeyDropdown, endpoint.header1KeyDropdown)
	cy.selectFromDropdown(connectorLocators.endpointModal.header1ValueDropdown, endpoint.header1ValueDropdown)
	cy.clickButton(connectorLocators.endpointModal.createEndpointBtn)
	app.assertAPIResponse("@createEndpoint")
	cy.selectFromDropdown(connectorLocators.userInfoEndpointDropdown, endpoint.endpointName)
	cy.clickButton(connectorLocators.submitBtn)
	app.assertAPIResponse("@connectedAccounts")

}//No header
export function createEndPoint(endpoint) {
	cy.fillField(connectorLocators.endpointModal.endpointName, endpoint.endpointName)
	cy.selectFromDropdown(connectorLocators.endpointModal.requestMethodDropdown, endpoint.requestMethodDropdown)
	cy.selectFromDropdown(connectorLocators.endpointModal.baseUrlDropdown, endpoint.baseUrlDropdown)
	cy.fillField(connectorLocators.endpointModal.endpointUrl_path, endpoint.endpointUrl_path)
	cy.clickButton(connectorLocators.deleteHeaderBtn)
	cy.clickButton(connectorLocators.endpointModal.createEndpointBtn)
	app.assertAPIResponse("@createEndpoint")
	cy.selectFromDropdown(connectorLocators.userInfoEndpointDropdown, endpoint.endpointName)
	cy.clickButton(connectorLocators.submitBtn)
	// app.assertAPIResponse("@connectedAccounts")

}
// 1 header
export function createEndPointOneHeader(endpoint) {
	cy.fillField(connectorLocators.endpointModal.endpointName, endpoint.endpointName)
	cy.selectFromDropdown(connectorLocators.endpointModal.requestMethodDropdown, endpoint.requestMethodDropdown)
	cy.selectFromDropdown(connectorLocators.endpointModal.baseUrlDropdown, endpoint.baseUrlDropdown)
	cy.fillField(connectorLocators.endpointModal.endpointUrl_path, endpoint.endpointUrl_path)
	cy.get(connectorLocators.endpointModal.headerApiValue).type(endpoint.headerValue)
	cy.clickButton('div.css-1ksyk61-option:contains(Add "Basic")')
	cy.fillField(connectorLocators.endpointModal.header0Value, endpoint.header0Value)
	cy.get(connectorLocators.endpointModal.totalHeaders).its("length").should("eq", 1)
	cy.clickButton(connectorLocators.endpointModal.createEndpointBtn)
	app.assertAPIResponse("@createEndpoint")
	cy.selectFromDropdown(connectorLocators.userInfoEndpointDropdown, endpoint.endpointName)
	cy.clickButton(connectorLocators.submitBtn)
	app.assertAPIResponse("@connectedAccounts")

}

// 1 header
export function createEndPointOneHeaderOauth2(endpoint) {
	cy.fillField(connectorLocators.endpointModal.endpointName, endpoint.endpointName)
	cy.selectFromDropdown(connectorLocators.endpointModal.requestMethodDropdown, endpoint.requestMethodDropdown)
	cy.selectFromDropdown(connectorLocators.endpointModal.baseUrlDropdown, endpoint.baseUrlDropdown)
	cy.fillField(connectorLocators.endpointModal.endpointUrl_path, endpoint.endpointUrl_path)
	cy.get("#request_template").parent().within(() => {
		cy.clickButton('p.form-text.d-inline')
	})
	cy.fixture("MailChimpRequestTemplate").then((data) => {
		cy.fillJson('#request_template', data.json)
	})
	cy.clickButton(connectorLocators.deleteHeaderBtn)

	cy.clickButton(connectorLocators.endpointModal.createEndpointBtn)
	app.assertAPIResponse("@createEndpoint")
	// cy.selectFromDropdown(connectorLocators.userInfoEndpointDropdown, endpoint.endpointName)
}

// 2 header
export function createEndPointTwoHeaders(endpoint) {
	cy.fillField(connectorLocators.endpointModal.endpointName, endpoint.endpointName)
	cy.selectFromDropdown(connectorLocators.endpointModal.requestMethodDropdown, endpoint.requestMethodDropdown)
	cy.selectFromDropdown(connectorLocators.endpointModal.baseUrlDropdown, endpoint.headerBaseUrl)
	cy.fillField(connectorLocators.endpointModal.endpointUrl_path, endpoint.endpointUrl_path)

	cy.get(connectorLocators.endpointModal.headerFirstkey).type(endpoint.headerFirstValue)
	// cy.selectFromDropdown(connectorLocators.endpointModal.headerFirstkey, endpoint.headerFirstValue)
	cy.clickButton("#key_0 div:contains(" + endpoint.headerFirstValue + ")")
	cy.fillField(connectorLocators.endpointModal.header0Value, endpoint.header0Value)
	cy.clickButton(connectorLocators.endpointModal.addHeaderBtn)
	cy.get(connectorLocators.endpointModal.totalHeaders).its("length").should("eq", 2)
	cy.selectFromDropdown(connectorLocators.endpointModal.header1KeyDropdown, endpoint.header1KeyDropdown)
	cy.selectFromDropdown(connectorLocators.endpointModal.header1ValueDropdown, endpoint.header1Value)

	cy.clickButton(connectorLocators.endpointModal.createEndpointBtn)
	app.assertAPIResponse("@createEndpoint")
	cy.selectFromDropdown(connectorLocators.userInfoEndpointDropdown, endpoint.endpointName)
}

export function createDoneDayEndPoint(endpoint) {
	cy.fillField(connectorLocators.endpointModal.endpointName, endpoint.endpointName)
	cy.selectFromDropdown(connectorLocators.endpointModal.requestMethodDropdown, endpoint.requestMethodDropdown)
	cy.selectFromDropdown(connectorLocators.endpointModal.baseUrlDropdown, endpoint.baseUrlDropDownIcon)
	cy.fillField(connectorLocators.endpointModal.endpointUrl_path, endpoint.endpointUrl_path)
	// cy.fillField(connectorLocators.endpointModal.trackingPropertyName, endpoint.trackingPropertyName)
	cy.get(connectorLocators.endpointModal.headerApiValue).type(endpoint.headerValue)
	cy.clickButton('div.css-1ksyk61-option:contains(Add "X-API-KEY")')
	cy.fillField(connectorLocators.endpointModal.header0Value, endpoint.header0Value)
	cy.get(connectorLocators.endpointModal.totalHeaders).its("length").should("eq", 1)
	cy.clickButton(connectorLocators.endpointModal.createEndpointBtn)
	app.assertAPIResponse("@createEndpoint")
	cy.selectFromDropdown(connectorLocators.userInfoEndpointDropdown, endpoint.endpointName)
	cy.clickButton(connectorLocators.submitBtn)
	// app.assertAPIResponse("@connectedAccounts")

}
export function authenticateAPI(reqObj) {
	// addReqDetails(reqObj)
	testAuthorization()
	addCredentials(reqObj)
	submitCredentials(reqObj.submitBtnText)
}
export function addNewDoneDayAccount(objName) {
	cy.saveWindow(connectorLocators.testAuthenticationBtn)
	cy.detectWindow()
	cy.fillField(connectorLocators.authApi, objName.authApi)
	cy.clickButton(connectorLocators.submitBtn)
	cy.loadWindow()

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

export function authorizationApiKeyAuth(reqObj) {
	cy.detectWindow()
	cy.isElementVisible(connectorLocators.submitBtn)
	cy.fillField(connectorLocators.apiKeyAuthField, reqObj.apiKey)
	cy.assertText(connectorLocators.submitBtn, reqObj.buttonText)
	cy.clickButton(connectorLocators.submitBtn)
	app.assertAPIResponse("@connectedAccounts")
}

export function testAuthorization() {

	cy.saveWindow(connectorLocators.testAuthenticationBtn)
	// app.assertAPIResponse("@endPointAuth")
	// app.assertAPIResponse("@authTypes")
	// app.assertAPIResponse("@UpdateApp")
}

export function addCredentials(reqObj) {
	cy.detectWindow()
	if (reqObj.authType != "Basic" && reqObj.authType != "API key") {
		cy.isElementVisible(connectorLocators.authName)
		cy.fillField(connectorLocators.authName, reqObj.authName)
	}
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
		case "API key":
			cy.fillField(connectorLocators.apiKeyAuthField, reqObj.apiKey)
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
}

export function configureOAuth2(clientId, clientSecret, reqObj) {
	cy.fillField(connectorLocators.clientId, clientId)
	cy.fillField(connectorLocators.clientSecret, clientSecret)
	cy.selectFromDropdown(connectorLocators.grandTypeDropDown, reqObj.grantType)
	cy.fillField(connectorLocators.authorizationUri, reqObj.authorizationUri)

	cy.selectFromDropdown(connectorLocators.fillConnectorWorkspace.tokenEndointDropDown, reqObj.tokenEndpoint.endpoint_name)
	// createEndPointOneHeaderOauth2(reqObj.tokenEndpoint)
	// cy.clickButton(connectorLocators.customizeTokenBtn)
	// cy.fillField(connectorLocators.baseUrl, reqObj.baseUrl)
	// cy.fillField(connectorLocators.action, reqObj.tokenAction)
	// cy.assertText(connectorLocators.reqUrl, reqObj.tokenUrl)
	cy.clickButton(connectorLocators.submitBtn)
	app.assertAPIResponse("@connectedAccounts")
	testAuthorization()
}

export function addOAuth2Credentials(reqObj) {
	switch (reqObj.title) {
		case "Mailchimp":
			cy.detectWindow()
			cy.isElementVisible(connectorLocators.username)
			cy.fillField(connectorLocators.username, reqObj.username)
			cy.fillField(connectorLocators.oauth2Password, reqObj.password)
			cy.assertValue(connectorLocators.submitBtn, reqObj.logInBtnText)
			cy.clickButton(connectorLocators.submitBtn)
			app.assertAPIResponse("@mailchimpAuthPost", 302)
			// app.assertAPIResponse("@mailchimpConfirmAuth")
			cy.loadWindow()
			cy.wait(Cypress.env("minTimeout"))
			cy.detectWindow()
			cy.isElementVisible(connectorLocators.submitBtn)
			cy.assertValue(connectorLocators.submitBtn, reqObj.allowBtnText)
			cy.clickButton(connectorLocators.submitBtn, true)
			app.assertAPIResponse("@mailchimpConfirmAuthPost", 302)
			app.assertAPIResponse("@redirectAuth")
			break
		case "Mailchimp":
			cy.detectWindow()
			cy.isElementVisible("input#domain")
			cy.fillField("input#domain", reqObj.domain)
			cy.clickButton('[data-qa="submit_team_domain_button"]')
			app.assertAPIResponse("@mailchimpAuthPost", 302)
			// app.assertAPIResponse("@mailchimpConfirmAuth")
			cy.loadWindow()
			cy.wait(Cypress.env("minTimeout"))
			cy.detectWindow()
			cy.isElementVisible(connectorLocators.submitBtn)
			cy.assertValue(connectorLocators.submitBtn, reqObj.allowBtnText)
			cy.clickButton(connectorLocators.submitBtn, true)
			app.assertAPIResponse("@mailchimpConfirmAuthPost", 302)
			app.assertAPIResponse("@redirectAuth")
			break
	}
}
export function addInsightlyCredentials(reqObj) {
	cy.detectWindow()
	cy.isElementVisible(connectorLocators.authName)
	cy.fillField(connectorLocators.authName, reqObj.authName)
	cy.fillField(connectorLocators.url, reqObj.baseUrl)
	cy.fillField(connectorLocators.apiKeyAuth, reqObj.apiKey)
	cy.clickButton(connectorLocators.proceedBtn)
	cy.loadWindow()
}
export function verifyTestResult(successMsg) {
	cy.loadWindow()
	cy.assertText(connectorLocators.bannerSuccessMsg, successMsg)
	cy.clickButton(connectorLocators.continueBtn)
	app.assertAPIResponse("@UpdateApp")
	app.assertAPIResponse("@authTypes")
	app.assertAPIResponse("@endPointAuth")
}
export function verifyAuthTestResult(successMsg) {
	cy.loadWindow()
	// cy.assertText(connectorLocators.bannerSuccessMsg, successMsg)
	cy.clickButton(connectorLocators.testAUthBtn)
	cy.assertText(connectorLocators.testAuthAssertion, successMsg.connectedAssertion)
	// app.assertAPIResponse("@@UpdateApp")
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

export function createActionActivity(actionObj) {
	cy.clickButton(connectorLocators.actionPage.sidebar, true, 5)
	cy.assertText(connectorLocators.actionPage.createActionBtn, actionObj.createActionText)
	cy.clickButton(connectorLocators.actionPage.createActionBtn)
	cy.fillField(connectorLocators.actionPage.actionName, actionObj.actionNameText)
	cy.fillField(connectorLocators.actionPage.actionDescription, actionObj.actionDescription)
	cy.selectFromDropdown(connectorLocators.actionPage.selectAuthorizationsDropDown, actionObj.authType, 0)
	cy.selectFromDropdown(connectorLocators.actionPage.inputObjectDropDown, actionObj.actionObjectText, 0)
	cy.selectFromDropdown(connectorLocators.actionPage.objectActionDropDown, actionObj.objectAction, 0)
	cy.clickButton(connectorLocators.actionPage.addActivityFieldBtn)
	cy.clickButton(connectorLocators.actionPage.activityField)
	cy.fillField(connectorLocators.actionPage.activityFieldName, actionObj.FirstactivityName)
	cy.fillField(connectorLocators.actionPage.activityMachineField, actionObj.firstMachineName)
	cy.selectFromDropdown(connectorLocators.actionPage.objectFieldDropDown, actionObj.firstObjectFieldValue, 0)
	cy.fillField(connectorLocators.actionPage.fieldDiscription, actionObj.fieldDiscription)
	cy.fillField(connectorLocators.actionPage.regrexErrorValidator, actionObj.regexValidator)
	// cy.clickButton(connectorLocators.actionPage.requiredFieldSlider)

	cy.clickButton(connectorLocators.actionPage.addActivityFieldBtn)
	cy.clickButton(connectorLocators.actionPage.activityField, true, 1)
	cy.fillField(connectorLocators.actionPage.secondFieldName, actionObj.secondFieldName)
	cy.fillField(connectorLocators.actionPage.secondMachineField, actionObj.secondMachineValue)
	cy.selectFromDropdown(connectorLocators.actionPage.secondObjectFieldDropDown, actionObj.secondObjectField, 0)
	cy.fillField(connectorLocators.actionPage.secondFieldDescription, actionObj.secondFieldDes)
	cy.fillField(connectorLocators.actionPage.secondRegressError, actionObj.regexValidator)
	cy.selectFromDropdown(connectorLocators.actionPage.actionEndpointDropDown, actionObj.createActionEndpoint, 0)
}
// For Field text, Checkbox
export function createActionNewActivity(actionObj) {
	cy.clickButton(connectorLocators.actionPage.sidebar, true, 5)
	cy.assertText(connectorLocators.actionPage.createActionBtn, actionObj.createActionText)
	cy.clickButton(connectorLocators.actionPage.createActionBtn)
	cy.fillField(connectorLocators.actionPage.actionName, actionObj.actionNameText)
	cy.fillField(connectorLocators.actionPage.actionDescription, actionObj.actionDescription)
	cy.selectFromDropdown(connectorLocators.actionPage.selectAuthorizationsDropDown, actionObj.authType, 0)
	cy.clickButton(connectorLocators.actionPage.addActivityFieldBtn)
	cy.clickButton(connectorLocators.actionPage.activityField)
	cy.fillField(connectorLocators.actionPage.activityFieldName, actionObj.FirstactivityName)
	cy.fillField(connectorLocators.actionPage.activityMachineField, actionObj.firstMachineName)
	cy.fillField(connectorLocators.actionPage.fieldDiscription, actionObj.fieldDiscription)
	cy.fillField(connectorLocators.actionPage.regrexErrorValidator, actionObj.regexValidator)
	// cy.clickButton(connectorLocators.actionPage.requiredFieldSlider)
	cy.clickButton(connectorLocators.actionPage.addActivityFieldBtn)
	cy.clickButton(connectorLocators.actionEndpoint.activityFieldSetting, false, 1)
	cy.clickButton(connectorLocators.actionEndpoint.activityDropdown, false, 1)
	cy.clickButton(connectorLocators.actionPage.activityField, true, 1)
	cy.fillField(connectorLocators.actionPage.secondFieldName, actionObj.secondFieldName)
	cy.fillField(connectorLocators.actionPage.secondMachineField, actionObj.secondMachineValue)
	cy.fillField(connectorLocators.actionEndpoint.conditionalFields, actionObj.conditionalFieldValue, false, 0)
	cy.fillField(connectorLocators.actionEndpoint.conditionalFields, actionObj.conditionalFieldArray, false, 1)
	cy.fillField(connectorLocators.actionPage.secondFieldDescription, actionObj.secondFieldDes)
	cy.clickButton(connectorLocators.actionPage.addActivityFieldBtn)
	cy.clickButton(connectorLocators.actionEndpoint.activityFieldSetting, false, 2)
	cy.clickButton(connectorLocators.actionEndpoint.activityDropdown, false, 2)
	cy.clickButton(connectorLocators.actionPage.activityField, true, 2)
	cy.fillField(connectorLocators.actionEndpoint.thirdFieldName, actionObj.thirdFieldName)
	cy.fillField(connectorLocators.actionEndpoint.thirdMachineField, actionObj.thirdMachineValue)
	cy.fillField(connectorLocators.actionEndpoint.conditionalFields, actionObj.conditionalFieldValue, false, 2)
	cy.fillField(connectorLocators.actionEndpoint.conditionalFields, actionObj.conditionalFieldArray, false, 3)
	cy.fillField(connectorLocators.actionPage.thirdFieldDescription, actionObj.ThirdFieldDes)
	// cy.selectFromDropdown(connectorLocators.actionPage.actionEndpointDropDown, actionObj.createActionEndpoint, 0) // only use with UI
}

export function createActionEndpoint(actionObj) {
	cy.assertText('h2.title', 'Create Endpoint')
	cy.fillField(connectorLocators.actionEndpoint.endpointName, actionObj.endpointName)
	cy.selectFromDropdown(connectorLocators.actionEndpoint.apiRequestTypeDropDown, actionObj.apiRequestType, 0)
	cy.selectFromDropdown(connectorLocators.actionEndpoint.baseUrlDropDown, actionObj.baseUrl, 0)
	cy.fillField(connectorLocators.actionEndpoint.urlEndpoint, actionObj.endpoint)
	cy.get('#request_template span:nth-child(1)').clear().type('FIRST_NAME', { force: true }).blur()
	app.assertAPIResponse('@getApp')
	cy.get('#request_template span:nth-child(2)').clear().focus().type('requestBody.data.FIRST_NAME', { force: true }).blur()
	app.assertAPIResponse('@getApp')
	cy.get('#request_template span:nth-child(4)').clear().focus().type('EMAIL_ADDRESS', { force: true }).blur()
	app.assertAPIResponse('@getApp')
	cy.get('#request_template span:nth-child(5)').clear().focus().type('requestBody.data.EMAIL_ADDRESS', { force: true }).blur()
	app.assertAPIResponse('@getApp')
	cy.selectFromDropdown(connectorLocators.actionPage.outputObjectDropDown, actionObj.actionObjectText, 1)
	cy.selectFromDropdown(connectorLocators.actionPage.outputObjectActionDropDown, actionObj.objectAction, 0)
	cy.fillField('#value_0', 'Basic {{ authorization.token.access_token }}')
	cy.clickButton(connectorLocators.endpointModal.addHeaderBtn)
	cy.selectFromDropdown(connectorLocators.actionPage.header1KeyDropdown, actionObj.header1KeyDropdown)
	cy.selectFromDropdown(connectorLocators.actionPage.header1ValueDropdown, actionObj.header1ValueDropdown)
	cy.clickButton(connectorLocators.actionPage.createEndPointBtn)
	cy.clickButton(connectorLocators.actionPage.saveEndPointBtn)
	app.assertAPIResponse('@getEndpoints')
	cy.clickButton(connectorLocators.actionPage.testActionBtn, true, 2)
	cy.selectFromDropdown(connectorLocators.actionPage.accountSelectionDropDown, actionObj.accountName, 0)
	cy.fillField(connectorLocators.actionPage.actionField, actionObj.firstField)
	cy.fillField(connectorLocators.actionPage.actionField, actionObj.emailField, false, 1)
	cy.clickButton(connectorLocators.actionPage.sendTestCallBtn)
	app.assertAPIResponse('@testAction')
}

export function createNewActionEndpoint(actionObj) {
	window.uniqueId = generateUUID()
	cy.assertText('h2.title', 'Create Endpoint')
	cy.fillField(connectorLocators.actionEndpoint.endpointName, actionObj.endpointActionName)
	cy.selectFromDropdown(connectorLocators.actionEndpoint.apiRequestTypeDropDown, actionObj.apiRequestType, 0)
	cy.selectFromDropdown(connectorLocators.actionEndpoint.baseUrlDropDown, actionObj.actionBaseUrl, 0)
	cy.fillField(connectorLocators.actionEndpoint.urlEndpoint, actionObj.endpoint)
	cy.clickButton('p.form-text.d-inline')
	cy.fixture("SendInBlueOutputResponse").then((data) => {
		cy.fillJson('#request_template', data.json)
	})
	cy.selectFromDropdown(connectorLocators.actionPage.outputObjectDropDown, actionObj.actionObjectText, 1)
	cy.selectFromDropdown(connectorLocators.actionPage.outputObjectActionDropDown, actionObj.objectAction, 0)

	cy.get(connectorLocators.endpointModal.headerFirstkey).type(actionObj.headerFirstValue)
	cy.clickButton(connectorLocators.endpointModal.addHeaderValue)
	cy.fillField(connectorLocators.endpointModal.header0Value, actionObj.header0Value)
	cy.clickButton(connectorLocators.endpointModal.addHeaderBtn)
	// cy.get(connectorLocators.endpointModal.totalHeaders).its("length").should("eq", 2)
	cy.selectFromDropdown(connectorLocators.endpointModal.header1KeyDropdown, actionObj.header1KeyDropdown)
	cy.fillField(connectorLocators.endpointModal.headerFirstValue, actionObj.header1Value)
	cy.clickButton(connectorLocators.endpointModal.addHeaderBtn)
	cy.selectFromDropdown(connectorLocators.endpointModal.headerSecondKeyDropdown, actionObj.header2ndKeyDropdown)
	cy.selectFromDropdown(connectorLocators.endpointModal.headerSecondValueDropdown, actionObj.headerSecondValueDropdown)
	cy.clickButton(connectorLocators.endpointModal.addHeaderBtn)
	cy.get(connectorLocators.endpointModal.headerThirdkey).type(actionObj.headerThirdValue)
	cy.clickButton(connectorLocators.endpointModal.addHeaderThirdKey)
	cy.fillField(connectorLocators.endpointModal.headerThirdValue, actionObj.header3rdValue)
	cy.clickButton(connectorLocators.actionPage.createEndPointBtn)
	cy.clickButton(connectorLocators.actionPage.saveEndPointBtn)
	app.assertAPIResponse('@getEndpoints')
}

export function testActionEndpoint(actionObj) {
	cy.clickButton(connectorLocators.actionPage.testActionBtn, true, 2)
	cy.selectFromDropdown(connectorLocators.actionPage.accountSelectionDropDown, actionObj.accountName, 0)
	cy.fillField(connectorLocators.actionPage.actionField, "abdullah" + window.uniqueId + "@integry.io")
	cy.clickButton(connectorLocators.actionCheckbox)
	cy.clickButton(connectorLocators.actionCheckbox, true, 1)
	cy.clickButton(connectorLocators.sendTestCallBtn)
	app.assertAPIResponse('@testAction')
	cy.get(connectorLocators.actionPage.actionSuccessMsg).invoke("text").then(msg => {
		expect(msg.trim()).to.eql("201CreatedView details")
	})
}

export function createTriggerEndpoint(triggerObj) {
	cy.assertText('h2.title', 'Create Endpoint')
	cy.fillField(connectorLocators.triggerEndpoint.endpointName, triggerObj.endpointName)
	cy.selectFromDropdown(connectorLocators.triggerEndpoint.apiRequestTypeDropDown, triggerObj.apiRequestType, 0)
	cy.selectFromDropdown(connectorLocators.triggerEndpoint.baseUrlDropDown, triggerObj.baseUrl, 0)
	cy.fillField(connectorLocators.triggerEndpoint.urlEndpoint, triggerObj.endpoint)
	cy.selectFromDropdown(connectorLocators.actionPage.outputObjectDropDown, triggerObj.actionObjectText, 1)
	cy.selectFromDropdown(connectorLocators.actionPage.outputObjectActionDropDown, triggerObj.objectAction, 0)
	cy.fillField(connectorLocators.triggerEndpoint.trackingProperty, triggerObj.trackingPropertyName)
	cy.fillField('#value_0', 'Basic {{ authorization.token.access_token }}')

	cy.clickButton(connectorLocators.actionPage.createEndPointBtn)
	cy.clickButton(connectorLocators.actionPage.saveEndPointBtn)
	app.assertAPIResponse('@getEndpoints')
}
export function testTriggerEndpoint(triggerObj) {
	cy.clickButton(connectorLocators.actionPage.testActionBtn, true, 2)
	cy.selectFromDropdown(connectorLocators.actionPage.accountSelectionDropDown, triggerObj.accountName, 0)
	createContactInInsightly()
	cy.clickButton(connectorLocators.actionPage.sendTestCallBtn)
	app.assertAPIResponse('@testQuery')
	cy.get(connectorLocators.actionPage.pollSuccessMsg).invoke("text").then(msg => {
		expect(msg.trim()).to.eql("200SuccessView Results for Baseline Poll")
	})
}

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
function generateUUID() {
	const uuid = require("uuid");
	const id = uuid.v4();
	return id.split("-")[0].substring(0, 7);
}
export function addTriggerInfo(infoObj) {
	window.uniqueId = generateUUID();
	cy.fillField(connectorLocators.name, infoObj.name + window.uniqueId)
	cy.fillField(connectorLocators.descriptionField, infoObj.description)
	cy.clickButton(connectorLocators.continueBtn)
	app.assertAPIResponse("@updateActivity")
	app.assertAPIResponse("@UpdateApp")
	cy.fixture("UniqueIds").then(data => {
		data.insightlyTriggerId = window.uniqueId
		cy.writeFile('cypress/fixtures/UniqueIds.json', JSON.stringify(data))
	})
}
export function poolApiCall(valueObj) {
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
	cy.clickButton(connectorLocators.testAuthBtn)
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
export function createTriggerActivity(objName) {
	cy.clickButton(connectorLocators.editEndPonit.sidebarNav, true, 4)
	cy.clickButton(connectorLocators.triggerpage.createTriggerBtn)
	cy.fillField(connectorLocators.triggerpage.name, objName.name)
	cy.fillField(connectorLocators.triggerpage.description, objName.description)
	cy.selectFromDropdown(connectorLocators.triggerpage.authSelectionDropDown, objName.authType, 0)
	cy.selectFromDropdown(connectorLocators.triggerpage.inputObjectDropDown, objName.inputObjValue)
	cy.selectFromDropdown(connectorLocators.triggerpage.objectActionDropDown, objName.objActionValue)
	cy.clickButton(connectorLocators.triggerpage.pollBasedSlider)
	// cy.selectFromDropdown(connectorLocators.triggerpage.triggerEndpointDropDown, objName.pollEndpoint)

	// cy.fixture("Connectors_data").then(data => {
	// 	cy.fixture("UniqueIds").then(ids => {
	// 		cy.get("a:contains(Test Trigger" + window.uniqueId + ")").first().click()
	// 	})

	// })
	// cy.get(connectorLocators.editEndPonit.ednpointBtn).invoke('removeAttr', 'target').click()
	// cy.clickButton(connectorLocators.editEndPonit.baseUrlv3)
	// cy.clickButton(connectorLocators.editEndPonit.caseUrlDropDOwn, true, 2)
	// cy.fillField(connectorLocators.editEndPonit.propertyName, objName.propertyNameText)
	// cy.clickButton(connectorLocators.editEndPonit.saveBtn)
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
	// app.assertAPIResponse("@endPointAuth")
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
	cy.clickButton(connectorLocators.cloneConnector.dropDownBtn, true, 1)
	cy.clickButton(connectorLocators.cloneConnector.deleteBtn, false, 1)
	cy.clickButton(connectorLocators.cloneConnector.redBtn)
	cy.assertText(connectorLocators.cloneConnector.tostfyMsg, obj.deleteMsg)
}

export function addNewomepageUrl(baseUrlObj) {
	cy.fillField(connectorLocators.homepageUrl, baseUrlObj.baseUrl)
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.connectorBaseUrlName, "Base URl")
	cy.fillField(connectorLocators.connectorBaseUrl, baseUrlObj.appBaseUrl)
}

export function addApiBaseURL(baseUrlObj) {
	cy.clickButton(connectorLocators.addBaseUrlBtn)
	cy.fillField(connectorLocators.connectorBaseUrlName, baseUrlObj.apiFirstUrl)
	cy.fillField(connectorLocators.connectorBaseUrl, baseUrlObj.appBaseUrl)
}

export function addHomePageUrl(baseUrlObj) {
	cy.fillField(connectorLocators.homepageUrl, baseUrlObj.baseUrl)
}

export function enableTogglesofBasicInfo() {
	cy.clickButton(connectorLocators.slider)
	cy.clickButton(connectorLocators.slider, false, 1)
}

export function fillConnectorWorkspace(obj) {
	cy.fillField(connectorLocators.fillConnectorWorkspace.userProfile, obj.userProfile)
	cy.fillField(connectorLocators.fillConnectorWorkspace.OauthSetupGuide, obj.OauthSetupGuide)
	cy.fillField(connectorLocators.fillConnectorWorkspace.statusCode, obj.statusCode)
}

export function oAuthAuthorization(auth) {
	cy.clickButton(connectorLocators.createAuthBtn)
	cy.selectFromDropdown(connectorLocators.dropdown, auth.authType, 0)
	cy.fillField(connectorLocators.clientId, auth.clientId)
	cy.fillField(connectorLocators.clientSecret, auth.clientSecret)
	cy.fillField(connectorLocators.authorizationUri, auth.authorizationUri)
	cy.fillField(connectorLocators.scopes, auth.scope)
	cy.fixture("oauthAuthVerification").then((data) => {
		cy.fillJson(connectorLocators.configrations, data.configrations)
	})
	cy.selectFromDropdown(connectorLocators.grandTypeDropDown, auth.grandType)

}

export function createTokenEndpoint(tokenObj) {
	cy.selectFromDropdown(connectorLocators.fillConnectorWorkspace.tokenEndointDropDown, tokenObj.tokenEndpoint)
	cy.assertText(connectorLocators.endpointPage, tokenObj.endpointPageHeading)
	cy.fillField(connectorLocators.triggerEndpoint.endpointName, tokenObj.endpointName)
	cy.selectFromDropdown(connectorLocators.triggerEndpoint.apiRequestTypeDropDown, tokenObj.apiRequestType, 0)
	cy.selectFromDropdown(connectorLocators.triggerEndpoint.baseUrlDropDown, tokenObj.baseUrlText, 0)
	cy.fillField(connectorLocators.triggerEndpoint.urlEndpoint, tokenObj.endpoint)
	cy.clickButton(connectorLocators.editRequestTemplate)
	cy.fixture("OauthTokenEndpoint").then((data) => {
		cy.fillJson(connectorLocators.requestTemplate, data.jsonResponse)
		cy.clickButton(connectorLocators.deleteHeader, false, 1)
		cy.selectFromDropdown(connectorLocators.endpointModal.header0KeyDropdown, tokenObj.header1KeyDropdown)
		cy.selectFromDropdown(connectorLocators.endpointModal.headerFirstValueDropdown, tokenObj.header1Value)
		cy.clickButton(connectorLocators.createEndpointBtn)
		app.assertAPIResponse("@createEndpoint")

	})
}

export function authVarificationEndpoint(endpointObj) {
	cy.selectFromDropdown(connectorLocators.authVerificationEndpointDropdown, endpointObj.newEndpoint)
	cy.assertText(connectorLocators.endpointPage, endpointObj.endpointPageHeading)
	cy.fillField(connectorLocators.triggerEndpoint.endpointName, endpointObj.endpointName)
	cy.selectFromDropdown(connectorLocators.triggerEndpoint.apiRequestTypeDropDown, endpointObj.apiRequestType, 0)
	cy.selectFromDropdown(connectorLocators.triggerEndpoint.baseUrlDropDown, endpointObj.baseUrlText, 0)
	cy.fillField(connectorLocators.triggerEndpoint.urlEndpoint, endpointObj.endpoint)
	cy.clickButton(connectorLocators.editRequestTemplate)
	cy.fixture("oauthAuthVerification").then((data) => {
		cy.fillJson(connectorLocators.responseTemplate, data.jsonResponse)
	})
	cy.selectFromDropdown(connectorLocators.endpointModal.header0KeyDropdown, endpointObj.header1KeyDropdown)
	cy.fillField(connectorLocators.endpointModal.header0Value, endpointObj.firstHeaderValue)
	cy.clickButton(connectorLocators.createEndpointBtn)
	app.assertAPIResponse("@createEndpoint")
	cy.selectFromDropdown(connectorLocators.userInfoEndpointDropdown, endpointObj.endpointName)
}

export function createAuthorization() {
	cy.clickButton(connectorLocators.createAuthorizationBtn)
}


