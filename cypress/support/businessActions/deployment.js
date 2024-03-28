/*	Business helper functions i.e. app focused
    Each business helper function will internally call technical helper functions to execute desired steps
    Test cases will primarily call these business helper functions
*/

const app = require("./app.js")
let val
//Deployment related functions
import IntegrationLocators from "../../Locators/IntegrationLocators"
import DeploymentLocators from "../../Locators/DeploymentLocators"
import connectorLocators from "../../Locators/DeploymentLocators"
import { getCredsType } from "../commands"

export function goToDeploymentTab() {
    cy.clickButton(DeploymentLocators.navigateToDeploymentScreen.deploymentBtn)
}

export function createDeployment(type) {
    cy.readFile("src/utils/user-creds.json").then((str) => {
        var user = str.username; //Store the username
        const pass = str.password; //Stores the password
        cy.log(user);
        cy.log(pass);

        cy.request({
            url: Cypress.env("base_url") + "/api/bundles/",
            method: "GET",

            auth: {
                username: user,
                password: pass,
                //"THISISTEST123GO!",
            },
            followRedirect: false,
            retryOnStatusCodeFailure: true,
        }).then((resp) => {
            // expect(resp.status).to.eq(200); // verifies the sucess of the API call
            // cy.log(JSON.stringify(resp.body))
            if (JSON.stringify(resp.body) === "[]") {
                cy.clickButton(DeploymentLocators.navigateToDeploymentScreen.createNewBtn, false, 0)
                cy.clickButton(DeploymentLocators.navigateToDeploymentScreen.deploymentType, true, type)
            } else {
                type = type === 1 ? 0 : 1
                cy.clickButton(DeploymentLocators.navigateToDeploymentScreen.createBtn, false, type)
            }
        });
    });
}

export function addingDetails(valueObj) {
    cy.clickButton(DeploymentLocators.addingCard.appCardBtn, false, 0)
    // cy.fixture("UniqueIds").then(ids => {
    //     cy.containsText(DeploymentLocators.fillBasicInfoScreen.connectorAuthDropdown.option, ids.insightlyConnectorId)
    // })
    cy.clickButton(DeploymentLocators.addingCard.sideBar, false, 2)
    cy.isElementVisible(DeploymentLocators.addingCard.searchBar)
    cy.fillField(DeploymentLocators.addingCard.searchBar, valueObj.searchOnline)
    cy.assertValue(DeploymentLocators.addingCard.searchBar, valueObj.searchOnline)
    cy.clickButton(DeploymentLocators.addingCard.addFlow, true, 0)
    app.assertAPIResponse("@UpdateBundles")
    app.assertAPIResponse("@getBundles")
    cy.isElementVisible(DeploymentLocators.addingCard.searchBar)
    cy.fillField(DeploymentLocators.addingCard.searchBar, valueObj.searchFacebook)
    cy.assertValue(DeploymentLocators.addingCard.searchBar, valueObj.searchFacebook)
    cy.clickButton(DeploymentLocators.addingCard.addFlow, true, 0)
    cy.clickButton(DeploymentLocators.addingCard.flowCard, true, 0)
    app.assertAPIResponse("@UpdateBundles")
    cy.get(DeploymentLocators.addingCard.name).clear().type(valueObj.name, { force: true })
    cy.fillField(DeploymentLocators.addingCard.description, valueObj.description)
}

export function fillBasicInfoScreen() {
    cy.isElementVisible(DeploymentLocators.fillBasicInfoScreen.continuenotDisabled)
    cy.isElementVisible(DeploymentLocators.fillBasicInfoScreen.continue2notDisabled)
    cy.fixture(getCredsType()).then(creds => {
        // cy.selectFromDropdown(DeploymentLocators.fillBasicInfoScreen.connectorAuthDropdown, ids.insightlyConnectorId)
        cy.get(DeploymentLocators.fillBasicInfoScreen.connectorAuthDropdown.menu)
            .click()
        cy.containsText(DeploymentLocators.fillBasicInfoScreen.connectorAuthDropdown.option, creds.userid)
        cy.get(DeploymentLocators.fillBasicInfoScreen.connectorAuthDropdown.option)
            .contains(creds.userid)
            .click();
        cy.clickButton(DeploymentLocators.fillBasicInfoScreen.continueAssertText)
    })
}

export function fillMarketPlaceAppearnceScreen(valueObj) {
    cy.fillField(DeploymentLocators.fillMarketPlaceAppearnceScreen.title, valueObj.title)
    cy.fillField(DeploymentLocators.fillMarketPlaceAppearnceScreen.description, valueObj.description)
    cy.clickButton(DeploymentLocators.fillMarketPlaceAppearnceScreen.continueBtnForce, true)
}

