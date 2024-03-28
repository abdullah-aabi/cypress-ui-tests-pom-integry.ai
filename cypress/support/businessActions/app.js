/*	Business helper functions i.e. app focused
	Each business helper function will internally call technical helper functions to execute desired steps
	Test cases will primarily call these business helper functions

	App related business action functions
	or general functions which can be used by each test case irrespective of the component or the module
	e.g. login, signUp, etc.

*/

/* 
	signUp()
	login()
	...

*/

export function assertAPIResponse(route, status) {
	status = status || 200
    cy.wait(route).its("response.statusCode").should("eq", status)
}