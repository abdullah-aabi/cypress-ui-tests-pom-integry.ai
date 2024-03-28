let connectorNavLink = ".nav-item:nth-child(1) > .nav-link";
let createConnectorBtn = ".create-object";
let continueBtn = ".btn-continue";
let testAuthenticationBtn = "button.btn-test-auth";
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
const title = "#title";
const description = "#desc";

export default {
    connectorNavLink: connectorNavLink,
    createConnectorBtn: createConnectorBtn,
    sideBar: "#sidebar-nav a.list-group-item",

    //  basic info
    homepageUrl: "#url-1",
    continueBtn: continueBtn,
    title: title,
    description: description,

    //  authorizations
    authRow: "div.auth-row div.auth-name",
    authStep: "div > div.title",
    authStepName: "div.step-expanded-wrapper > form > div > p.title",
    dropdown: {
        menu: "div.single-select__control",
        option: "div.single-select__option",
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
        limitCount: "#pg_limit_variable_name",
        limitValue: "input#pg_default_page_size",
        offset: "#pg_offset_variable_name",
        paginationSlider: "label.switch span.slider",
        object: 'div.app-detail-form-field-container .single-select__value-container',
        objectDropdown: "div.single-select__menu-list div",
        base_UrlTagBtn: "button.add-tag-button-v3",
        base_UrlTageDropdown: "div.background-handler"
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

    actionPage: {
        "@endPointAuth": 200,
        exitBtn: "p.right-node-text",
        bannerSuccessTextMsg: toastMessage,
        continueBtn: continueBtn,
        activityFirst: ".activity-item",
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

    }
};
