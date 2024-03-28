/*	Business helper functions i.e. app focused
  Each business helper function will internally call technical helper functions to execute desired steps
  Test cases will primarily call these business helper functions
*/

import flowsLocators, { createFlowBtns } from "../../Locators/FlowsLocators"
import { getCredsType } from "../commands"
const app = require("./app.js")
const connector = require("./connector.js")

//Guided flow related functions

export function goToFlowsTab() {
  cy.clickButton(flowsLocators.flowsNavLink)
  // app.assertAPIResponse("@getTemplates")
  // cy.wait("@getTemplates").its("response").then(res => {
  //   expect(res.statusCode).to.eql(200)
  //   if (res.body === []) {
  //     createFlowBtns = "button.zeroPage_Btn"
  //   }
  // })
}

export function openFlow(name, id) {
  const flowName = name + "_" + id
  cy.clickSpecificButton(flowName)
  app.assertAPIResponse("@getTemplates")
  app.assertAPIResponse("@getTemplateActivities")
  app.assertAPIResponse("@getApp")
  app.assertAPIResponse("@getBundles")
}
export function createNewFlow() {
  cy.clickButton("div.reusable-button-wrapper button")
  cy.clickButton("p.create-from-scratch-link")
}

export function createFlow() {
  cy.fixture(getCredsType()).then((str) => {
    var user = str.username; //Store the username
    const pass = str.password; //Stores the password
    cy.log(user);
    cy.log(pass);

    cy.request({
      url: Cypress.env("base_url") + "/api/v1/templates/?app=" + window.localStorage.getItem("globallySelectedApp"),
      method: "GET",

      auth: {
        username: user,
        password: pass,
        //"THISISTEST123GO!",
      },
      // data: {
      //   app: window.localStorage.getItem("globallySelectedApp"),
      // },
      followRedirect: false,
      retryOnStatusCodeFailure: true,
    }).then((resp) => {
      // expect(resp.status).to.eq(200); // verifies the sucess of the API call
      cy.log(JSON.stringify(resp.body.count))
      if (resp.body.count === 0) {
        if (Cypress.config().baseUrl.includes("app") || Cypress.config().baseUrl.includes("3006")) {
          cy.clickButton(flowsLocators.createNewFlowBtn, false, 0) // bug: Need to be fixed
        } else {
          cy.clickButton(flowsLocators.createNewFlow, false, 0)
        }
      } else {
        if (Cypress.config().baseUrl.includes("app") || Cypress.config().baseUrl.includes("3006")) {
          cy.clickButton(flowsLocators.createFlowBtn, false, 0)
        } else {
          cy.clickButton(flowsLocators.createNewFlow, false, 0)
        }
      }
    });
    app.assertAPIResponse("@getApp")
  });
}

export function addFlowDetails(flowObj) {
  cy.fillField(flowsLocators.title, flowObj.title, true)
  cy.fillField(flowsLocators.description, flowObj.description)
}

