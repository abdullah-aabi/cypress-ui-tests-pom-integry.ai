/// <reference types="Cypress" />

describe("Post Requisites to be run at the end of all Tests.", () => {

  it("Delete Account After all tests.", () => {
    cy.deleteAccountUsingApi()
  })

})
