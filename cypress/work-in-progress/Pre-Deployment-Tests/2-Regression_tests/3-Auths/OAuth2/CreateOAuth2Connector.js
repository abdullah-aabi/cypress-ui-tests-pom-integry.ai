const app = require("../../../../../support/businessActions/app.js")
const connector = require("../../../../../support/businessActions/connector.js")
const data = require("../../../../../fixtures/Connectors_data.json")

import "cypress-file-upload"
describe("Create Mailchimp Connector Using OAuth2", () => {

  before(() => {

  })

  beforeEach(() => {
    cy.readFile('src/utils/user-creds.json').then((creds) => {
      cy.loginWithUI(creds.username, creds.password, creds.userid)
      cy.log("Current User", creds.username)
    })

    cy.log("Test Start")
  })

  it("should create Mailchimp connector using OAuth2", () => {
    app.assertAPIResponse("@getAllApps")
    connector.goToConnectorsTab()
    connector.createConnector()

    connector.addHomepageUrl(data.oauth2.homepageUrl)
    connector.addBasicInfo(data.oauth2)
    connector.selectAuthType(data.oauth2.authType)

    let clientId = ''
    let clientSecret = ''
    if (Cypress.env("name") === "production") {
      clientId = data.oauth2.clientIdProd
      clientSecret = data.oauth2.clientSecretProd
    }
    else {
      clientId = data.oauth2.clientIdStage
      clientSecret = data.oauth2.clientSecretStage
    }

    connector.configureOAuth2(clientId, clientSecret, data.oauth2)
    connector.addOAuth2Credentials(data.oauth2)
    app.assertAPIResponse("@connectedAccounts")
    app.assertAPIResponse("@authTypes")
    app.assertAPIResponse("@UpdateApp")
    app.assertAPIResponse("@endPointAuth")
    connector.verifyTestResult(data.oauth2.tokenSuccessMsg)

    connector.addReqDetails(data.oauth2)
    connector.testAuthorization()
    connector.verifyTestResult(data.bannerSuccessMsg)
    connector.verifyNextStepName(data.activitiesRoute, data.activitiesStep)

    connector.openAuthorizations()
    connector.openAuthConfigStep(data.oauth2.processResStep, 4)
    connector.processResponse(data.oauth2)
    app.assertAPIResponse("@UpdateApp")
    app.assertAPIResponse("@endPointAuth")
    app.assertAPIResponse("@authTypes")
  })
})