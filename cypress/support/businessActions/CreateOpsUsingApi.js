/// <reference types="Cypress" />
const Flows_data = require("../../fixtures/Flows_data.json")
const Connectors_data = require("../../fixtures/Connectors_data.json")

export function createContactInInsightly() {
    Flows_data.createContactInInsightly.FIRST_NAME = Flows_data.createContactInInsightly.FIRST_NAME + window.uniqueId
    cy.request({
        method: "POST",
        url: "https://api.na1.insightly.com/v3.1/Contacts",
        auth: {
            user: Connectors_data.fillAuthInfo.apiKey,
            pass: Connectors_data.fillAuthInfo.baseUrl
        },
        headers: {
            Connection: "keep-alive",
            Accept: "application/json, text/plain, */*",
            // Authorization: "Bearer " + token,
            Origin: "https://api.na1.insightly.com"
        },
        body: Flows_data.createContactInInsightly,
    }).then((response) => {
        expect(response.status).equal(200);
        // cy.log(JSON.stringify(response))
    });
}

Cypress.Commands.add("createAppUsingApi", (appData, endpoints, openApp, createAuth, activities) => {
    appData.app_name = appData.app_name + window.uniqueId
    cy.getCookie('csrftoken').then(csrftoken => {
        return cy.request({
            url: Cypress.env("base_url") + "/app/",
            method: "POST",
            headers: {
                "X-CSRFToken": csrftoken.value
            },
            body: appData
        }).then((resp) => {
            expect(resp.status).to.eq(200); // verifies the success of the API call
            cy.log(JSON.stringify(resp.body))

            window.appId = resp.body.id
            window.baseUrlId = resp.body.base_urls[0].id
            // if (endpoints) {
            //     cy.request({
            //         url: Cypress.env("base_url") + "/api/endpoint/types/",
            //         method: "GET",
            //         headers: {
            //             "X-CSRFToken": csrftoken.value
            //         },
            //     }).then((endpointTypesResponse) => {
            //         expect(endpointTypesResponse.status).to.eq(200); // verifies the success of the API call
            //         cy.log(JSON.stringify(endpointTypesResponse.body))
            //         for (let ep in endpoints) {
            //             cy.createEndpointUsingApi(endpoints[ep], resp.body.id, resp.body.base_urls[0].id, endpointTypesResponse, createAuth, activities)
            //         }
            //     })

            // }
            return resp.body.id
        });
    })
})

Cypress.Commands.add("createEndpointUsingApi", (endpointData, appId, baseUrlId, endpointTypesResponse, createAuth, activities) => {
    endpointData.app_id = appId
    endpointData.base_url_id = baseUrlId
    cy.log(JSON.stringify(endpointData))
    console.log(JSON.stringify(endpointTypesResponse.body))
    endpointData.endpoint_type = getEndpointType(endpointTypesResponse.body, endpointData.endpoint_name)
    cy.getCookie('csrftoken').then(csrftoken => {
        cy.request({
            url: Cypress.env("base_url") + "/api/endpoints/",
            method: "POST",
            headers: {
                "X-CSRFToken": csrftoken.value,
            },
            followRedirect: false,
            body: endpointData
        }).then((resp) => {
            expect(resp.status).to.eq(200); // verifies the success of the API call
            cy.log(JSON.stringify(resp.body))
            window.endpointId = resp.body.id
            // Create Auth and connect account only if given and the endpoint is "User Info endpoint" 
            if (createAuth) {
                if (endpointData.endpoint_name === "User Info endpoint") {
                    cy.createAuthUsingApi(createAuth, appId, resp.body.id)
                }
                // else {
                //     if (activities) {
                //         for (let act in activities) {
                //             cy.createActivityUsingApi(window.authTypeId, appId, resp.body.id, activities[act])
                //         }
                //     }
                // }
            }
        });
    });
})

Cypress.Commands.add("createAuthUsingApi", (createAuth, appId, endpointId) => {
    cy.getCookie('csrftoken').then(csrftoken => {

        createAuth.app = appId
        createAuth.userinfo_uri_endpoint = endpointId
        createAuth.userinfo_uri_endpoint_v2 = endpointId
        cy.request({
            url: Cypress.env("base_url") + "/api/authorization_types/",
            method: "POST",
            headers: {
                "X-CSRFToken": csrftoken.value,
            },
            followRedirect: false,
            body: createAuth
        }).then((resp) => {
            expect(resp.status).to.eq(200); // verifies the success of the API call
            cy.log(JSON.stringify(resp.body))
            window.authTypeId = resp.body[0].pk
            window.accountId = resp.body[0].fields.account
        });
    });
})

Cypress.Commands.add("createActivityUsingApi", (authTypeId, appId, endpointId, activity) => {
    activity.app = appId
    if (activity.type === "TRIGGER") {
        activity.polling_endpoint_ref = endpointId
    } else {
        activity.endpoint_ref = endpointId
    }
    activity.authorization_type = authTypeId
    cy.log(JSON.stringify(activity))
    if (authTypeId) {
        cy.getCookie('csrftoken').then(csrftoken => {
            cy.request({
                url: Cypress.env("base_url") + "/api/activities/",
                method: "POST",
                headers: {
                    "X-CSRFToken": csrftoken.value,
                },
                followRedirect: false,
                body: activity
            }).then((resp) => {
                expect(resp.status).to.eq(200); // verifies the success of the API call
                cy.log(JSON.stringify(resp.body))
                window.activityId = resp.body.id
            });
        });
    } else {
        cy.createAuthUsingApi(createAuth, appId, endpointId)
        cy.createActivityUsingApi(authTypeId, appId, endpointId, activity)
    }
})

export function getEndpointType(endpointTypes, endpoint_name) {
    let id
    if (Cypress.config().baseUrl.includes("app") || Cypress.config().baseUrl.includes("3006")) {
        id = 140
    }
    else {
        id = 454
    }
    for (let et in endpointTypes) {
        if (endpoint_name.includes(endpointTypes[et].name)) {
            id = endpointTypes[et].id
        }
    }

    return id
}


