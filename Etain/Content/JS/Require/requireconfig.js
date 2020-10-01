// Configuration    :   https://requirejs.org/docs/api.html#config

(function () {
    "use strict";
    require.config({
        baseUrl: "/",
        waitSeconds: 10, // Documentation   :    https://requirejs.org/docs/api.html#config-waitSeconds
        map: {
            "*": {}
        },
        paths: {
            // jQuery Paths
            "jquery": "node_modules/jquery/dist/jquery.min",

            // Bootstrap Paths:
            "bootstrap": "node_modules/bootstrap/dist/js/bootstrap.bundle.min",

            // Knockout Paths
            "knockout": "node_modules/knockout/build/output/knockout-latest",
            "koValidation": "node_modules/knockout.validation/dist/knockout.validation.min",
            "text": "node_modules/requirejs-text/text",

            // Miscellaneous Plugins
            "q": "node_modules/q/q",
            "signals": "node_modules/signals/dist/signals.min",
            "underscore": "node_modules/underscore/underscore-min",
            "moment": "node_modules/moment/min/moment-with-locales.min",
            "selectTwo": "node_modules/select2/dist/js/select2.full.min",

            // Custom Bindings
            "bootstrapModals": "Content/TS/Shared/CustomBindings/Bootstrap/ModalBindings",
            "passwordBindings": "Content/TS/Shared/CustomBindings/Controls/PasswordBindings",
            "selectTwoBindings": "Content/TS/Shared/CustomBindings/SelectTwo/SelectTwoBindings",
            "fontAwesomeBindings": "Content/TS/Shared/CustomBindings/FontAwesome/FontAwesomeBindings",
            "accessibilityBindings": "Content/TS/Shared/CustomBindings/Accessibility/AccessibilityBindings",
            "uniqueIdentifierBindings": "Content/TS/Shared/CustomBindings/Accessibility/UniqueIdentifierBindings"
        },
        shim: {
            knockout: {
                deps: ["jquery"]
            },
            knockoutValidation: {
                deps: ["jquery", "knockout"]
            }
        }
    });
})();