export function selectColorForMarketPlaceLogo(valueObj) {
    cy.fillField(DeploymentLocators.selectColorForMarketPlaceLogo.colorBox, valueObj.colorBox)
    cy.clickButton(DeploymentLocators.selectColorForMarketPlaceLogo.continueBtnForce, true)
    cy.clickButton(DeploymentLocators.selectColorForMarketPlaceLogo.continueBtnForce, true)
}

export function fillCTA_BarInfo(valueObj) {
    cy.fillField(DeploymentLocators.fillCTA_BarInfo.actionTitleTextBox, valueObj.actionTitleTextBox)
    cy.fillField(DeploymentLocators.fillCTA_BarInfo.actionDescriptionTextBox, valueObj.actionDescriptionTextBox)
    cy.clickButton(DeploymentLocators.selectColorForMarketPlaceLogo.continueBtnForce, true)
}

export function fillSocailMediaLinks(valueObj) {
    cy.get('button.btn-continue').click({ force: true })
    app.assertAPIResponse('@UpdateBundles')
    cy.get('button.btn-continue:contains(Visit Marketplace)').invoke('removeAttr', 'target').click({ force: true })
    app.assertAPIResponse('@UpdateBundles')
    cy.assertText('h1.page-heading', valueObj.pageTitle)
}

export function selectFirstMP() {
    cy.clickButton(DeploymentLocators.marketPlace.selectMp)
    // cy.fixture("UniqueIds").then(ids => {
    //     cy.get('h3.directory-name').trigger('mouseover')
    // })
}

export function previewMode(valueObj) {
    cy.get(DeploymentLocators.marketPlace.priviewLink).invoke('removeAttr', 'target').click()
    cy.assertText('h1.page-heading', valueObj.pageTitle)
}
export function noneSigninMarketplace(valueObj) {
    cy.get(DeploymentLocators.marketPlace.topMenuBar).should('not.have.text', valueObj.signInText)
}
export function loginOfMp(reqObj) {
    cy.get(IntegrationLocators.navigateToMarketPlaceScreen.flowTopBarBtn).eq(0).click()
    cy.saveWindow(IntegrationLocators.navigateToMarketPlaceScreen.flowTopBarBtn)
    cy.detectWindow()
    cy.fillField(IntegrationLocators.Integration.authName, reqObj.authname)
    cy.fillField(IntegrationLocators.Integration.authBaseUrl, reqObj.baseUrl)
    cy.fillField(IntegrationLocators.Integration.authApi, reqObj.apiKey)
    cy.clickButton(IntegrationLocators.Integration.proceedBtn)
    cy.loadWindow()
    cy.assertText(IntegrationLocators.Integration.signoutBtn, reqObj.signoutAssertion)
    cy.assertText(IntegrationLocators.Integration.signedin, reqObj.signedinText)
    cy.get(IntegrationLocators.Integration.readyBtn).should('be.visible', "I'm ready!")
    cy.assertText(IntegrationLocators.Integration.signoutBtn, reqObj.signoutAssertion)
    cy.isElementVisible(IntegrationLocators.Integration.readyBtn)
    cy.clickButton(IntegrationLocators.Integration.readyBtn)
}

export function configureFlowForIntegration(reqObj) {
    // cy.clickButton(IntegrationLocators.Integration.setupBtn)
    cy.get(IntegrationLocators.Integration.appName)
        .contains("Insightly Flow")
        .parents(IntegrationLocators.Integration.appCard)
        .find(IntegrationLocators.Integration.setupBtn)
        .click()

    cy.assertText(IntegrationLocators.Integration.nextBtn, reqObj.nextBtnText)
    cy.get(IntegrationLocators.Integration.mapFirstValue).select(0)
    cy.get(IntegrationLocators.Integration.mapSecondValue).select(0)
    cy.clickButton(IntegrationLocators.Integration.nextBtn)
    cy.assertText(IntegrationLocators.Integration.saveBtn, reqObj.saveBtnText)
    cy.clickButton(IntegrationLocators.Integration.saveBtn)
    cy.assertText(IntegrationLocators.Integration.fLowsText, reqObj.flowsTextAssertion)
}

