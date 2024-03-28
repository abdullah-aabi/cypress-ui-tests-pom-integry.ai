const app = require("../../../../../support/businessActions/app.js")
const commands = require("../../../../../support/commands.js")
const connector = require("../../../../../support/businessActions/connector.js")
const activity = require("../../../../../support/businessActions/activity.js")
const data = require("../../../../../fixtures/Connectors_data.json")

import "cypress-file-upload"

describe("Create Insightly Connector Using API Key With URL", () => {

  beforeEach(() => {
    cy.readFile('src/utils/user-creds.json').then((creds) => {
      cy.loginWithUI(creds.username, creds.password, creds.userid)
      cy.log("Current User", creds.username)
    })
    cy.log("Test Start")
  })

  it("should create Insightly connector using API Key with URL", () => {
    app.assertAPIResponse("@getAllApps")
    connector.goToConnectorsTab()
    connector.createConnector()

    connector.addHomepageUrl(data.apiKeyURL.homepageUrl)
    connector.addBasicInfo(data.apiKeyURL)
    connector.selectAuthType(data.apiKeyURL.authType)

    connector.authenticateAPI(data.apiKeyURL)
    connector.verifyTestResult(data.bannerSuccessMsg)
    connector.verifyNextStepName(data.activitiesRoute, data.activitiesStep)

    connector.exitConnector()
    activity.openActivityType("Action", 0)
    activity.addActivityInfo(data.insightlyActions)
    activity.goToActivities()
    cy.contains(data.insightlyActions.name + window.uniqueId).click() // To check if it is created.

    cy.readFile("cypress/fixtures/UniqueIds.json").then(ids => {
      ids.insightlyConnectorId = window.uniqueId
      cy.writeFile('cypress/fixtures/UniqueIds.json', JSON.stringify(ids))
    })
  })
})

describe("create an activity with action type", () => {

  beforeEach(() => {
    cy.readFile('src/utils/user-creds.json').then((creds) => {
      cy.loginWithUI(creds.username, creds.password, creds.userid)
      cy.log("Current User", creds.username)
    })
    cy.log("Test Start")

    app.assertAPIResponse("@getAllApps")
    connector.goToConnectorsTab()
    cy.readFile("cypress/fixtures/UniqueIds.json").then(ids => {
      connector.openConnector(data.insightlyActions.app, ids.insightlyConnectorId)
    })
    activity.goToActivities()
    activity.createActivity(data.insightlyActions.activityBtnText)
    activity.openActivityType("Action", 0)

    window.uniqueId = commands.generateUUID()
    activity.addActivityInfo(data.insightlyActions)
  })

  // it("should create an action with textarea, password and hidden fields", () => {
  //   activity.addTextFields(data.insightlyActions.textPassHideFields)
  //   activity.connectAccount(data.insightlyActions, true)
  //   activity.addFieldsValue(data.insightlyActions.textPassHideFields)

  //   activity.testActivity(data.insightlyActions, true, data.insightlyActions.jsonTextPassHideFields)
  //   activity.verifyActivityResult(data.bannerSuccessMsg)
  // })

  // it("should create an action with textfield, date and time fields", () => {
  //   activity.addTextFields(data.insightlyActions.textDateTimeFields)
  //   activity.connectAccount(data.insightlyActions, true)
  //   activity.addFieldsValue(data.insightlyActions.textDateTimeFields)

  //   activity.testActivity(data.insightlyActions, true, data.insightlyActions.jsonTextDateTimeFields)
  //   activity.verifyActivityResult(data.bannerSuccessMsg)
  //   connector.processResponse(data.insightlyActions, true)
  //   app.assertAPIResponse("@UpdateApp")
  //   app.assertAPIResponse("@endPointAuth")
  //   app.assertAPIResponse("@updateActivity")
  // })

  it("should create an action with checkbox and radio fields", () => {
    activity.addAdvancedFields(data.insightlyActions.checkboxRadioFields)
    activity.connectAccount(data.insightlyActions, true, true)
    activity.addFieldsValue(data.insightlyActions.checkboxRadioFields)

    activity.testActivity(data.insightlyActions, true, data.insightlyActions.jsonCheckboxRadioFields)
    activity.verifyActivityResult(data.bannerSuccessMsg)
    connector.processResponse(data.insightlyActions, true)
    app.assertAPIResponse("@UpdateApp")
    app.assertAPIResponse("@endPointAuth")
    app.assertAPIResponse("@updateActivity")
  })

  it("should create an action with dropdown field", () => {
    activity.addAdvancedFields(data.insightlyActions.dropdownField)
    activity.connectAccount(data.insightlyActions, true, true)
    activity.addFieldsValue(data.insightlyActions.dropdownField)

    activity.testActivity(data.insightlyActions, true, data.insightlyActions.jsonDropdownField)
    activity.verifyActivityResult(data.bannerSuccessMsg)
    connector.processResponse(data.insightlyActions, true)
    app.assertAPIResponse("@UpdateApp")
    app.assertAPIResponse("@endPointAuth")
    app.assertAPIResponse("@updateActivity")
  })

  // it("should create an action with field mapping", () => {
  //   activity.addAdvancedFields(data.insightlyActions.fieldMapping)
  //   activity.connectAccount(data.insightlyActions, true, true)
  //   activity.addFieldsValue(data.insightlyActions.fieldMapping)

  //   activity.testActivity(data.insightlyActions, true, data.insightlyActions.jsonFieldMapping)
  //   activity.verifyActivityResult(data.bannerSuccessMsg)
  //   connector.processResponse(data.insightlyActions, true)
  //   app.assertAPIResponse("@UpdateApp")
  //   app.assertAPIResponse("@endPointAuth")
  //   app.assertAPIResponse("@updateActivity")
  // })
})