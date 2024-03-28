export default
    {
        navigateToMarketPlaceScreen: {
            flowTopBarBtn: ".btn-outline-light:nth-child(2)",
            marketPlaceTopBarBtn: ".btn-outline-light:nth-child(1)"
        },
        selectAppCard: {
            flowCardBtn: "p.btn-outline-primary",
        },
        fillAuthPopUp: {
            authenticationNameBeVisible: "#auth_name",
            authenticationName: "#auth_name",
            authBaseUrl: "#url",
            authApi: "#apikey",
            proceedBtn: ".btn-primary"
        },
        fillIntegrationForm: {
            continueBtnForce: ".integry-container__button--primary"
        },
        completeIntegration: {
            nextBtn: ".integry-container__button--primary",
            statusBarAssertValue: ".styles-module_name__gDntC",
            nextBtnForce: ".integry-container__button--primary",
            flowPageAssertValue: ".text",
            mpText: "#top-menu-bar a:nth-child(1)",
            searchBar: "#search-integration",
            integrationSelect: "div.autocomplete-suggestions div:nth-child(1)",
            signoutBtn: "#top-menu-bar a:nth-child(3)",
            signinBtn: "#top-menu-bar a:nth-child(3)"
        },

        Integration: {
            authName: "#auth_name",
            authBaseUrl: "#url",
            authApi: "#apikey",
            proceedBtn: ".btn-primary",
            signedin: "div.osp-container__heading p",
            readyBtn: "div.osp-container__actions button",
            appCard: "a.card-item",
            appName: "div.card-item-header",
            setupBtn: "p.btn-outline-primary",
            useFlowBtn: "#action-btn:nth-child(1)",
            signoutBtn: "#top-menu-bar a:nth-child(3)",
            nextBtn: "button.integry-container__button--primary",
            mapFirstValue: "div:nth-child(2) >div.styles-module_selectBox__2gn7w select",
            mapSecondValue: 'div:nth-child(3) div.styles-module_selectBox__2gn7w select',
            mapThirdValue: " div:nth-child(4) div.styles-module_selectBox__2gn7w select",
            saveBtn: "button.integry-container__button--primary",
            fLowsText: "h3.text",
            stepNumber: "div[class*='styles-module_steps__v']",
            dotsLoader: "div[class*='styles-module_loader']",
            slider: 'label.switch',
            sliderHover: 'div.tooltip-inner',
            statusIcon: 'img.status-img',
            statusHover: 'div.tooltip div.tooltip-inner'
            // statusAssertValue: ".styles-module_status__OwFQa",
            // flowForm: ".styles-module_inputWrapper__1XBHY",
            // authBtn: ".styles-module_buttonSecondary__2HV1m",
        },
        gSheetsIntegration: {
            connectedAccounts: "[class*='styles-module_text']",
            accountConnectionSuccess: "div[class*='styles-module_statusWrap'] > div > div:nth-child(2):contains(Connected)",
            dropdown: {
                menu: "div[class*='styles-module_customSelectTrigger']",
                option: "span[class*='styles-module_listboxItem']"
            },
            fieldName: "div[class*='styles-module_title']",
            fieldDropdown: {
                menu: "div[class*='styles-module_selectBox']",
                option: "sdf"
            }
        },
        flows: {
            createdFlow: "span[id*='name-span']",
            runs: "div[id*='runs']",
            lastActivity: "div[id*='date']",
            toggle: " label[class*='switch']",
            color: "span[class*='slider round']",
            flowRows: "div[id*='row']",
            dotsDrowdown: "div[id*='dots']",
            dotsDropdownOptions: "div[id*='drop-menu-integ'] ul li",
            confirmDeleteBtn: "button#delete-int",
            myFlowTitle: ".text",
            statusHeader: ".head-name > span",
            runsHeader: ".int-headings > :nth-child(2) > span",
            lastActivityHeader: ".int-headings > :nth-child(3) > span",
            activeHeader: ".actions-heading > span",
            editIcon: "img[id*='edit-name']",
            editName: "input[id*='name-input']",
            sortFilter: ".filters",
            sortZtoA: ".filters > :nth-child(3) > .select-items > :nth-child(3)",
            sortByApp: ".select-items > :nth-child(4)",
            sortAtoZ: ".filters > :nth-child(3) > .select-items > :nth-child(2)",
            sortByDate: ".filters > :nth-child(3) > .select-items > :nth-child(1)",
            flowNames: "input[id*='name-input']",

            filterIcon: "#filters-link",
            appFilterDropdown: "#filter-app-custom",
            appfilter: "#filters-menu > .custom-select > .select-items > :nth-child(3)",
            applyFilterButton: "#filters-menu >.action > .create-btn",
            applyFilterContainer: "#filters-menu > .drop-menu-integ > .filters-menu",
            filterPill2: "#selected-flow",
            filterPill1: "#selected-app",
            resetAppFilter: "#reset-app"
        }
    }