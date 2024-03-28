/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// *********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */


let prodEnv = {
  username: "abdullah@integry.io",
  password: "meAabi13119",
  MAILOSAUR_API_KEY: "Iv0lVpObecKQQzfy",
  MAILOSAUR_Server_ID: "u7sgtfw2",
  MAILOSAUR_Server_Domain: "u7sgtfw2.mailosaur.net",
  base_url: "https://app.integry.io",
  website_url: "https://www.integry.io",
  sign_up_url: "https://app.integry.io/accounts/internal/create-customer",
  auth_id: "54792",
  endpoint_id: "10496",
  endpoint_id2: "11551",
  minTimeout: 2000,
  maxTimeout: 5000
}

let betaEnv = {
  username: "abdullah@integry.io",
  password: "meAabi13119",
  MAILOSAUR_API_KEY: "Iv0lVpObecKQQzfy",
  MAILOSAUR_Server_ID: "u7sgtfw2",
  MAILOSAUR_Server_Domain: "u7sgtfw2.mailosaur.net",
  sign_up_url: "https://beta.integry.io/accounts/internal/create-customer",
  base_url: "https://beta.integry.io",
  website_url: "https://integry-live.webflow.io",
  auth_id: "1557",
  endpoint_id: "4534",
  endpoint_id2: "4534",
  minTimeout: 2000,
  maxTimeout: 5000
}

module.exports = (on, config) => {

  // You can read more here:
  // https://on.cypress.io/browser-launch-api

  // config.env = config.envr === "prod" || config.envr === "prodLocal" ? prodEnv : betaEnv

  // if (config.envr === "beta") {
  //   config.baseUrl = "https://beta.integry.io"
  // } else if (config.envr === "betaLocal") {
  //   config.baseUrl = "http://localhost:8000"
  // } else if (config.envr === "prod") {
  //   config.baseUrl = "https://app.integry.io"
  // } else {
  //   config.baseUrl = "http://localhost:3006"
  // }

  // config.projectId = config.envr === "prod" || config.envr === "prodLocal" ? "wybhw3" : "xpcfzc"

  on('before:browser:launch', (browser = {}, launchOptions) => {

    // the browser width and height we want to get
    // our screenshots and videos will be of that resolution
    const width = 1920
    const height = 1080

    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push(`--window-size=${width},${height}`)

      // force screen to be non-retina and just use given resolution
      launchOptions.args.push('--force-device-scale-factor=1')
    }

    // IMPORTANT: return the updated browser launch options
    return launchOptions
  })

  return config

}