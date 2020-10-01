import * as ko from "knockout";

// Helpers
import "fontAwesomeBindings";

export interface ISubmitAction {
    Text: string | KnockoutObservable<string> | KnockoutComputed<boolean>;      // Required
    DisplayCondition: KnockoutObservable<boolean> | KnockoutComputed<boolean>;  // Required
}

export default class SubmitAction {
    Text: string | KnockoutObservable<string> | KnockoutComputed<boolean>;
    DisplayCondition: KnockoutObservable<boolean> | KnockoutComputed<boolean>;

    constructor(params: ISubmitAction) {
        // Component Validation
        if (!params.Text || !params.DisplayCondition) {
            throw new Error("Please ensure all properties are provided to the 'loading-base' component");
        }

        // Provided Component Properties
        this.Text = params.Text;
        this.DisplayCondition = params.DisplayCondition;
    };
}

const componentName = "alert-loading" as string;
ko.components.unregister(componentName);
ko.components.register(componentName, {
    viewModel: SubmitAction,
    template: { require: `text!Content/TS/Shared/Loading/Alert/${componentName}.html` }
});