export function verifyGGMyFlowIntegrationData(reqObj) {
    cy.get(IntegrationLocators.flows.myFlowTitle).should("contain", reqObj.flowsTextAssertion)
    cy.get(IntegrationLocators.flows.statusHeader).should("contain", reqObj.headerStatus)
    cy.get(IntegrationLocators.flows.runsHeader).should("contain", reqObj.headerRuns)
    cy.get(IntegrationLocators.flows.lastActivityHeader).should("contain", reqObj.headerLastActivity)
    cy.get(IntegrationLocators.flows.activeHeader).should("contain", reqObj.headerActive)

    cy.get(IntegrationLocators.flows.lastActivity).eq(0)
        .should("contain", reqObj.lastActivityTime)
    cy.get(IntegrationLocators.flows.createdFlow).eq(0)
        .should("contain", reqObj.integrationName)
    cy.get(IntegrationLocators.flows.runs).eq(0)
        .should("contain", reqObj.noOfRuns)

    cy.get(IntegrationLocators.flows.createdFlow).eq(0)
        .parents(IntegrationLocators.flows.flowRows)
        // .find(IntegrationLocators.flows.toggle)
        .find(IntegrationLocators.flows.color)
        .should('have.css', 'background-color')
        .and('eq', reqObj.enabledToggleColor)
}
export function editIntegrationName(reqObj) {
    cy.get(IntegrationLocators.flows.createdFlow).eq(0)
        .trigger('mouseover')
        .parents(IntegrationLocators.flows.flowRows)
        .find(IntegrationLocators.flows.editIcon)
        .click({ force: true })
    cy.get(IntegrationLocators.flows.editName).eq(0)
        .type(reqObj.editedName + '{enter}')
    app.assertAPIResponse("@updateIntName", 200)
}

export function applySortings(reqObj) {
    cy.get(IntegrationLocators.flows.sortFilter).click({ force: true })
    cy.get(IntegrationLocators.flows.sortZtoA).click({ force: true })
    app.assertAPIResponse("@sortOnMyFlows", 200)
    cy.get(IntegrationLocators.flows.flowNames).eq(0)
        .should('not.have.value', reqObj.updatedIntegrationName)

    cy.get(IntegrationLocators.flows.sortFilter).click({ force: true })
    cy.get(IntegrationLocators.flows.sortByApp).click({ force: true })
    app.assertAPIResponse("@sortOnMyFlows", 200)
    cy.get(IntegrationLocators.flows.flowNames).eq(0)
        .should('have.value', reqObj.updatedIntegrationName)
    /* cy.get(IntegrationLocators.flows.flowNames).eq(2)
        .should('have.value', reqObj.updatedIntegrationName) */

    cy.get(IntegrationLocators.flows.sortFilter).click({ force: true })
    cy.get(IntegrationLocators.flows.sortAtoZ).click({ force: true })
    app.assertAPIResponse("@sortOnMyFlows", 200)
    cy.get(IntegrationLocators.flows.flowNames).eq(0)
        .should('have.value', reqObj.updatedIntegrationName)

    cy.get(IntegrationLocators.flows.sortFilter).click({ force: true })
    cy.get(IntegrationLocators.flows.sortByDate).click({ force: true })
    app.assertAPIResponse("@defaultSort", 200)
}

export function applyFilters() {
    cy.get(IntegrationLocators.flows.filterIcon).click({ force: true })
    cy.get(IntegrationLocators.flows.appFilterDropdown).click({ force: true })
    cy.get(IntegrationLocators.flows.appfilter).click({ force: true })
    cy.get(":nth-child(4) > .checkmark").click({ force: true })
    cy.get(IntegrationLocators.flows.applyFilterButton).dblclick({ force: true })
    app.assertAPIResponse("@applyFilters", 200)
    cy.get(IntegrationLocators.flows.filterPill1).should("contain", 'HubSpot')
    cy.get(IntegrationLocators.flows.filterPill2).should("contain", 'guided')
    cy.get(IntegrationLocators.flows.flowNames).should("have.length", 1) // To avoid flakiness
    cy.get(IntegrationLocators.flows.flowNames).eq(0)
        .should('have.value', 'HubSpot')
    cy.get(IntegrationLocators.flows.resetAppFilter).click({ force: true })
}

