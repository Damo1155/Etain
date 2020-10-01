define(["require", "exports", "knockout", "fontAwesomeBindings"], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SubmitAction {
        constructor(params) {
            if (!params.Text || !params.DisplayCondition) {
                throw new Error("Please ensure all properties are provided to the 'loading-base' component");
            }
            this.Text = params.Text;
            this.DisplayCondition = params.DisplayCondition;
        }
        ;
    }
    exports.default = SubmitAction;
    const componentName = "alert-loading";
    ko.components.unregister(componentName);
    ko.components.register(componentName, {
        viewModel: SubmitAction,
        template: { require: `text!Content/TS/Shared/Loading/Alert/${componentName}.html` }
    });
});

//# sourceMappingURL=loading-base.js.map
