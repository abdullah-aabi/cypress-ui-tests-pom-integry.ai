import { defineConfig } from "cypress";

let prodEnv = {
  username: "<username>",
  password: "<password>",
  MAILOSAUR_API_KEY: "<MAILOSAUR_API_KEY>",
  MAILOSAUR_Server_ID: "<MAILOSAUR_Server_ID>",
  MAILOSAUR_Server_Domain: "<MAILOSAUR_Server_Domain>",
  base_url: "https://app.integry.io",
  website_url: "https://www.integry.io",
  sign_up_url: "https://app.integry.io/accounts/internal/create-customer",
  auth_id: "54792",
  endpoint_id: "10496",
  endpoint_id2: "11551",
  minTimeout: 8000,
  maxTimeout: 12000
}

let betaEnv = {
  username: "<username>",
  password: "<password>",
  MAILOSAUR_API_KEY: "<MAILOSAUR_API_KEY>",
  MAILOSAUR_Server_ID: "<MAILOSAUR_Server_ID>",
  MAILOSAUR_Server_Domain: "<MAILOSAUR_Server_Domain>",
  sign_up_url: "https://beta.integry.io/accounts/internal/create-customer",
  base_url: "https://beta.integry.io",
  website_url: "https://integry-live.webflow.io",
  auth_id: "1557",
  endpoint_id: "4534",
  endpoint_id2: "4534",
  minTimeout: 4000,
  maxTimeout: 12000
}

module.exports = defineConfig({
  e2e: {
    // baseUrl: baseUrl,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      config.env = config.baseUrl.includes("app") || config.baseUrl.includes("3006") ? prodEnv : betaEnv
      console.log(config.baseUrl)

      config.projectId = config.baseUrl.includes("app") || config.baseUrl.includes("3006") ? "wybhw3" : "xpcfzc"

      return require("./cypress/plugins/index.js")(on, config);
    },
    // experimentalSessionAndOrigin: true,
    specPattern: "cypress/e2e/**/*.js",
    excludeSpecPattern: ["*.md"],
    numTestsKeptInMemory: 4,
  },
  defaultCommandTimeout: 60000,
  requestTimeout: 60000,
  pageLoadTimeout: 60000,
  video: true,
  videoUploadOnPasses: false,
  chromeWebSecurity: false,
  viewportHeight: 1080,
  viewportWidth: 1920,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  // env: seletedEnv,
  // projectId: "xpcfzc": "wybhw3",
  reporter: "junit",
  reporterOptions: {
    mochaFile: "cypress/testresults/test-output-[hash].xml",
    toConsole: false,
    attachments: true,
  },
});
