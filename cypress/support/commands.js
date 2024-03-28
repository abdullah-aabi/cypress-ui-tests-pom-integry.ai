/// <reference types="Cypress" />
import "cypress-mailosaur"
const commonLocators = require("../Locators/commonLocators")
const SignInLocators = require("../Locators/SignInLocators")
import SignUpLocators from "../Locators/SignUpLocators.js"
import FlowsLocators from "../Locators/FlowsLocators"
import DeploymentLocators from "../Locators/DeploymentLocators"
import IntegrationLocators from "../Locators/IntegrationLocators"
import ConnectorsLocators from "../Locators/ConnectorsLocators"
import { assertAPIResponse } from "./businessActions/app.js"
// const ConnectorsLocators = require("../Locators/ConnectorsLocators.json")
// const DeploymentLocators = require("../Locators/DeploymentLocators.json")
// const FlowsLocators = require("../Locators/FlowsLocators.json")

let LOCAL_STORAGE_MEMORY = {};

const modifierKey = Cypress.platform === "darwin" ? "meta" : "ctrl";

// Below github uuid is unique during execution globally and use it for all user, team, templates, checklist, inventory etc operations.
window.uniqueId = generateUUID();

export function getCredsType() {
  if (Cypress.config().baseUrl.includes("app") || Cypress.config().baseUrl.includes("3006")) {
    return "creds-prod"
  } else {
    return "creds-stage"
  }
}

function getLocators(fieldsType) {
  switch (fieldsType) {
    case "Connectors":
      return ConnectorsLocators;
    case "Deployment":
      return DeploymentLocators;
    case "Flows":
      return FlowsLocators;
    case "SignUp":
      return SignUpLocators;
    case "SignIn":
      return SignInLocators;
    case "Integration":
      return IntegrationLocators;
    default:
      return commonLocators;
  }
}

/* ------------------------------- Technical helper functions ------------------------------- */

/*
    All technical helper functions goes here. These are tool/framework focused e.g.

    clickButton()
    assertTextContent()
    assertElementValueOnChange()
    selectDropdown()
    ...
*/

Cypress.Commands.add("clickButton", (selector, isForced, index) => {
  index = index || 0;
  if (isForced) cy.get(selector).eq(index).click({ force: true });
  else cy.get(selector).eq(index).click();
});

Cypress.Commands.add("clickSpecificButton", (label, selector, index) => {
  index = index || 0;
  const regex = new RegExp(`^${label}$`);
  if (selector) cy.get(selector).contains(regex).eq(index).click();
  else cy.contains(regex).click();
});

Cypress.Commands.add("fillField", (selector, text, isUnique, index) => {
  index = index || 0;
  if (isUnique) {
    const uniqueText = text + "_" + window.uniqueId;
    cy.get(selector).eq(index).clear().type(uniqueText);
  } else
    cy.get(selector).eq(index).clear().type(text, { parseSpecialCharSequences: false });
});

Cypress.Commands.add("fillJson", (selector, jsonArray) => {
  cy.get(selector).clear({ force: true }).focus();
  for (let line in jsonArray) {
    cy.get(selector).type(jsonArray[line], {
      parseSpecialCharSequences: false,
    });
    cy.get(selector).type("{enter}");
  }
});

Cypress.Commands.add("fillCode", (selector, code) => {
  cy.get(selector).clear({ force: true }).focus();
  for (let line in code) {
    cy.get(selector).type(code[line], {
      force: true,
      parseSpecialCharSequences: false,
    });
    cy.get(selector).type("{enter}", { force: true });
  }
  cy.get(selector).type("{del}", { force: true });
  cy.get(selector).type("{del}", { force: true });
  cy.get(selector).type("{del}", { force: true });
});

Cypress.Commands.add("selectFromDropdown", (selector, option, index) => {
  index = index || 0;
  cy.get(selector.menu)
    .eq(index)
    .click()
    .parent()
    .find(selector.option)
    .contains(option)
    .click();
});

