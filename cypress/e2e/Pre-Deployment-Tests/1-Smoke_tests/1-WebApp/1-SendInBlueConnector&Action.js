/// <reference types="Cypress" />
const connector = require("../../../../support/businessActions/connector")
const app = require("../../../../support/businessActions/app");
const data = require("../../../../fixtures/Connectors_data.json");
import "cypress-file-upload";
import { getCredsType } from "../../../../support/commands";

describe("Create SendInBlue Connector", () => {
  beforeEach(() => {
    cy.loginWithApi()

    connector.createAppUsingApi(
      data.fillSendInBlueInfo.appData,
      [data.fillSendInBlueInfo.userInfoEndpoint, data.fillSendInBlueInfo.actionEndpoint],
      true,
      data.fillSendInBlueInfo.createAuth
    )

    // Verify, the user is logged in successfully.
    cy.isUserLoggedIn()
    cy.log("Test Start")
  })

  it("Create SendInBlue Connector.", () => {
    connector.isAccountConnected(data.connectedAccount);

    connector.createActionNewActivity(data.fillSendInBlueInfo)
    connector.submitActionAuth(data.fillSendInBlueInfo.createActionEndpoint)

    connector.testActionEndpoint(data.fillSendInBlueInfo)
  });
});