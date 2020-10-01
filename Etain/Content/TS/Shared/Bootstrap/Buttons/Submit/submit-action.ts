import * as ko from "knockout";

// Helpers
import "fontAwesomeBindings";

export interface ISubmitAction {
    IsDisabled: KnockoutObservable<boolean> | KnockoutComputed<boolean>;      // Required
    Text: string | KnockoutObservable<string> | KnockoutComputed<boolean>;    // Required

    IsFullLength: boolean;                                                    // Optional
    DisplaySpinner: KnockoutObservable<boolean> | KnockoutComputed<boolean>;  // Optional
}

export default class SubmitAction {
    IsFullLength: boolean;

    IsDisabled: KnockoutObservable<boolean> | KnockoutComputed<boolean>;
    Text: string | KnockoutObservable<string> | KnockoutComputed<boolean>;
    DisplaySpinner: KnockoutObservable<boolean> | KnockoutComputed<boolean>;

    constructor(params: ISubmitAction) {
        // Component Validation
        if (!params.Text || !params.IsDisabled) {
            throw new Error("Please ensure all properties are provided to the 'submit-action-base' component");
        }

        // Provided Component Properties
        this.Text = params.Text;
        this.IsDisabled = params.IsDisabled;
        this.IsFullLength = params.IsFullLength || false;
        this.DisplaySpinner = params.DisplaySpinner != null ? params.DisplaySpinner : ko.observable(false);
    };
}

const componentName = "submit-action" as string;
ko.components.unregister(componentName);
ko.components.register(componentName, {
    viewModel: SubmitAction,
    template: { require: `text!Content/TS/Shared/Bootstrap/Buttons/Submit/${componentName}.html` }
});