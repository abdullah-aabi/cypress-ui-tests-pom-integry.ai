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
      data.oauth2.appData,
      [data.oauth2.userInfoEndpoint],
      true,
      data.oauth2.createAuth
    )

    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("Create Token Endpoint in Mailchimp Connector.", () => {
    data.oauth2.tokenEndpoint.base_url_id = data.oauth2.appData.base_urls[0].name
    data.oauth2.tokenEndpoint.endpoint_type = data.oauth2.tokenEndpoint.endpoint_name
    connector.createAppEndpoint(data.oauth2.tokenEndpoint)
    connector.testEndPoint(data.apiKeyURL, "tokenEndpoint")
  });
});