export function selectAppConnector(name) {
  cy.fillField(flowsLocators.search, name)
  //   cy.fixture("UniqueIds").then(ids => {
  //     cy.get(flowsLocators.search).type("Insightly_" + ids.insightlyConnectorId + "")
  //   })
  cy.clickButton(flowsLocators.searchResult)
}
export function selectConnector() {
  cy.fixture("UniqueIds").then(ids => {
    cy.get(flowsLocators.search).type("Insightly_" + ids.insightlyConnectorId + "")
    cy.clickButton(flowsLocators.searchResult)
  })
}
export function selectQueryConnectorApp(name) {
  // cy.fillField(flowsLocators.search, name)
  cy.fixture("UniqueIds").then(ids => {
    cy.get(flowsLocators.search).type("Insightly_" + ids.insightlyConnectorId + "")
  })
  cy.clickButton(flowsLocators.searchResult)
}
export function proceedToNextStep(buttonText, index) {
  cy.wait(Cypress.env("minTimeout"))
  if (buttonText === "Continue") {
    cy.assertText(flowsLocators.continueBtn, buttonText, index)
    cy.clickButton(flowsLocators.continueBtn, false, index)
  } else {
    cy.assertText(flowsLocators.doneButton, buttonText, index)
    cy.clickButton(flowsLocators.doneButton, false, index)
  }
}
export function queryNextStep() {
  cy.wait(Cypress.env("minTimeout"))
  cy.clickButton(flowsLocators.continueBtn)
  cy.clickButton(flowsLocators.testBtn)
  app.assertAPIResponse("@postTemplate")
  cy.get(flowsLocators.queryFlow.nextPageBtn).should('have.text', "Next Page")
  cy.clickButton(flowsLocators.doneButton, true, 1)

}
export function configureSystemApp(config) {
  switch (config.systemApp) {
    case "Schedule":
      // Using default configurations
      break

    case "Setup":
      // "Setup" has no configurations
      break

    case "Loop":
      cy.fillField(flowsLocators.fieldInput, config.varName)
      cy.isElementVisible(flowsLocators.addTagBtn)
      cy.clickButton(flowsLocators.addTagBtn)
      cy.clickButton(flowsLocators.tagStep, false, 1)
      cy.clickButton(flowsLocators.tagObjKey)
      break

    case "If":
      cy.isElementVisible(flowsLocators.addTagBtn)
      cy.clickButton(flowsLocators.addTagBtn)
      cy.clickButton(flowsLocators.tagStep, false, 1)
      cy.clickButton(flowsLocators.tagStepObj, false, 2)
      cy.clickSpecificButton(config.tagKey, flowsLocators.tagObjKey)
      cy.fillField(flowsLocators.textfieldValue, config.tagValue, false, 2)
      break

    case "Else If":
      cy.isElementVisible(flowsLocators.addTagBtn, 1)
      cy.clickButton(flowsLocators.addTagBtn, 1)
      cy.clickButton(flowsLocators.tagStep, false, 1)
      cy.clickButton(flowsLocators.tagStepObj, false, 2)
      cy.clickSpecificButton(config.tagKey, flowsLocators.tagObjKey)
      cy.fillField(flowsLocators.textfieldValue, config.tagValue, false, 2)
      break

    default:
  }
}

export function assertLoopIteration(step) {
  cy.assertText(flowsLocators.stepHeading, step.stepTitle)
  cy.assertText(flowsLocators.stepSubtitle, step.stepSubtitle)
  cy.isElementVisible(flowsLocators.nextIteration)
  cy.clickButton(flowsLocators.nextIteration)
  app.assertAPIResponse("@testTemplate")
  app.assertAPIResponse("@updateTemplate")
}

export function selectApp(name, index) {
  cy.fillField(flowsLocators.search, name)
  cy.clickButton(flowsLocators.searchResult, 0)
}
export function assertConditionResult(step) {
  cy.assertText(flowsLocators.conditionResult, step.stepTitle, 0)
  cy.assertText(flowsLocators.conditionResult, step.stepSubtitle, 1)
}

export function configureMailchimpApp(items) {
  app.assertAPIResponse("@endPoint")  // fetch list
  app.assertAPIResponse("@endPoint")  // fetch status
  cy.assertText(flowsLocators.editFieldTitle, items.statusFieldTitle, 1)
  cy.wait(Cypress.env("minTimeout"))
  cy.isElementVisible(flowsLocators.dropdownMenu)
  cy.clickButton(flowsLocators.dropdownMenu)
  cy.assertText(flowsLocators.listOption, items.list)
  cy.clickButton(flowsLocators.listOption)
  cy.isElementVisible(flowsLocators.dropdownMenu, 1)
  cy.clickButton(flowsLocators.dropdownMenu, false, 1)
  cy.assertText(flowsLocators.listOption, items.subscriberStatus)
  cy.clickButton(flowsLocators.listOption)
}
export function configureInsightlyApp(objName) {
  cy.fillField(flowsLocators.storageFlows.nameField, objName.name)
  cy.fillField(flowsLocators.storageFlows.emailField, objName.email, false, 1)
  cy.clickButton(flowsLocators.continueBtn)
  cy.wait(Cypress.env("minTimeout"))
  cy.clickButton(flowsLocators.testBtn)
  app.assertAPIResponse("@testAction")
  cy.wait(Cypress.env("minTimeout"))
  cy.clickButton(flowsLocators.doneButton, true, 1)
}