export function configureGGFlowForIntegration(reqObj) {
    cy.get(IntegrationLocators.Integration.appName)
        .contains("Google Sheets")
        .parents(IntegrationLocators.Integration.appCard)
        .find(IntegrationLocators.Integration.setupBtn)
        .click()
    cy.isElementVisible(IntegrationLocators.Integration.useFlowBtn)
    cy.clickButton(IntegrationLocators.Integration.useFlowBtn)

    cy.assertText(IntegrationLocators.Integration.stepNumber, "Step 1 / 4")

    cy.clickSpecificButton("Muhammad Abdullah Shahzad", IntegrationLocators.gSheetsIntegration.connectedAccounts)
    cy.isElementVisible(IntegrationLocators.gSheetsIntegration.accountConnectionSuccess)
    cy.clickButton(IntegrationLocators.Integration.nextBtn)
    cy.assertText(IntegrationLocators.Integration.stepNumber, "Step 2 / 4")

    cy.get(IntegrationLocators.Integration.dotsLoader).should("not.exist")
    cy.selectFromDropdown(IntegrationLocators.gSheetsIntegration.dropdown, "GrowthGenius")
    cy.get(IntegrationLocators.gSheetsIntegration.dropdown.menu).should("have.length", 2)
    cy.get(IntegrationLocators.Integration.dotsLoader).should("not.exist")
    cy.selectFromDropdown(IntegrationLocators.gSheetsIntegration.dropdown, "Sheet1", 1)
    cy.clickButton(IntegrationLocators.Integration.nextBtn)

    cy.assertText(IntegrationLocators.Integration.stepNumber, "Step 3 / 4")
    cy.get(IntegrationLocators.Integration.dotsLoader).should("not.exist")
    cy.selectFromDropdown(IntegrationLocators.gSheetsIntegration.dropdown, "Available", 0)
    cy.selectFromDropdown(IntegrationLocators.gSheetsIntegration.dropdown, "Verify Email Test", 1)
    cy.selectFromDropdown(IntegrationLocators.gSheetsIntegration.dropdown, "test 333 email", 2)

    cy.get(IntegrationLocators.gSheetsIntegration.fieldName).each((element, index, list) => {
        let field = element.text()
        cy.wrap(element).parent().within(() => {
            cy.get("select").select("row_v1.columns." + field)
        })
    })

    cy.clickButton(IntegrationLocators.Integration.nextBtn)
    cy.assertText(IntegrationLocators.Integration.stepNumber, "Step 4 / 4")

    cy.clickButton(IntegrationLocators.Integration.nextBtn)

    app.assertAPIResponse("@createFlow", 201)

}




export function deleteFlow(flow) {
    cy.get(IntegrationLocators.flows.createdFlow + ":contains(" + flow + ")").eq(0)
        .parents(IntegrationLocators.flows.flowRows)
        .find(IntegrationLocators.flows.dotsDrowdown)
        // .focus()
        .click({ force: true })

    cy.get(IntegrationLocators.flows.createdFlow + ":contains(" + flow + ")").eq(0)
        .parents(IntegrationLocators.flows.flowRows)
        // .find(IntegrationLocators.flows.dotsDrowdown)
        .contains("Delete")
        .click()

    cy.clickButton(IntegrationLocators.flows.confirmDeleteBtn)
    app.assertAPIResponse("@deleteFlow", 204)
}

export function setupInsightlyFLowForIntegration() {
    cy.fixture("UniqueIds").then(ids => {
        cy.get(IntegrationLocators.Integration.appName)
            .contains(ids.insightlyFlowId)
            .parents(IntegrationLocators.Integration.appCard)
            .find(IntegrationLocators.Integration.setupBtn)
            .click()
    })

}

export function addInsightlyCredentials(reqObj) {
    cy.saveWindow('button.integry-container__button--secondary')
    cy.detectWindow()
    // cy.isElementVisible(connectorLocators.authName)
    cy.fillField(DeploymentLocators.authName, reqObj.authName)
    cy.fillField(DeploymentLocators.authUrl, reqObj.baseUrl)
    cy.fillField(DeploymentLocators.authApiKey, reqObj.apiKey)
    cy.clickButton(DeploymentLocators.proceedBtn)
    cy.loadWindow()
}

export function integrationConfigtaion(valueObj) {
    cy.clickButton(IntegrationLocators.Integration.nextBtn)
    cy.get(IntegrationLocators.Integration.mapFirstValue).select(0)
    cy.get(IntegrationLocators.Integration.mapSecondValue).select(0)
    // cy.get(IntegrationLocators.Integration.mapThirdValue).select(0)
    cy.clickButton(IntegrationLocators.Integration.nextBtn)
    // cy.assertText(IntegrationLocators.Integration.saveBtn, reqObj.saveBtnText)
    cy.clickButton(IntegrationLocators.Integration.saveBtn)
    cy.get(IntegrationLocators.Integration.slider).trigger('mouseover')
    cy.assertText(IntegrationLocators.Integration.sliderHover, 'Disabled')
    cy.get(IntegrationLocators.Integration.statusIcon).trigger('mouseover')
    cy.assertText(IntegrationLocators.Integration.statusHover, valueObj.statusIntegrationAssertion, 1)
}

