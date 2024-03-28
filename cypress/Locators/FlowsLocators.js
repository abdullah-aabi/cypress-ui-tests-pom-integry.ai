const title = "#title";
const description = "#description";
const doneBtn = "button.dot-loader-container";
const submitBtn = "[type='submit']";
const toastMessage = ".Toastify__toast--success";
const tooltip = "#tooltip";
const buttonLabel = "#button_text";

export default {
  flowName: "h1.temlate-name",
  flowCard: "div.template-card",
  flowsNavLink: "a.nav-link:contains(Flows)",
  createNewFlow: "div.reusable-button-wrapper button",
  createFlowBtn: ".div.reusable-button-wrapper button",
  createNewFlowBtn: "div.reusable-button-wrapper button",
  title: title,
  description: description,
  proceedBtn: ".btn-primary",
  search: ".search-bar",
  testBtn: "button.template-secondary-button",
  searchResult: "div.app-tile div.app-name",
  successMsg: "div.success-message > div",
  doneButton: "button.template-step-button",
  continueBtn: "button.directory-next-button-v3",
  triggerLink: "div.text-black-12px",
  dropdown: {
    menu: "div.single-select__control",
    option: "div.single-select__option",
  },
  radioBtn: ".form-check-input",
  addAccount: "button.btn-add-account",
  textfieldValue: "div.tag-pills-input input",
  saveButton: submitBtn,
  successMessage: toastMessage,
  sideMenu: "div.item",
  note: "div.ql-editor p",
  tooltip: tooltip,
  buttonLabel: buttonLabel,
  saveBtn: "button.btn-royal-blue ",
  closeBtn: "div.round-close-button",
  editFieldTitle: "div.editable-field-title",
  dropdownMenu: "img.drop-icon",
  listOption: "div.option-list div.single-option",
  stepMenu: "div.expanded-step-menu-btn",
  stepMenuItem: "button.expanded-step-menu-item",
  fieldInput: "input.form-control",
  addTagBtn: "button.add-tag-button-v3",
  tagStep: "div.tag-step-header",
  tagStepObj:
    "div.tag-v3-container div.tag.background-handler div.expand-icon-container",
  tagObjKey: "div.tag.background-handler div.object-key",
  stepHeading: "div.heading",
  stepSubtitle: "div.subtitle",
  nextIteration: doneBtn,
  conditionResult: "div.condition-result-container div",

  navigateToflowsScreen: {
    flowsBtn: "a.nav-link:contains(Flows)",
    "@getAllApps": 200,
    createFlowBtn: ".create-object-content",
    flowCard: ".info",
  },
  selectTriggerConnector: {
    title: title,
    description: description,
    search: ".search-bar",
    searchResultsFirst: "div.app-tile div.app-name",
    triggerOptionFirst: "div.single-select__placeholder",
    triggerOptionResultLast: "div.single-select__option",
  },
  connectWithApp: {
    radioBtn: ".form-check-input",
  },
  fillTriggerForm: {
    doneBtn: ".dot-loader-container",
    toastMsg: ".Toastify__toast-body",
    emailField_Unique:
      '#default_value_0_0  > .tags-pills-container input[data_index="0"]',
    first_nameField:
      '#default_value_0_1  > .tags-pills-container input[data_index="0"]',
    doneMsg: ".dot-loader-container",
    doneBtnForce: ".dot-loader-container",
    "@ApiEndpoints": 200,
  },
  triggerSuccessMessage: {
    triggerSuccessMsg: ".text-black-14px",
    doneTextButtonForce: ".dot-loader-container",
  },
  selectActionConnector: {
    searchnotDisabled: ".search-bar",
    search: ".search-bar",
    searchResultsFirst: "div.app-tile div.app-name",
    triggerOptionFirst: "div.single-select__placeholder",
    triggerOptionResultFirst: "div.single-select__option",
  },
  emailField_Unique:
    '#default_value_00_0  > .tags-pills-container input[data_index="0"]',
  fillActionForm: {
    first_nameField:
      '#default_value_00_1  > .tags-pills-container input[data_index="0"]',
    done1TextButton: ".dot-loader-container",
    doneTextButton: ".dot-loader-container",
  },
  publishFlowInMarketPlace: {
    publishTextButton: ".btn-royal-blue",
    marketPlaceBtn: ".drop-icon",
    marketPlaceFirst: ".option-label",
    doneBtn: ".dot-loader-container",
    deplopFlowDonwBtn: "div.inner-div button.btn-royal-blue",
    confirmBtn: ".text-center .btn-danger",
    actionDonebtn: "button.template-step-button",
    publishFlowPopup: 'div.Toastify__toast-body'
  },
  authSelection: {
    addBtn: ".btn-add-account",
    userName: "#username",
    pass: "#password",
    submit: ".button-wide",
    allow: ".button p1",
  },
  deleteFlowStep: {
    expandStep: ".expanded-step-menu-btn",
    deleteBtn: ".expanded-step-menu-item",
    addStep: "#add-Step-button-v3",
  },

  flowGeneralLoc: {
    selectNameFlow: "div.stats-container",
    hover: "div.info",
    selectToggle: " div:nth-child(2) > div > div > div.dropdown.show > button",
  },

  dropdownFunctions: {
    dropDownBtn: "div.integry-meatballs-menu",
    dropDownRenameBtn: "div.dropdown.show button:nth-child(2)",
    renameFlowTab: "input.temlate-rename",
    dropDownDelBtn: ".row-item",
    delConfirmationBtn: ".btn-danger",
    delAssertion: "div.Toastify__toast-body",
    cloneDropDownBtn: "div.meatballs-menu__item:contains('Clone')",
    cloneConfirmBtn: "div.reusable-button-wrapper:contains('Make a Clone')",
    flowDropDownBtn: "img#toggle-step-menu-button0",
    flowDropDownMenu: ".expanded-step-menu-item",
    flowDropDownOption: "button.expanded-step-menu-item",
    cloneAssertion: "div.Toastify__toast-container--bottom-left",
    cloneConfirmationBtn: "div.reusable-typography-wrapper:contains('OK')"
  },

  publishOrUnpublishFlow: {
    unpublishFlowBtn: "button.flow-publish-btn",
    unpublishConfirmFlowBtn: "p.text-center button.btn-danger",
    deployFlowDropdown: "div.select-container div.drop-icon",
    deployFlowDropdownMenu: "div.option-container div.option-label",
    deployFlowDropdownConfirmation: "div.content-div > div > button",
  },
  copyPasteFlow: {
    assertionCopy: "div.toast-text-wrapper > .info-text",
    assertionPaste: "div.Toastify__toast-body",
  },

  stepsInFlow: {
    addFlowConnectorTab: "input.search-bar",
    selectLoopConnector: "div.app-tile div.app-name",
    loopVariableField: "input#default_value_1_0",
    loopArrayField: "div.tag-pills-input",
    loopTestBtn: "button.template-secondary-button",
    loopDoneBtn: " div.expanded-steps-footer-container button:nth-child(2)",
    loopAssertion: "div.Toastify__toast-body",
  },

  storageFlows: {
    activity: "div.single-select__dropdown-indicator",
    selectAction: "span.select-option-with-type",
    name: "button.add-tag-button-v3",
    nameKey: "button.add-tag-button-v3",
    subName: "div.tag-step-header",
    subNameAction: "div.background-handler",
    continueBtn: "button.directory-next-button-v3",
    nameField: "div.tagged-field-wrapper input",
    emailField: "div.tagged-field-wrapper input",
    namespaceValue: "#default_value_01_0 input[type=text]",
    keyValue: "#default_value_01_1 input[type=text]",
    testBtn: "button.template-secondary-button",
    toastMsg: "div.Toastify__toast-body",
    doneBtn: "button.template-step-button",
    value: "#default_value_01_2 input[type=text]",
    storageAssertion: "div.Toastify__toast-body",
    storageTestBtn: "button.template-secondary-button",
    storageDoneBtn: " div.expanded-steps-footer-container button:nth-child(2)",
  },
  queryFlow: {
    nextPageBtn: "button.template-secondary-button"
  }
};