export function addChildStep(parentStepIndex) {
  cy.isElementVisible(flowsLocators.stepMenu, parentStepIndex)
  cy.clickButton(flowsLocators.stepMenu, false, parentStepIndex)
  cy.isElementVisible(flowsLocators.stepMenuItem, 1)
  cy.clickButton(flowsLocators.stepMenuItem, false, 1)
}

export function addStepInChildStep(parentStepIndex) {
  cy.isElementVisible(flowsLocators.stepMenu, parentStepIndex)
  cy.clickButton(flowsLocators.stepMenu, false, 1)
  cy.isElementVisible(flowsLocators.stepMenuItem, 0)
  cy.clickButton(flowsLocators.stepMenuItem)
}

export function selectActivity(name) {
  app.assertAPIResponse("@getActivity")
  cy.selectFromDropdown(flowsLocators.dropdown, name)
}
export function selectQuery(name) {
  app.assertAPIResponse("@getActivity")
  cy.selectFromDropdown(flowsLocators.dropdown, name)
}
export function addFieldsValue(fields) {
  fields.forEach((field, index) => {
    if (field.title === "Email") {
      cy.enterUniqueEmail(flowsLocators.textfieldValue, field.value, index)
    } else {
      cy.fillField(flowsLocators.textfieldValue, field.value, false, index)
    }
  })
}

export function saveFlow(buttonText, successMessage) {
  cy.assertText(flowsLocators.saveButton, buttonText)
  cy.clickButton(flowsLocators.saveButton)
  app.assertAPIResponse("@postPartialTemplate")
  app.assertAPIResponse("@getTemplateActivities")
  cy.assertText(flowsLocators.successMessage, successMessage)
}

export function selectTrigger() {
  cy.clickButton(flowsLocators.selectTriggerConnector.triggerOptionFirst)
  cy.clickButton(flowsLocators.selectTriggerConnector.triggerOptionResultLast)
}

export function selectAction(index) {
  cy.clickButton(flowsLocators.selectTriggerConnector.triggerOptionFirst)
  cy.clickButton(flowsLocators.selectTriggerConnector.triggerOptionResultLast, false, index)
}

export function connectApp(accountObj) {
  app.assertAPIResponse("@connectedAccountsList")
  cy.get('@connectedAccountsList').then((xhr) => {
    if (JSON.stringify(xhr.response.body) === "[]") {
      // Add Account
      cy.saveWindow(flowsLocators.addAccount)
      if (accountObj.authType === "OAuth2") {
        connector.addOAuth2Credentials(accountObj)
      }
      else {
        connector.addCredentials(accountObj)
        cy.assertText(flowsLocators.saveButton, accountObj.submitBtnText)
        cy.clickButton(flowsLocators.saveButton)
      }
      cy.loadWindow()
    }
    else {
      // Use Existing Account
      cy.clickButton(flowsLocators.radioBtn)
    }
    app.assertAPIResponse("@verifyConnection")
  })
}
export function connectAccount(accountObj) {
  app.assertAPIResponse("@connectedAccountsList")
  cy.get('@connectedAccountsList').then((xhr) => {
    if (JSON.stringify(xhr.response.body) === "[]") {
      // Add Account
      cy.saveWindow(flowsLocators.addAccount)
      if (accountObj.authType === "API key + URL") {
        connector.addInsightlyCredentials(accountObj)
      }
      else {
        connector.addCredentials(accountObj)
        cy.assertText(flowsLocators.saveButton, accountObj.submitBtnText)
        cy.clickButton(flowsLocators.saveButton)
      }
      cy.loadWindow()
    }
    else {
      // Use Existing Account
      cy.clickButton(flowsLocators.radioBtn)
    }
    app.assertAPIResponse("@verifyConnection")
  })
}

