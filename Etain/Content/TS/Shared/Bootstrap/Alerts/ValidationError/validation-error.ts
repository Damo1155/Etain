import * as ko from "knockout";

// Helpers
import "fontAwesomeBindings";

export interface IValidationError {
    Value: KnockoutObservable<string>
}

export default class ValidationError {
    Value: KnockoutObservable<string>;

    DisplayCondition!: KnockoutComputed<boolean>;

    constructor(params: IValidationError) {
        // Provided Component Properties
        this.Value = params.Value;

        // Initialisation Methods
        this.ComputedMethods();
    }

    private ComputedMethods(): void {
        this.DisplayCondition = ko.pureComputed(() => {
            return this.Value.isModified && this.Value.isModified() && !this.Value.isValid();
        });
    };
}

const componentName = "validation-error";
ko.components.unregister(componentName);
ko.components.register(componentName, {
    viewModel: ValidationError,
    template: { require: `text!Content/TS/Shared/Bootstrap/Alerts/ValidationError/${componentName}.html` }
});