let connectorNavLink = "a.nav-link:contains(Connectors)";
let createConnectorBtn = ".create-object";
let continueBtn = ".btn-continue";
let testAuthenticationBtn = "div.connected-accounts button";
let toastMessage = ".banner-text";
let proceedBtn = ".btn-primary";
const submitBtn = "[type='submit']";
const baseurl = "#custom_base_url";
const action = "#url_path";
const reqUrl = ".url-generated";
const firstHeaderKey = "#headers\\[0\\]\\.key";
const firstHeaderValue = "#headers\\[0\\]\\.value";
const secHeaderKey = "#headers\\[1\\]\\.key";
const secHeaderValue = "#headers\\[1\\]\\.value";
const authorizationUri = "#authorization_uri";
const authName = "#auth_name";
const url = "#url";
const username = "#username";
const password = "#pass";
const apiKey = "#api_key";
const apiSecret = "#api_secret";
const clientId = "#client_id";
const clientSecret = "#client_secret";
const name = "#name";
const title = "#app_name";
const description = "#app_description";
const pollSuccessMsg = "div.test-status"
const actionSuccessMsg = "div[class*='test-status']"
const createBtn = "a.btn-outline-primary"
export default {
  createBtn: createBtn,
  searchConnectorsField: 'input[placeholder="Search for a connector"]',
  connectorNavLink: connectorNavLink,
  createConnectorBtn: createConnectorBtn,
  sideBar: "#sidebar-nav a.list-group-item",
  connectorType: "div.select-app-type-container a",
  //  basic info
  homepageUrl: "#app_url",
  proceedBtn: ".btn-primary",
  apiKeyAuth: "#apikey",
  linkToUserProfile: "#link_to_user_profile",
  addBaseUrlBtn: "div.form-group button.btn-outline-primary",
  connectorBaseUrlName: "#name_0",
  scopes: "#scopes",
  deleteHeader: "button.btn-sm",
  testAUthBtn: "div.connected-accounts img",
  endpointPage: 'h2.title',
  editRequestTemplate: "p.form-text.d-inline",
  createEndpointBtn: "button.btn-success-dark:contains(Create Endpoint)",
  createAuthorizationBtn: "button.btn-success-dark:contains(Create Authorization)",
  requestTemplate: '#request_template',
  responseTemplate: '#response_template',
  configrations: "textarea.form-control-lg",
  testAuthAssertion: "p.badge-success-dark",
  connectorBaseUrl: "#url_0",
  connectorBaserUrlheader: "#name_1",
  slider: "label.switch span",
  apiThirdheader: "#name_2",
  apiFourthheader: "#name_3",
  appThirdBaseUrl: "#url_2",
  appFourthBaseUrl: "#url_3",
  deleteHeaderBtn: "button.btn-sm",
  connectorSecondUrl: "#url_1",
  connectorApiVersion: "#api_version",
  apiKeyAuthField: "#apikey",
  continueBtn: continueBtn,
  title: title,
  description: description,
  descriptionField: '#desc',
  appLogoImageHolder: "#icon_url",
  actionCheckbox: "[type='checkbox']",
  sendTestCallBtn: "button.button-with-spinner",
  productPage: {
    appScreenshot: "div.screenshot input",
    appCategoryDropdown: {
      menu: "div.categories-select__control",
      option: "div.categories-select__option"
    }
  },
  //  authorizations
  createAuthBtn: "div.app-components-list a",
  authRow: "div.auth-row div.auth-name",
  authStep: "div > div.title",
  authStepName: "div.step-expanded-wrapper > form > div > p.title",
  dropdown: {
    menu: "#type_id",
    option: "div[class*='-menu'] div[class*='-option']",
  },
  grandTypeDropDown: {
    menu: "[id='grant_type']",
    option: "div[class*='-menu'] div[class*='-option']"
  },
  endpointDropdown: {
    menu: "#userinfo_uri_endpoint",
    option: "div[class*='-menu'] div[class*='-option']",
  },
  endpointTypeDropdown: {
    menu: "#id",
    option: "div[class*='-menu'] div[class*='-option']",
  },
  endpointModal: {
    createEndpointBtn: "button.btn-success-dark",
    isPaginationSwitch: "#is_pagination",
    endpointName: "#endpoint_name",
    headerFirstValue: "#value_1",
    header0Value: "#value_0",
    headerFirstkey: '#key_0 div.css-qcupud',
    headerThirdkey: '#key_3 div.css-qcupud',
    addHeaderValue: '#key_0 div:contains(Add "api-key")',
    addHeaderThirdKey: '#key_3 div:contains(Add "partner-key")',
    headerApiValue: "#key_0 div.css-qcupud",
    requestMethodDropdown: {
      menu: "#http_verb",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    baseUrlDropdown: {
      menu: "#base_url_id",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    endpointUrl_path: "#url_path",
    trackingPropertyName: "#tracking_property_name",
    headerzeroValue: "#value_0",
    headerThirdValue: "#value_3",
    addHeaderBtn: "button.btn-outline-primary:contains(Add a header)",
    header0KeyDropdown: {
      menu: "[id='key_0']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    header1KeyDropdown: {
      menu: "[id='key_1']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    headerSecondKeyDropdown: {
      menu: "[id='key_2']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    headerThirdKeyDropdown: {
      menu: "[id='key_3']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    headerFirstValueDropdown: {
      menu: "[id='value_0']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    header1ValueDropdown: {
      menu: "[id='value_1']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    headerSecondValueDropdown: {
      menu: "[id='value_2']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    headerThirdValueDropdown: {
      menu: "[id='value_3']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    totalHeaders: "[id*='value_']",
    createModalEndpointBtn: "div.ReactModalPortal button.btn-success-dark",
    sideBar: '#sidebar-nav',
    endPointName: "p.name",
    sendTestCall: "button.button-with-spinner",
    testEndPointBtn: "button.btn-outline-secondary-dark",
    authTypeDropDown: {
      menu: "[id='auth_id']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    selectAccountDropDown: {
      menu: "[id='account_id']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    rawRequestBodyBtn: "button.btn-link",
    rawRequestBody: "textarea#input_json"
  },
  userInfoEndpointDropdown: {
    menu: "#userinfo_uri_endpoint_v2",
    option: "div[class*='-menu'] div[class*='-option']"
  },
  authVerificationEndpointDropdown: {
    menu: "#userinfo_uri_endpoint",
    option: "div[class*='-menu'] div[class*='-option']"
  },
  baseUrl: baseurl,
  action: action,
  reqUrl: reqUrl,
  firstHeaderKey: firstHeaderKey,
  firstHeaderValue: firstHeaderValue,
  addReqHeaderBtn: "div.add-header-section > p.text",
  secHeaderKey: secHeaderKey,
  secHeaderValue: secHeaderValue,
  json: "#ace-editor .ace_text-input",
  clientId: clientId,
  clientSecret: clientSecret,
  authorizationUri: authorizationUri,
  customizeTokenBtn: "button.customize-url-btn",
  testAuthenticationBtn: testAuthenticationBtn,
  authName: authName,
  apiKey: apiKey,
  authApi: "#apikey",
  testAuthBtn: "button.btn-test-auth",
  apiSecret: apiSecret,
  region: "#region",
  url: url,
  username: username,
  password: password,
  oauth2Password: "#password",
  submitBtn: submitBtn,
  bannerSuccessMsg: toastMessage,
  hover: "div.app-card",
  runBtn: ".run-btn  ",

  //  activities
  activitiesStep: "div.step-info > h2",
  activityType: "div.activity-item > div > p.title",
  createActivityBtn: "div.add-activity a.create-btn",
  fieldType: {
    menu: "label.select-type-label",
    option: "div.select-field",
  },
  name: name,
  titleDescription: "#description",
  placeholder: "#placeholder-text",
  closeBtn: ".close",
  titleText: "span.title-field",
  descText: "span.description-field",
  placeholderValue: ".placeholder-input input",
  addDataSource: "button.btn-data-source",
  endpoint: "#endpoint_name",
  connectionLabel: "label.custom-control-label",
  connectionStatus: "span.account-status-text",
  connectionName: "div.account-name",
  textfieldValue: "div.text-field-container input",
  textareaValue: "div textarea",
  checkbox: "div.checkbox-option",
  radio: "div.radio-option",
  pollRadioBtn: "#radio-in-Poll\\ Based",
  activityStepName: "#endpoint-activity-form p.title",
  emailValue:
    "div.text-field-container input[placeholder='Enter subscriber email']",
  fieldValue2:
    "div.text-field-container input[placeholder='Enter subscriber name']",

  apiResponseAssertText: "div.ace_text-layer",
  navActivitiesTextButton: "a.list-group-item",
  navigateToConnectorScreen: {
    connectorBtn: connectorNavLink,
    "@getAllApps": 200,
  },
  fillBaseUrl: {
    appBaseUrlBeVisible: "#url-1",
    appBaseUrl: "#url-1",
    continueBtn: continueBtn,
    "@UpdateApp": 200,
  },
  fillBasicInfo: {
    titleName_Unique: "#title",
    description: "#desc",
    continueBtn: continueBtn,

    "@UpdateApp": 200,
  },
  appDetailsBtn: ".step-wrapper-collapsed .title",
  createNewBtn: "a.create-btn",
  fillAuthForm: {
    authTypeBtn: ".auth-info-form .single-select__indicators",
    authTypeTextButtonExact: "div.single-select__option",
    continue1Btn: continueBtn,
    "@UpdateApp": 200,
    baseUrl: "#custom_base_url",
  },
  fillAuthFormApi_Url: {
    baseUrl: "#custom_base_url",
    authAction: "#url_path",
    headerKey: "input[id='headers[0].key']",
    headerValue: "input[id='headers[0].value']",
    urlGeneratedAssertText: ".url-generated",
  },
  fillAuthPopupApi_Url: {
    authenticationNameBeVisible: "#auth_name",
    authName: "#auth_name",
    authBaseUrl: "#url",
    authApi: "#apikey",
    proceedBtn: proceedBtn,
    "@UpdateApp": 200,
  },
  fillAuthPopupApi_Key: {
    authenticationApiBeVisible: "#apikey",
    authApi: "#apikey",
    proceedBtn: proceedBtn,
    "@UpdateApp": 200,
  },
  fillAuthPopupBasic: {
    authenticationNameBeVisible: "#auth_name",
    authenticationName: "#auth_name",
    username: "#username",
    password: "#pass",
    proceedBtn: proceedBtn,
    "@UpdateApp": 200,
  },
  authSuccessAssertions: {
    "@endPointAuth": 200,
    bannerSuccessTextMsg: toastMessage,
    continueAssertText: continueBtn,
    continueBtn: continueBtn,
    "@UpdateApp": 200,
  },
  selectAndFillActivityType: {
    activityclickNth: "div.activity-item",
    name: "#name",
    description: "#desc",
    continueBtn: continueBtn,
    "@UpdateApp": 200,
  },
  addFieldToActivity: {
    // Can be use to add all types of field
    addFieldLabelBeVisible: ".select-type-label",
    dropdownBtn: ".select-type-label",
    optionsFirst: "div.option-container",
    title: "#title",
    titleDescription: "textarea#description",
    closeBtn: ".close",
  },
  activityAssertions: {
    continueAssertText: continueBtn,
    continueBtn: continueBtn,
    "@updateActivity": 200,
    "@UpdateApp": 200,
  },
  fillActivityForm: {
    email_Unique: "input[id*=_email]",
    firstName_Unique: "input[id*=name]",
    continueBtn: continueBtn,
    "@UpdateApp": 200,
  },
  jsonEditor: "#ace-editor .ace_text-input",
  jsonInput: {
    payloadJsonInput: ".ace-json-viewer #ace-editor .ace_text-input",
  },
  apiKeySecret: {
    sideBar: '#sidebar-nav',
    endPointName: "p.name",
    sendTestCall: "button.button-with-spinner",
    testEndPointBtn: "button.btn-outline-secondary-dark",
    authTypeDropDown: {
      menu: "[id='auth_id']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    selectAccountDropDown: {
      menu: "[id='account_id']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
  },

  sendApiCall: {

    baseUrl: "#custom_base_url",
    authAction: "#url_path",
    headerKey: "input[id='headers[0].key']",
    headerValue: "input[id='headers[0].value']",
    addHeaderBtn: ".text",
    header2KeyBtn: "input[id='headers[1].key']",
    header2OptionTextButton: ".option-row",
    header2Value: "input[id='headers[1].value']",
    authTestBtn: ".btn-test-auth",
    bannerSuccessTextMsg: toastMessage,
    continueTextButton: continueBtn,
    "@UpdateApp": 200,
    limitLocationDropdown: {
      menu: "#pg_limit_variable_location",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    limitCount: "#pg_limit_variable_name",
    limitValue: "input#pg_default_page_size",
    offset: "#pg_offset_variable_name",
    offsetLocationDropdown: {
      menu: "#pg_offset_variable_location",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    totalItemsLocationDropdown: {
      menu: "#pg_total_items_variable_location",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    totalItems: "#pg_total_items_variable",
    editRequestTemplate: "p.form-text.d-inline",
    requestTemplate: '#request_template',
    paginationSlider: "label.switch span.slider",
    object: 'div.app-detail-form-field-container .single-select__value-container',
    objectDropdown: "div.single-select__menu-list div",
    base_UrlTagBtn: "button.add-tag-button-v3",
    base_UrlTageDropdown: "div.background-handler",
    baseUrl: "#custom_base_url",
    authAction: "#url_path",
    headerKey: "input[id='headers[0].key']",
    headerValue: "input[id='headers[0].value']",
    addHeaderBtn: ".text",
    header2KeyBtn: "input[id='headers[1].key']",
    header2OptionTextButton: ".option-row",
    header2Value: "input[id='headers[1].value']",
    authTestBtn: ".btn-test-auth",
    bannerSuccessTextMsg: toastMessage,
    continueTextButton: continueBtn,
    "@UpdateApp": 200,
  },
  sendQueryApiCall: {
    requestMethodBtn:
      "#http_verb div.single-select__value-container--has-value",
    requestoptionBtn: ".single-select__option",
    baseUrl: "#custom_base_url",
    headerKey: "input[id='headers[0].key']",
    headerValue: "input[id='headers[0].value']",
    paginationBtn: "div.checkbox-field",
    pageLimit: "#pg_limit_variable_name",
    pageSize: "#pg_default_page_size",
    pageOffSet: "#pg_offset_variable_name",
    totalItems: "#pg_total_items_variable",
    advanceSettingBtn: "div.endpoint-form_Pagination_SettingText",
    dynamicPage: "#pg_dynamic_page_size",
    dynamicOffSet: "#pg_dynamic_offset_variable_name",
    nextLink: "#pg_next_link_variable_name",
    itemVariable: "#pg_more_items_variable_name",
    increamentVariable: "#pg_increment_offset_variable_name",
    authBtn: ".btn-test-auth[type='Button']",
    bannerSuccessTextMsg: toastMessage,
    continueTextButton: continueBtn,
    "@UpdateApp": 200,
  },
  connectorSuccess: {
    connectorCompletionSuccessMsg: "div.title-div p.title",
  },
  completeActivity: {
    runBtn: ".run-btn",
    bannerSuccessMsg: toastMessage,
    continueTextButton2: continueBtn,
    "@UpdateApp": 200,
    navActivitiesTextButton: "a.list-group-item",
  },
  addNewAccount: {
    addNewAccountBtn: "button.btn-outline-primary",
    authName: "#auth_name",
    url: "#url",
    apiKey: "#apikey",
    proceedBtn: "button.btn-primary"
  },

  actionPage: {
    "@endPointAuth": 200,
    exitBtn: "p.right-node-text",
    bannerSuccessTextMsg: toastMessage,
    continueBtn: continueBtn,
    activityFirst: ".activity-item",
    sidebar: "div#sidebar-nav a",
    createActionBtn: createBtn,
    actionName: "input#name",
    actionDescription: "#activity_description",
    continue2Btn: continueBtn,
    addFieldLabelBtn: ".select-type-label",
    fieldFirst: ".option-container",
    fieldTitle: "#title",
    addActivityFieldBtn: "button.btn-primary",
    activityField: "div.header",
    activityFieldName: "#title_0",
    activityMachineField: "#machine_name_0",
    secondFieldName: "#title_1",
    secondFieldDescription: "#description_1",
    thirdFieldDescription: "#description_2",
    secondRegressError: "#regex_error_message_1",
    createEndPointBtn: 'button.btn-success-dark:contains(Create Endpoint)',
    saveEndPointBtn: "button.btn-success-dark:contains('Save')",
    testActionBtn: "div.activities-list-row img",
    secondMachineField: "#machine_name_1",
    fieldDiscription: "#description_0",
    regrexErrorValidator: "#regex_error_message_0",
    requiredFieldSlider: "[class='slider round']",
    closeBtn: ".close",
    addFieldLabel2Btn: ".select-type-label",
    field2First: ".option-container",
    field2Title: "#title",
    close2Btn: ".close",
    sendTestCallBtn: "button.btn-primary",
    pollSuccessMsg: pollSuccessMsg,
    actionSuccessMsg: actionSuccessMsg,
    actionField: "[class='form-control form-control-lg']",
    continue3Btn: continueBtn,
    "@updateActivity": 200,
    "@UpdateApp": 200,
    selectAuthorizationsDropDown: {
      menu: "[id='authorization_type']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    accountSelectionDropDown: {
      menu: "[id='integry_test_authorization_id']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    header1KeyDropdown: {
      menu: "[id='key_1']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    header1ValueDropdown: {
      menu: "[id='value_1']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    actionEndpointDropDown: {
      menu: "[id='endpoint_ref']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    inputObjectDropDown: {
      menu: "[id='object_id']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    objectFieldDropDown: {
      menu: "[id='object_field_0']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    outputObjectDropDown: {
      menu: "[id='object_id']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    outputObjectActionDropDown: {
      menu: "[id='endpoint_action']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    secondObjectFieldDropDown: {
      menu: "[id='object_field_1']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    objectActionDropDown: {
      menu: "[id='activity_action']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
  },
  actionEndpoint: {
    endpointName: "#endpoint_name",
    urlEndpoint: "#url_path",
    json: "#request_template span",
    activityFieldSetting: "div.dropdown",
    conditionalFields: "div.conditional-fields-row input",
    thirdFieldName: "#title_2",
    thirdMachineField: "#machine_name_2",

    activityDropdown: "div.dropdown-menu button:contains(Checkbox)",
    apiRequestTypeDropDown: {
      menu: "[id='http_verb']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    baseUrlDropDown: {
      menu: "[id='base_url_id']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
  },
  triggerPage: {
    "@endPointAuth": 200,
    bannerSuccessTextMsg: toastMessage,
    continueBtn: continueBtn,
    activity2nd: ".activity-item",
    triggername: "#name",
    triggerDescription: "#desc",
    continue2Btn: continueBtn,
    addFieldLabelBtn: ".select-type-label",
    fieldFirst: ".option-container",
    fieldTitle: "#title",
    closeBtn: ".close",
    addFieldLabel2Btn: ".select-type-label",
    field2First: ".option-container",
    field2Title: "#title",
    close2Btn: ".close",
    continue3Btn: continueBtn,
    "@updateActivity": 200,
    "@UpdateApp": 200,
  },
  triggerEndpoint: {
    endpointName: "#endpoint_name",
    createEndpointText: "h2.title",
    urlEndpoint: "#url_path",
    trackingProperty: "#tracking_property_name",
    apiRequestTypeDropDown: {
      menu: "[id='http_verb']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    baseUrlDropDown: {
      menu: "[id='base_url_id']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
  },

  queryEndpoint: {
    endpointName: "#endpoint_name",
    createEndpointText: "h2.title",
    urlEndpoint: "#url_path",
    trackingProperty: "#tracking_property_name",
    apiRequestTypeDropDown: {
      menu: "[id='http_verb']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    baseUrlDropDown: {
      menu: "[id='base_url_id']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
  },

  connectorCard: ".app-card > div a",
  updateBasicInfo: {
    appDetailsBtn: ".title",
    description: "#desc",
    continueBtn: continueBtn,
    "@UpdateApp": 200,
  },
  fillAuthFormApi_Key: {
    authAction: "#url_path",
    headerKey: "input[id='headers[0].key']",
    headerValueBtn: "input[id='headers[0].value']",
    headerTokenFirst: ".single-tag",
    urlGeneratedAssertText: ".url-generated",
  },
  cloneConnector: {
    dropDownBtn: ".btn-link",
    cloneBtn: ".row img[alt='clone-icon']",
    deleteBtn: ".row img[alt='del-icon']",
    submitBtn: ".action-btn",
    tostfyMsg: ".Toastify__toast-body",
    toastCloseBtn: ".custom-close-toast",
    redBtn: ".dot-loader-container",
  },
  editEndPonit: {
    sidebarNav: "div.col-md-3 a",
    triggerBtn: "a.text-left",
    ednpointBtn: "a.d-inline-block",
    propertyName: "#tracking_property_name",
    saveBtn: "button.btn-success-dark",
    baseUrlv3: "div#base_url_id",
    caseUrlDropDOwn: "div#base_url_id div.css-xd42xz div",
    editAuthBtn: "a.edit-object-button",
    authDropDown: 'div.css-qcupud .css-ogqvls-placeholder',
    authEndpointOption: 'div.css-xd42xz div',
    saveAuthBtn: 'button.btn-success-dark'

  },
  triggerpage: {
    createTriggerBtn: createBtn,
    name: "#name",
    description: "#activity_description",
    pollBasedSlider: "span.slider",
    authSelectionDropDown: {
      menu: "[id='authorization_type']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    inputObjectDropDown: {
      menu: "[id='object_id']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    objectActionDropDown: {
      menu: "[id='activity_action']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    triggerEndpointDropDown: {
      menu: "[id='polling_endpoint_ref']",
      option: "div[class*='-menu'] div[class*='-option']",
    },

  },
  queryPage: {
    createQueryBtn: createBtn,
    name: "#name",
    description: "#activity_description",
    pollBasedSlider: "span.slider",
    authSelectionDropDown: {
      menu: "[id='authorization_type']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    inputObjectDropDown: {
      menu: "[id='object_id']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    objectActionDropDown: {
      menu: "[id='activity_action']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
    triggerEndpointDropDown: {
      menu: "[id='endpoint_ref']",
      option: "div[class*='-menu'] div[class*='-option']",
    },
  },

  fillConnectorWorkspace: {
    userProfile: "#link_to_user_profile",
    OauthSetupGuide: "#oauth_setup_guide_link",
    statusCode: "input#network_code_documentation_link",
    tokenEndointDropDown: {
      menu: "[id='token_uri_endpoint']",
      option: "div[class*='-menu'] div[class*='-option']",
    }
  },
  fillTokenEndpoint: {

  }
};