Cypress.Commands.add("isElementVisible", (selector, index) => {
  index = index || 0;
  cy.get(selector).eq(index).should("be.visible");
});

Cypress.Commands.add("assertText", (selector, text, index, isUnique) => {
  index = index || 0;
  if (isUnique) {
    const uniqueText = text + "_" + window.uniqueId;
    cy.get(selector).eq(index).should("have.value", uniqueText);
  } else
    cy.get(selector).eq(index).should("have.text", text);
});

Cypress.Commands.add("assertValue", (selector, text, index, isUnique) => {
  index = index || 0;
  if (isUnique) {
    const uniqueText = text + "_" + window.uniqueId;
    cy.get(selector).eq(index).should("have.value", uniqueText);
  } else
    cy.get(selector).eq(index).should("have.value", text);

});

Cypress.Commands.add("assertAttribute", (selector, text, attrib, index) => {
  index = index || 0;
  cy.get(selector).eq(index).should("have.attr", attrib, text);
});

Cypress.Commands.add("containsText", (selector, text) => {
  cy.get(selector).should("be.visible").and("contain", text);
});

Cypress.Commands.add("assertPageUrl", (route) => {
  cy.url().should("include", route);
});

/* --------------------------------------------------------------------------------------------- */

Cypress.Commands.add(
  "performOperation",
  (locatorObject, fixtureObect, fieldsType) => {
    let locators = getLocators(fieldsType);
    let Locs = locators[locatorObject];
    cy.fixture(fieldsType + "_data").then((returnedData) => {
      let data = returnedData[fixtureObect];
      for (let loc in Locs) {
        if (loc.includes("Check")) {
          cy.get(Locs[loc]).check().should("be.checked");
        } else if (loc.includes("Dropdown")) {
          cy.get(Locs[loc]["dropdown"])
            .click()
            .parent()
            .find(Locs[loc]["options"])
            .contains(data[loc])
            .click();
        } else if (loc.includes("TextButton")) {
          if (loc.includes("Force")) {
            if (loc.includes("Exact")) {
              cy.get(Locs[loc]).each((ele) => {
                if (ele.text() == data[loc]) {
                  cy.wrap(ele).click({ force: true });
                }
              });
            } else {
              cy.get(Locs[loc] + ":contains(" + data[loc] + ")").click({
                force: true,
              });
            }
          } else {
            if (loc.includes("Exact")) {
              cy.get(Locs[loc]).each((ele) => {
                if (ele.text() == data[loc]) {
                  cy.wrap(ele).click();
                }
              });
            } else {
              cy.get(Locs[loc] + ":contains(" + data[loc] + ")").click();
            }
          }
        } else if (loc.includes("ImageHolder")) {
          cy.get(Locs[loc]).attachFile(data[loc]);
        } else if (loc.includes("FileHolder")) {
          cy.get(Locs[loc]).attachFile(data[loc]);
        } else if (loc.includes("MultipleClicks")) {
          for (let itemName in data[loc]) {
            cy.get(Locs[loc]).type(data[loc][itemName]);
            cy.get(locators["searchedItem"])
              .contains(data[loc][itemName])
              .click();
          }
        } else if (loc.includes("Btn")) {
          if (loc.includes("Force")) {
            cy.get(Locs[loc]).click({ force: true });
          } else {
            cy.get(Locs[loc]).click();
          }
        } else if (loc.includes("First")) {
          cy.get(Locs[loc]).first().click({ force: true });
        } else if (loc.includes("Last")) {
          cy.get(Locs[loc]).last().click();
        } else if (loc.includes("Radio")) {
          cy.get(Locs[loc]).check(data[loc]);
        } else if (loc.includes("ContainsText")) {
          cy.get(Locs[loc])
            .invoke("text")
            .then((copy) => {
              expect(copy).to.equal(data[loc]);
            });
        } else if (loc.includes("_Unique")) {
          cy.get(Locs[loc]).clear({ force: true });
          if (loc.includes("Name")) {
            cy.get(Locs[loc]).type(getUniqueName(data[loc]));
          } else {
            cy.get(Locs[loc]).type(getUniqueEmail(data[loc]));
          }
        } else if (loc.includes("AssertValue")) {
          cy.get(Locs[loc]).should("have.value", data[loc]);
        } else if (loc.includes("Msg") || loc.includes("AssertText")) {
          // firstNameMsg (loc) : "sdafads"
          cy.get(Locs[loc]).should("have.text", data[loc]); // mandatoryFields[firstNameMsg] = sdafads || mandatoryFields[firstNameMsg]
        } else if (loc.includes("NotInDOM")) {
          cy.get(Locs[loc]).should("not.exist");
        } else if (loc.includes("BeInDOM")) {
          cy.get(Locs[loc]).should("exist");
        } else if (loc.includes("BeVisible")) {
          cy.get(Locs[loc]).should("be.visible");
        } else if (loc.includes("BeDisabled")) {
          cy.get(Locs[loc]).should("be.disabled");
        } else if (loc.includes("notDisabled")) {
          cy.get(Locs[loc]).should("not.be.disabled");
        } else if (loc.includes("notEmpty")) {
          cy.get(Locs[loc]).should("not.be.null");
        } else if (loc.includes("@")) {
          cy.wait(loc).its("response.statusCode").should("eq", Locs[loc]);
        } else if (loc.includes("Txt")) {
          cy.get(Locs[loc]).contains(data[loc]).first().click();
        } else if (loc.includes("clickNth")) {
          cy.get(Locs[loc]).eq(data[loc]).click();
        } else if (loc.includes("SpChar")) {
          cy.get(Locs[loc]).clear();
          cy.get(Locs[loc]).type(data[loc], {
            parseSpecialCharSequences: false,
          });
        } else if (loc.includes("JsonInput")) {
          cy.get(Locs[loc]).clear({ force: true }).focus();
          for (let line in data[loc]) {
            cy.get(Locs[loc]).type(data[loc][line], {
              parseSpecialCharSequences: false,
            });
            cy.get(Locs[loc]).type("{enter}");
          }
        } else {
          cy.get(Locs[loc]).clear();
          cy.get(Locs[loc]).type(data[loc]);
        }
      }
    });
  }
);

