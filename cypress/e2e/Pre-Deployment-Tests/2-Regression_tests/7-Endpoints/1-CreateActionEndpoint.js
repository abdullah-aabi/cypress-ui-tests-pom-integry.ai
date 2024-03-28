/// <reference types="Cypress" />
const connector = require("../../../../support/businessActions/connector")
const app = require("../../../../support/businessActions/app");
const data = require("../../../../fixtures/Connectors_data.json");
import "cypress-file-upload";
import { getUniqueEmail } from "../../../../support/commands";

describe("Endpoint tests", () => {
  before(() => {

  });

  beforeEach(() => {
    cy.loginWithApi()

    connector.createAppUsingApi(
      data.fillSendInBlueInfo.appData,
      [data.fillSendInBlueInfo.userInfoEndpoint],
      true,
      data.fillSendInBlueInfo.createAuth
    )
    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("Create User info Endpoint in SendInBlue Connector.", () => {
    let rawRequestBody = '{ "requestBody": { "data": { "email": "test+' + getUniqueEmail() + '"} } }'

    data.fillSendInBlueInfo.actionEndpoint.base_url_id = data.fillSendInBlueInfo.appData.base_urls[0].name
    data.fillSendInBlueInfo.actionEndpoint.endpoint_type = data.fillSendInBlueInfo.actionEndpoint.endpoint_name.split(":")[0]
    connector.createAppEndpoint(data.fillSendInBlueInfo.actionEndpoint)

    data.fillSendInBlueInfo.rawRequestBody = rawRequestBody
    data.fillSendInBlueInfo.authSuccessMsg = "201CreatedView details"
    connector.testEndPoint(data.fillSendInBlueInfo, "actionEndpoint")
  });
});