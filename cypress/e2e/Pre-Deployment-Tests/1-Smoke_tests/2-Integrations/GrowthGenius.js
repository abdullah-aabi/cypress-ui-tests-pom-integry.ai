/// <reference types="Cypress" />

const data = require("../../../../fixtures/Integration_data.json")
const deployment = require("../../../../support/businessActions/deployment")

let appUrl

describe.skip('Growth Genius', () => { // Yasir: we have disabled their login + marketplace as per request from Wahaj.
    if (Cypress.config().baseUrl.includes("app") || Cypress.config().baseUrl.includes("3006")) {

        it('GG Marketplace and Integration tests', { baseUrl: "https://growthgenius.integry.io" }, () => {
            cy.setCookie("x_integry_app_directory", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfa2V5IjoiZDliOTRkMTctYjE4NS00ZDEzLWJlZmUtNmQ1NzJhM2RhNDBjIiwidXNlcl9pZCI6MSwiaGFzaCI6IjM2OTRlNWE0Y2FiNmQyNzExMzIyZjc5MWZmNjY5YmM0MmQ5NzViMDUzMTQzNmFlMmY4NTBiMzEwZTcyOTY0NDIiLCJhcGlfa2V5IjoiZDE0ZDUyZDMtOTIxMS00OWU0LTkzNTAtNmRhZWQ5ZTJlMTRiIiwidXNlcl9uYW1lIjoiT2theSBTZW5pb3IiLCJ1c2VyX3Byb2ZpbGVfcGljIjoiIiwibG9naW5fdHlwZSI6IlNTTyJ9.LKqpMnI3xM0yHWZC6CwFcOzl12qx-Q4uliD8EdvwpWc")
            cy.setCookie("PHPSESSID", "f1515de52c170d892e3efd712048085e")

            cy.intercept("POST", "/v2/integration/*").as("createFlow")
            cy.intercept("DELETE", "/setup/template/**").as("deleteFlow")
            cy.intercept(
                "GET",
                "/update_integration?type=integration&id=*")
                .as("updateIntName");
            cy.intercept(
                "GET", "/search_integrations?sort*")
                .as("sortOnMyFlows")
            cy.intercept(
                "GET", "/search_integrations")
                .as("defaultSort")
            cy.intercept(
                "GET",
                '/search_integrations?integration_type=guided&branding_apps=*'
            ).as('applyFilters')

            cy.visit("/")
            /* TODO: Handle login Scenario
            cy.get(".btn-outline-light:nth-child(2)").click();
    
            const OauthObject = {
                "account": {
                    "authType": "OAuth2",
                    "username": "dev@growthgenius.com",
                    "password": "pass",
                    "logInBtnText": "Log in",
                    "allowBtnText": "Allow"
                }
            }
    
            // cy.fillField('.margin-top-20', OauthObject.account.username)
            // cy.fillField('[type="password"]', OauthObject.account.password)
            // cy.clickButton('.shadow-heavy')
            // cy.assertText("#top-menu-bar a:nth-child(3)", "Sign out")
            cy.get('[placeholder="Email"]').clear().type(OauthObject.account.username)
            cy.get('[type="password"]').clear().type(OauthObject.account.password)
            cy.get('.shadow-heavy').click()
            cy.get("#top-menu-bar a:nth-child(3)").should("contain", "Sign out")
            // */

            deployment.configureGGFlowForIntegration(data.MarketPlaceIntegration)
            deployment.verifyGGMyFlowIntegrationData(data.MarketPlaceIntegration)
            deployment.editIntegrationName(data.MarketPlaceIntegration)
            deployment.applySortings(data.MarketPlaceIntegration)
            deployment.applyFilters()
            deployment.deleteFlow("Google Sheets")
        })
    }
})