export function generateUUID() {
  const uuid = require("uuid");
  const id = uuid.v4();
  return id.split("-")[0].substring(0, 7);
}

export function generateFullUUID() {
  const uuid = require("uuid");
  const id = uuid.v4();
  return id;
}

export function getColor(type) {
  switch (type) {
    case "valid":
      return "rgb(4, 9, 48)";
    case "invalid":
      return "rgb(255, 130, 130)";
    case "validBorder":
      return "rgb(219, 220, 221)";
  }
}

function numToWords(num) {
  var a = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen ",
  ];
  var b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  if ((num = num.toString()).length > 9) return "overflow";
  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
      (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]])
      : "";
  return str.trim();
}

export function getUniqueName(previousName) {
  // theqa13119+User1
  let firstHalf = previousName.split("_")[0];
  let newName = firstHalf + "_" + window.uniqueId; // theqa13119 + "+" + asdj23j
  return newName;
}

export function getUniqueEmail(previousEmail) {
  // theqa13119+User1@gmail.com
  // let firstHalf = previousEmail.split("+")[0]                   // theqa13119
  // let secondHalf = previousEmail.split("@")[1]                      // gmail.com
  let newEmail = window.uniqueId + "@" + Cypress.env("MAILOSAUR_Server_Domain"); // theqa13119 + "+" + 23jkq3jkbf + "@" + gmail.com
  return newEmail;
}

