/// <reference types="Cypress" />
const connector = require("../../../../support/businessActions/connector")
const app = require("../../../../support/businessActions/app");
const data = require("../../../../fixtures/Connectors_data.json");
import "cypress-file-upload";

describe("Endpoint tests", () => {
  before(() => {

  });

  beforeEach(() => {
    cy.loginWithApi()

    connector.createAppUsingApi(
      data.apiKeyURL.appData,
      [data.apiKeyURL.userInfoEndpoint],
      true,
      data.apiKeyURL.createAuth
    )

    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("Create Polling Endpoint in Insightly Connector.", () => {
    data.apiKeyURL.triggerEndpoint.base_url_id = data.apiKeyURL.appData.base_urls[0].name
    data.apiKeyURL.triggerEndpoint.endpoint_type = "Polling Endpoint"
    connector.createAppEndpoint(data.apiKeyURL.triggerEndpoint)
    connector.testEndPoint(data.apiKeyURL, "triggerEndpoint")
  });
});