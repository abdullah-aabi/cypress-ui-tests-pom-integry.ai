const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const data = require("../../../../../fixtures/Connectors_data.json")
import connectorLocators from "../../../../../Locators/ConnectorsLocators.js";

import "cypress-file-upload"
import ConnectorsLocators from "../../../../../Locators/ConnectorsLocators.js"

describe("Create Mailchimp Connector Using OAuth2", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.loginWithApi()

    connector.createAppUsingApi(data.oauth2.appData, [data.oauth2.userInfoEndpoint, data.oauth2.tokenEndpoint], true)

    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()

    cy.log("Test Start")
  })

  it("should create Mailchimp connector using OAuth2", () => {
    connector.selectAuthType(data.oauth2)
    cy.selectFromDropdown(ConnectorsLocators.userInfoEndpointDropdown, data.oauth2.endpointName)

    let clientId, clientSecret
    if (Cypress.config().baseUrl.includes("app") || Cypress.config().baseUrl.includes("3006")) {
      clientId = data.oauth2.clientIdProd
      clientSecret = data.oauth2.clientSecretProd
    }
    else {
      clientId = data.oauth2.clientIdStage
      clientSecret = data.oauth2.clientSecretStage
    }

    connector.configureOAuth2(clientId, clientSecret, data.oauth2)

    connector.addOAuth2Credentials(data.oauth2)
    // connector.verifyAuthTestResult(data.connectedAccount)

    // Bug workaround start || Bug: https://app.clickup.com/t/866a7jaep
    cy.loadWindow()
    cy.reload()
    cy.isElementVisible(connectorLocators.testAUthBtn)
    cy.clickButton(connectorLocators.testAUthBtn)
    cy.assertText(connectorLocators.testAuthAssertion, data.connectedAccount.connectedAssertion)
    // Bug workaround end

    connector.testEndPoints(data.oauth2)
  })
})