export function getAfterValue(selector, pseudo, property) {
  cy.get(selector)
    .parent()
    .then(($els) => {
      // get Window reference from element
      const win = $els[0].ownerDocument.defaultView;
      // use getComputedStyle to read the pseudo selector
      const after = win.getComputedStyle($els[0], pseudo);
      // read the value of the `content` CSS property
      const contentValue = after.getPropertyValue(property);
      // the returned value will have double quotes around it, but this is correct
      return contentValue;
      // expect(contentValue).to.eq("rgb(229, 57, 53)")
    });
}

let originalWindow = null;
Cypress.Commands.add("detectWindow", () => {
  return new Promise((resolve) => {
    if (window.top.MyAltWindow && window.top.MyAltWindow.close) {
      console.log("window exists already");
      window.top.MyAltWindow.APP_ID = 2; // TODO: make this support n-many
    }
    // window.top.MyAltWindow.APP_ID = 2
    // TODO: make this support n-many

    // letting page enough time to load and set "document.domain = localhost"
    // so we can access it
    setTimeout(() => {
      window.top.MyAltWindow.APP_ID = 2;
      cy.state("document", window.top.MyAltWindow.document);
      cy.state("window", window.top.MyAltWindow);
      resolve();
    }, 5000);
  });
});

Cypress.Commands.add("saveWindow", (locator, interceptor) => {
  if (!originalWindow) {
    originalWindow = cy.state("window");
    originalWindow.APP_ID = 1; // depth 1
  }
  cy.get(locator).click({ force: true });
  // cy.wait(interceptor).its("response.statusCode").should("eq", 200)
});

Cypress.Commands.add("loadWindow", () => {
  return new Promise((resolve) => {
    console.log("switching popup window");
    // switch back to originalWindow
    cy.state("document", originalWindow.document);
    cy.state("window", originalWindow);
    // originalWindow.top.MyAltWindow.blur()
    window.blur();

    cy.state("window").focus();

    resolve();
  });
});

Cypress.Commands.add("closeWindow", () => {
  return new Promise((resolve) => {
    if (window.top.MyAltWindow && window.top.MyAltWindow.close) {
      window.top.MyAltWindow.close(); // close popup
      window.top.MyAltWindow = null;
    }
    if (originalWindow) {
      cy.state("document", originalWindow.document);
      cy.state("window", originalWindow);
    }
    cy.state("window").focus();
    resolve();
  });
});

Cypress.Commands.add("enterUniqueName", (locator, value, index) => {
  index = index || 0;
  cy.get(locator).eq(index).clear();
  cy.get(locator).eq(index).type(getUniqueName(value));
});

Cypress.Commands.add("enterUniqueEmail", (locator, value, index) => {
  index = index || 0;
  cy.get(locator).eq(index).clear();
  cy.get(locator).eq(index).type(getRandomUniqueEmail(value));
});

export function getRandomUniqueEmail(previousEmail) {
  // theqa13119+User1@gmail.com
  let firstHalf = previousEmail.split("+")[0]; // theqa13119
  // let secondHalf = previousEmail.split("@")[1]                      // gmail.com
  let newEmail =
    firstHalf +
    "+" +
    generateUUID() +
    "@" +
    Cypress.env("MAILOSAUR_Server_Domain"); // theqa13119 + "+" + 23jkq3jkbf + "@" + gmail.com
  return newEmail;
}

Cypress.Commands.add("getUniqueName", (locator, value) => {
  cy.get(locator)
    .invoke("text")
    .then((copy) => {
      expect(copy).to.equal(getUniqueName(value));
    });
});

Cypress.Commands.add("getUniqueEmail", (locator, value) => {
  cy.get(locator)
    .invoke("text")
    .then((copy) => {
      expect(copy).to.equal(getUniqueEmail(value));
    });
});

Cypress.Commands.add("elementMultipleClicks", (selector, i) => {
  while (i != 0) {
    cy.get(selector).click({ force: true, multiple: true });
    i = i - 1;
  }
});

Cypress.Commands.add("assertTextErrorMessage", (selector, data) => {
  cy.get(selector["field"])
    .parents(selector["parentElement"])
    .find(selector["errorMessage"])
    .should("have.text", data["errorMessage"]);
});

