define(["require", "exports", "knockout", "fontAwesomeBindings"], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ValidationError {
        constructor(params) {
            this.Value = params.Value;
            this.ComputedMethods();
        }
        ComputedMethods() {
            this.DisplayCondition = ko.pureComputed(() => {
                return this.Value.isModified && this.Value.isModified() && !this.Value.isValid();
            });
        }
        ;
    }
    exports.default = ValidationError;
    const componentName = "validation-error";
    ko.components.unregister(componentName);
    ko.components.register(componentName, {
        viewModel: ValidationError,
        template: { require: `text!Content/TS/Shared/Bootstrap/Alerts/ValidationError/${componentName}.html` }
    });
});

//# sourceMappingURL=validation-error.js.map