export function fillTriggerForm(valueObj) {
  cy.clickButton(flowsLocators.fillTriggerForm.doneBtn)
  cy.assertText(flowsLocators.fillTriggerForm.toastMsg, valueObj.toastMsg)
  cy.enterUniqueEmail(flowsLocators.fillTriggerForm.emailField_Unique, valueObj.emailField_Unique)
  cy.fillField(flowsLocators.fillTriggerForm.first_nameField, valueObj.first_nameField)
  cy.assertText(flowsLocators.fillTriggerForm.doneMsg, valueObj.doneMsg)
  cy.clickButton(flowsLocators.fillTriggerForm.doneBtnForce, true)
  app.assertAPIResponse("@ApiEndpoints")
}

export function triggerSuccessMessage(valueObj) {
  cy.assertText(flowsLocators.triggerSuccessMessage.triggerSuccessMsg, valueObj.triggerSuccessMsg)
  cy.assertText(flowsLocators.triggerSuccessMessage.doneTextButtonForce, valueObj.doneTextButtonForce)
  cy.clickButton(flowsLocators.triggerSuccessMessage.doneTextButtonForce, true)
}

export function selectActionConnector(valueObj) {
  cy.isElementVisible(flowsLocators.selectActionConnector.searchnotDisabled)
  cy.fillField(flowsLocators.selectActionConnector.search, valueObj)
  cy.get(flowsLocators.selectActionConnector.searchResultsFirst).eq(1).click()
  cy.clickButton(flowsLocators.selectActionConnector.triggerOptionFirst)
  cy.clickButton(flowsLocators.selectActionConnector.triggerOptionResultFirst)
}

export function selectQueryConnector(valueObj) {
  cy.isElementVisible(flowsLocators.selectActionConnector.searchnotDisabled)
  cy.fillField(flowsLocators.selectActionConnector.search, valueObj.search)
  cy.clickButton(flowsLocators.selectActionConnector.searchResultsFirst, false, 2)
  cy.clickButton(flowsLocators.selectActionConnector.triggerOptionFirst)
  cy.clickButton(flowsLocators.selectActionConnector.triggerOptionResultFirst)
}

export function fillActionForm(valueObj) {
  cy.enterUniqueEmail(flowsLocators.emailField_Unique, valueObj.emailField_Unique)
  // cy.fillField(flowsLocators.fillActionForm.first_nameField, valueObj.first_nameField)
  cy.clickButton("div.tagged-field-container img.drop-icon")
  cy.clickSpecificButton("My list")
  cy.assertText(flowsLocators.fillActionForm.done1TextButton, valueObj.done1TextButton)
  cy.clickButton(flowsLocators.fillActionForm.done1TextButton)
  cy.assertText(flowsLocators.fillActionForm.doneTextButton, valueObj.doneTextButton)
  cy.clickButton(flowsLocators.fillActionForm.doneTextButton)
  cy.containsText(flowsLocators.fillActionForm.doneTextButton, valueObj.doneBtn)
}