Cypress.Commands.add("assertBorderError", (selector, type) => {
  cy.get(selector).each((col, index, list) => {
    cy.wrap(col).parent().should("have.css", "border-color", getColor(type));
  });
});

Cypress.Commands.add("assertMandatoryFieldLabelError", (selector, type) => {
  cy.get(selector["mandatorySign"]).each((col, index, list) => {
    cy.wrap(col)
      .parents(selector["parentElement"])
      .find(selector["fieldLabel"])
      .should("have.css", "color", getColor(type));
  });
});

Cypress.Commands.add("enterMultipleInputs", (selector, data) => {
  cy.get(selector).each((col, index, list) => {
    cy.wrap(col).clear();
    cy.wrap(col).type(data + numToWords(index + 1));
  });
});

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add("forceVisit", (url) => {
  cy.window().then((win) => {
    return win.open(url, "_self");
  });
});

Cypress.Commands.add("loginWithApi", (username, password, userid) => {
  cy.closeWindow()
  cy.fixture(getCredsType()).then(creds => {
    if (!(username && password && userid)) {
      username = creds.username
      password = creds.password
      userid = creds.userid
    }
    cy.request({
      method: "POST",
      url: Cypress.env("base_url") + "/accounts/login/",
      form: true,
      headers: {
        'content-type': 'multipart/form-data',
      },
      body: {
        username: username,
        password: password
      },
    }).then((response) => {
      expect(response.status).equal(200);
      cy.log("The user logged in successfully\n" + JSON.stringify(response.headers["set-cookie"]));
    });
  });
});

Cypress.Commands.add("loginWithUI", (username, password, userid) => {
  cy.closeWindow()
  cy.fixture(getCredsType()).then(creds => {
    if (!(username && password && userid)) {
      username = creds.username
      password = creds.password
      userid = creds.userid
    }
    cy.visit("/");
    if (!Cypress.config().baseUrl.includes("Local")) {
      assertAPIResponse("@getAllApps", 403);
      assertAPIResponse("@getApp", 403);
      // Check if the user is on the login page.
      cy.get(SignInLocators.emailField).should("be.visible");

      // Enter credentials and log in.
      cy.get(SignInLocators.emailField).type(username);
      cy.get(SignInLocators.passwordField).type(password);

      cy.get(SignInLocators.submitButton).click();
    }
    cy.isUserLoggedIn(username, password, userid)
    cy.get(SignUpLocators.letsGoButton).should("not.exist");
  });
});

Cypress.Commands.add("isUserLoggedIn", (username, password, userid) => {
  cy.fixture(getCredsType()).then(creds => {
    if (!(username && password && userid)) {
      username = creds.username
      password = creds.password
      userid = creds.userid
    }
    // Verify, the user is logged in successfully.
    cy.get(SignUpLocators.loggedInAccount).should("contain", userid)
    cy.log("Current User", username)
  })
})

Cypress.Commands.add("deleteAccountUsingApi", () => {
  cy.clearCookies({ domain: null });

  cy.readFile("src/utils/user-creds.json").then((str) => {
    var user = str.username; //Store the username
    const pass = str.password; //Stores the password
    cy.log(user);
    cy.log(pass);

    cy.request({
      url: Cypress.env("base_url") + "/api/integry_users/",
      method: "DELETE",

      auth: {
        username: user,
        password: pass,
        //"THISISTEST123GO!",
      },
      followRedirect: false,
      retryOnStatusCodeFailure: true,
    }).then((resp) => {
      expect(resp.status).to.eq(204); // verifies the sucess of the API call
    });
  });
});
Cypress.Commands.add("attachFileImage", (holder, file) => {
  cy.get(holder).attachFile(file);
})

