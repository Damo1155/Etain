import * as ko from "knockout";

export interface IGenericError {
    DisplayCondition: KnockoutObservable<boolean> | KnockoutComputed<boolean>;       // Required
}

export default class GenericError {
    DisplayCondition: KnockoutObservable<boolean> | KnockoutComputed<boolean>;

    constructor(params: IGenericError) {
        // Component Validation
        if (!params.DisplayCondition) {
            throw new Error("Please ensure all properties are provided to the 'generic-error' component");
        }

        // Provided Component Properties
        this.DisplayCondition = params.DisplayCondition;
    };
}

const genericAlertComponent = "generic-error" as string;
ko.components.unregister(genericAlertComponent);
ko.components.register(genericAlertComponent, {
    viewModel: GenericError,
    template: { require: `text!Content/TS/Shared/Bootstrap/Alerts/GenericError/${genericAlertComponent}.html` }
});