export function publishFlowInMarketPlace(valueObj) {
  cy.assertText(flowsLocators.publishFlowInMarketPlace.publishTextButton, valueObj.publishTextButton)
  cy.clickButton(flowsLocators.publishFlowInMarketPlace.publishTextButton)
  cy.clickButton(flowsLocators.publishFlowInMarketPlace.marketPlaceBtn)
  cy.clickButton(flowsLocators.publishFlowInMarketPlace.marketPlaceFirst)
  // cy.fixture("UniqueIds").then(ids => {
  //   cy.get('div.custom-select-menu').contains(ids.marketPlaceId).click()
  // }) // bug need to resolve to avoid flakiness
  cy.clickButton(flowsLocators.publishFlowInMarketPlace.deplopFlowDonwBtn)
  cy.containsText(flowsLocators.publishFlowInMarketPlace.publishFlowPopup, valueObj.PublishFlowAssertionText)
}

export function selectGuidedFlowApp() {
  cy.clickButton(flowsLocators.navigateToflowsScreen.flowsBtn)
  app.assertAPIResponse("@getAllApps")
  cy.clickButton(flowsLocators.navigateToflowsScreen.flowCard, false, 2)
}

export function unPublishApp(valueObj) {
  cy.assertText(flowsLocators.publishFlowInMarketPlace.publishTextButton, valueObj.publishTextButton)
  cy.clickButton(flowsLocators.publishFlowInMarketPlace.publishTextButton)
  cy.clickButton(flowsLocators.publishFlowInMarketPlace.confirmBtn)
}

export function deleteFlowStep() {
  cy.clickButton(flowsLocators.deleteFlowStep.expandStep)
  cy.clickButton(flowsLocators.deleteFlowStep.deleteBtn, false, 6)
  cy.clickButton(flowsLocators.deleteFlowStep.addStep)
}

export function completeFlow() {
  cy.clickButton(flowsLocators.publishFlowInMarketPlace.doneBtn, true, 1)
}

export function deleteFlow(objName) {
  cy.get(flowsLocators.flowGeneralLoc.hover).eq(0).trigger("mouseover")
  cy.clickButton(flowsLocators.dropdownFunctions.dropDownBtn, true)
  cy.clickButton(flowsLocators.dropdownFunctions.dropDownDelBtn, true, 7)
  cy.clickButton(flowsLocators.dropdownFunctions.delConfirmationBtn)
  cy.assertText(flowsLocators.dropdownFunctions.delAssertion, objName.delAssertionText)
}

export function unPublishFlow(objName) {
  cy.clickButton(flowsLocators.flowGeneralLoc.selectNameFlow, true)
  cy.clickButton(flowsLocators.publishOrUnpublishFlow.unpublishFlowBtn, true)
  cy.clickButton(flowsLocators.publishOrUnpublishFlow.unpublishConfirmFlowBtn)
  app.assertAPIResponse("@postPartialTemplate")
  app.assertAPIResponse("@getTemplateActivities")
}

export function cloneFlow(objName) {
  cy.clickButton(flowsLocators.dropdownFunctions.dropDownBtn)
  cy.clickButton(flowsLocators.dropdownFunctions.cloneDropDownBtn)
  cy.assertText(flowsLocators.dropdownFunctions.cloneConfirmBtn, objName.cloneCreationText)
  cy.clickButton(flowsLocators.dropdownFunctions.cloneConfirmBtn)
  cy.assertText(flowsLocators.dropdownFunctions.cloneConfirmationBtn, objName.cloneConfirmationText)
  cy.clickButton(flowsLocators.dropdownFunctions.cloneConfirmationBtn)
}

export function flowCopyPaste(objName) {
  cy.clickButton(flowsLocators.flowGeneralLoc.selectNameFlow, true)
  cy.clickButton(flowsLocators.dropdownFunctions.flowDropDownBtn)
  cy.get(flowsLocators.dropdownFunctions.flowDropDownMenu).contains(objName.flowCopyBtn).click()
  app.assertAPIResponse("@getApp")
  cy.clickButton(flowsLocators.dropdownFunctions.flowDropDownBtn)
  cy.get(flowsLocators.dropdownFunctions.flowDropDownMenu).contains(objName.flowPasteBtn).click()
  app.assertAPIResponse("@getApp")
}