Cypress.Commands.add("openNewUrl", () => {
  // Get window object
  cy.window().then((win) => {
    // Replace window.open(url, target)-function with our own arrow function
    cy.stub(win, "open", (url) => {
      // change window location to be same as the popup url
      window.authUrl = url;
      cy.writeFile("cypress/fixtures/authWindow.json", {
        new: window.authUrl,
      });
    }).as("pop"); // alias it with popup, so we can wait refer it with @popup
  });
});

Cypress.Commands.add("runRoutes", () => {
  cy.intercept(
    "POST",
    Cypress.env("base_url") + "/accounts/internal/create-customer"
  ).as("internalSignup");
  cy.intercept("POST", Cypress.env("base_url") + "/accounts/internal/onboarding/").as("onboardCustomer")
  cy.intercept("GET", Cypress.env("base_url") + "/endpoints/call/*").as(
    "endPoint"
  );
  cy.intercept("PUT", "/api/endpoints/*").as("endPointAuthLocal");
  cy.intercept("GET", Cypress.env("base_url") + "/api/endpoints/*").as(
    "getEndpoints"
  );
  cy.intercept("PUT", Cypress.env("base_url") + "/api/endpoints/*").as(
    "endPointAuth"
  );
  cy.intercept(
    "PUT",
    Cypress.env("base_url") + "/api/authorization_types/*"
  ).as("authTypes");
  cy.intercept("POST", Cypress.env("base_url") + "/auth/verify*").as(
    "verifyConnection"
  );
  cy.intercept("GET", Cypress.env("base_url") + "/auth/redirect?*").as(
    "redirectAuth"
  );
  cy.intercept(
    "POST",
    Cypress.env("base_url") + "/endpoints/template/render"
  ).as("render");
  cy.intercept("GET", Cypress.env("base_url") + "/connected-accounts/*").as(
    "connectedAccounts"
  );
  cy.intercept(
    "GET",
    Cypress.env("base_url") + "/connected-accounts/list_connected_accounts/*"
  ).as("connectedAccountsList");
  cy.intercept("GET", Cypress.env("base_url") + "/api/endpoint/types/").as(
    "endpointTypes"
  );
  cy.intercept("GET", Cypress.env("base_url") + "/events/bulk/*").as(
    "eventsBulk"
  );
  cy.intercept("GET", Cypress.env("base_url") + "/app/").as("getAllApps");
  cy.intercept("GET", Cypress.env("base_url") + "/app/*").as("getApp");
  cy.intercept("GET", Cypress.env("base_url") + "/api/v1/apps/*").as(
    "getOnboardingApps"
  );
  cy.intercept("PUT", Cypress.env("base_url") + "/app/*").as("UpdateApp");
  cy.intercept("GET", Cypress.env("base_url") + "/api/activities/*").as(
    "getActivity"
  );
  cy.intercept("PUT", Cypress.env("base_url") + "/api/activities/*").as(
    "updateActivity"
  );
  cy.intercept("GET", Cypress.env("base_url") + "/api/auth_types/").as(
    "WaitApp"
  );
  cy.intercept("GET", Cypress.env("base_url") + "/api/v2/templates/*").as(
    "getTemplates"
  );
  cy.intercept("PUT", Cypress.env("base_url") + "/api/v2/templates/**").as(
    "updateTemplate"
  );
  cy.intercept(
    "GET",
    Cypress.env("base_url") + "/api/v2/templates/*/template_app_activities/"
  ).as("getTemplateActivities");
  cy.intercept("POST", Cypress.env("base_url") + "/api/v2/templates/").as(
    "postTemplate"
  );
  cy.intercept(
    "POST",
    Cypress.env("base_url") + "/api/v2/templates/*/template_partial_update/*"
  ).as("postPartialTemplate");
  cy.intercept(
    "POST",
    Cypress.env("base_url") + "/endpoints/test/template/**/replace_tags?*"
  ).as("testTemplate");
  cy.intercept("POST", Cypress.env("base_url") + "/endpoints/test/action/*").as(
    "testAction"
  );
  cy.intercept("POST", Cypress.env("base_url") + "/endpoints/test/**").as(
    "testQuery"
  );
  cy.intercept("POST", Cypress.env("base_url") + "/api/files/").as(
    "UploadImage"
  );
  cy.intercept("PUT", Cypress.env("base_url") + "/api/bundles/*").as(
    "UpdateBundles"
  );
  cy.intercept("GET", Cypress.env("base_url") + "/api/bundles/*").as(
    "getBundles"
  );
  cy.intercept("POST", "/i*").as("createDoneDayAuth");
  cy.intercept(
    "GET",
    "https://integrations.tatango.com/edit/?template_id=*"
  ).as("getCustomFlow");
  cy.intercept("POST", "https://login.mailchimp.com/oauth2/authorize-post").as(
    "mailchimpAuthPost"
  );
  cy.intercept(
    "GET",
    "https://login.mailchimp.com/oauth2/confirm-authorization?*"
  ).as("mailchimpConfirmAuth");
  cy.intercept(
    "POST",
    "https://login.mailchimp.com/oauth2/confirm-authorization-post"
  ).as("mailchimpConfirmAuthPost");
  cy.intercept("GET", "https://app.integry.io/api/static_lists/?q=all*").as(
    "GetLists"
  );
  cy.intercept("GET", "https://app.integry.io/api/bundles/").as("GetBundle");
  cy.intercept("GET", "https://app.integry.io/api/activity_fields/?*").as(
    "GetActivities"
  );
  cy.intercept(
    "POST",
    Cypress.env("base_url") + "/endpoints/test/trigger/*"
  ).as("ApiEndpoints");
  cy.intercept(
    "GET",
    Cypress.env("base_url") + "/api/v2/templates/8064/datatree/*"
  ).as("dataTree");
  cy.intercept("POST", "/api/endpoints/").as("createEndpoint")
  cy.intercept("POST", Cypress.env("base_url") + "/app/").as("createApp");

  cy.intercept(
    "GET",
    '/api/v3/templates/18136/integrations/?run_status=completed&status=enabled*'
  ).as('FilterOnAllIntPage');
  cy.intercept(
    "GET",
    '/api/v3/templates/18136/integrations/?*'
  ).as('AllIntegration');
  cy.intercept(
    "GET",
    '/api/v3/templates/18136/integrations/?search=*'
  ).as('IntSearch');
  cy.intercept(
    "PUT",
    '/v2/integration/156900/disable/'
  ).as('IntDisable')
  cy.intercept(
    "PUT",
    '/v2/integration/156900/enable/'
  ).as('IntEnable')
  cy.intercept(
    "GET",
    "/api/v1/templates/" + "*" + "/integrations/" + "*" + "/runs/?*"
  ).as('AllRuns');
  cy.intercept(
    "GET",
    '/api/v1/templates/18136/integrations/156900/runs/?search=*'
  ).as('RunSearch')
  cy.intercept(
    "GET",
    '/api/v1/templates/18136/integrations/156900/runs/?status=completed&network_code=2xx*'
  ).as('FilterOnAllRunsPage')
  cy.intercept(
    "GET",
    '/api/v1/templates/18136/integrations/156900/runs/693ead597d86fb342f8fa4370b3845f67881d6f8/steps/?*'
  ).as('AllSteps')
  cy.intercept(
    "GET",
    '/api/v1/templates/18136/integrations/156900/runs/693ead597d86fb342f8fa4370b3845f67881d6f8/steps/' + '*' + '/payload/'
  ).as('ViewPayload')
  cy.intercept(
    "GET",
    "/v2/integration/" + "*" + "/versions/"
  ).as("PreviewSetup")
  cy.intercept(
    "GET",
    "/verify-sdk-config/?app_key*"
  ).as("sdkConfig")
  cy.intercept(
    "GET",
    "/template_step/" + "*" + "/?app_key=" + "*" + "&version_id=*"
  ).as("VersionChange")

});


