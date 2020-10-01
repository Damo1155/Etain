define(["require", "exports", "knockout", "Content/TS/Shared/Controls/Inputs/inputs-base"], function (require, exports, ko, inputs_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InputEmail extends inputs_base_1.default {
        constructor(params) {
            super(params);
        }
    }
    exports.default = InputEmail;
    const inputEmailComponent = "input-email";
    ko.components.unregister(inputEmailComponent);
    ko.components.register(inputEmailComponent, {
        viewModel: inputs_base_1.default,
        template: { require: `text!Content/TS/Shared/Controls/Inputs/Email/${inputEmailComponent}.html` }
    });
});

//# sourceMappingURL=input-email.js.map