export function addTestLoopStep(objName) {
  cy.get(flowsLocators.flowGeneralLoc.selectNameFlow).contains(objName.flowName).click()
  cy.clickButton(flowsLocators.dropdownFunctions.flowDropDownBtn)
  cy.get(flowsLocators.dropdownFunctions.flowDropDownMenu).contains(objName.addStep).click()
  cy.fillField(flowsLocators.stepsInFlow.addFlowConnectorTab, objName.addConnectorFlowName)
  cy.clickButton(flowsLocators.stepsInFlow.selectLoopConnector)
  cy.fillField(flowsLocators.stepsInFlow.loopVariableField, objName.loopVariableText)
  cy.fillField(flowsLocators.stepsInFlow.loopArrayField, objName.arrayLoopText)
  cy.clickButton(flowsLocators.stepsInFlow.loopTestBtn)
  app.assertAPIResponse("@postPartialTemplate")
  app.assertAPIResponse("@getTemplateActivities")
  cy.assertText(flowsLocators.stepsInFlow.loopAssertion, objName.loopAssetionText)
  cy.clickButton(flowsLocators.stepsInFlow.loopDoneBtn)

}

//	Side Menu Configurations

export function openGeneralSettings() {
  cy.clickButton(flowsLocators.sideMenu)
}

export function addGeneralSeetings(flowObj) {
  addFlowDetails(flowObj)
  cy.fillField(flowsLocators.note, flowObj.note)
  cy.fillField(flowsLocators.tooltip, flowObj.tooltip)
  cy.fillField(flowsLocators.buttonLabel, flowObj.buttonLabel)
  cy.clickButton(flowsLocators.saveBtn, false, 1)
  app.assertAPIResponse("@postPartialTemplate")
  app.assertAPIResponse("@getTemplateActivities")
  cy.assertText(flowsLocators.successMessage, flowObj.successMessage)
}

export function closeGeneralSettings() {
  cy.clickButton(flowsLocators.closeBtn)
}

export function assertFlowDetails(flowObj) {
  const title = flowObj.title + "_" + window.uniqueId
  cy.assertValue(flowsLocators.title, title)
  cy.assertValue(flowsLocators.description, flowObj.description)
}

export function selectFirstFlow() {
  cy.clickButton(flowsLocators.flowGeneralLoc.selectNameFlow, true)
}

export function configureStorage(flowObj) {
  cy.clickButton(flowsLocators.storageFlows.name, 0)
  cy.clickButton(flowsLocators.storageFlows.subName, 0)
  cy.clickButton(flowsLocators.storageFlows.subNameAction, 0)
  cy.clickButton(flowsLocators.storageFlows.nameKey, false, 1)
  cy.clickButton(flowsLocators.storageFlows.subName, false, 1)
  cy.clickButton(flowsLocators.storageFlows.subNameAction, false, 1)
  cy.clickButton(flowsLocators.storageFlows.nameKey, false, 2)
  cy.clickButton(flowsLocators.storageFlows.subName, false, 2)
  cy.clickButton(flowsLocators.storageFlows.subNameAction, false, 1)
  cy.clickButton(flowsLocators.storageFlows.continueBtn, true)
  cy.fillField(flowsLocators.storageFlows.namespaceValue, flowObj.namespaceValueText)
  cy.fillField(flowsLocators.storageFlows.keyValue, flowObj.key)
  cy.fillField(flowsLocators.storageFlows.value, flowObj.valueText)
  cy.clickButton(flowsLocators.storageFlows.storageTestBtn)
  app.assertAPIResponse("@postPartialTemplate")
  app.assertAPIResponse("@getTemplateActivities")
  // cy.assertText(flowsLocators.storageFlows.storageAssertion, flowObj.successMessage)
  cy.clickButton(flowsLocators.storageFlows.storageDoneBtn)
}