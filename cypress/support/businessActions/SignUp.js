import SignUpLocators from "../../Locators/SignUpLocators"
import data from "../../fixtures/SignUp_data.json"
import { getCredsType, getUniqueEmail } from "../commands"

export function signUpUser() {
    cy.readFile('cypress/fixtures/' + getCredsType() + '.json').then((creds) => {
        cy.log("Current User", creds.username)
        cy.get(SignUpLocators.validFields.firtNameField_Unique).clear().type("test_" + creds.userid)
        cy.get(SignUpLocators.validFields.lastNameField).clear().type(data.validFields.lastNameField)
        cy.get(SignUpLocators.validFields.emailField_Unique).clear().type(creds.username)
        cy.get(SignUpLocators.validFields.passwordField).clear().type(data.validFields.passwordField)
        cy.get(SignUpLocators.validFields.appUrl).clear().type(data.validFields.appUrl)
        cy.get(SignUpLocators.validFields.accountName).clear().type(data.validFields.accountName)
        cy.get(SignUpLocators.validFields.createSampleEntitiesCheck).check().should("be.checked")
        cy.get(SignUpLocators.validFields.submitBtn).click()
        cy.wait("@internalSignup").its("response.statusCode").should("eq", 302)
    })
}

export function getCodeUsingMailosaur(sentToEmail, field) {
    let serverId = Cypress.env("MAILOSAUR_Server_ID")
    cy.mailosaurGetMessage(serverId, {
        sentTo: sentToEmail,
        sentFrom: "no-reply@integry.io"
    }, {
        // Find messages received since Jan 1st 2020. This will be slow!
        timeout: 180000
    }).then(email => {
        const dom = new JSDOM(email.html.body)
        const el = dom.window.document.querySelector("[role='presentation'] tr:nth-child(6) div")
        cy.mailosaurDeleteMessage(email.id)
        cy.get(field).type(el.textContent)
    })
}

export function createUserCredsForLocalMachine() {
    cy.writeFile('cypress/fixtures/' + getCredsType() + '.json', {
        userid: window.uniqueId,
        username: getUniqueEmail(data.validFields.emailField_Unique),
        password: data.validFields.passwordField
    })
}