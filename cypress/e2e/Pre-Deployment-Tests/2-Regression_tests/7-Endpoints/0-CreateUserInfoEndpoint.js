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
      data.fillSendInBlueInfo.appData,
      false,
      true
    )

    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("Create User info Endpoint in SendInBlue Connector.", () => {
    data.fillSendInBlueInfo.userInfoEndpoint.base_url_id = data.fillSendInBlueInfo.appData.base_urls[0].name
    data.fillSendInBlueInfo.userInfoEndpoint.endpoint_type = data.fillSendInBlueInfo.userInfoEndpoint.endpoint_name
    connector.createAppEndpoint(data.fillSendInBlueInfo.userInfoEndpoint)
    cy.url().then(currentUrl => {
      let appId = currentUrl.split("apps/v3/")[1]
      appId = appId.split("/")[0]
      let endpointId = currentUrl.split("endpoints/")[1]
      endpointId = endpointId.split("/")[0]
      connector.createAuthUsingApi(data.fillSendInBlueInfo.createAuth, appId, endpointId)
      connector.testEndPoint(data.fillSendInBlueInfo, "userInfoEndpoint")
    })
  });
});