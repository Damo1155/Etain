import * as ko from "knockout";

// Helpers
import "fontAwesomeBindings";

export interface IStandardButtonsBase {
    ClickEvent: Function;                                                                   // Required
    Text: string | KnockoutObservable<string> | KnockoutComputed<boolean>;                  // Required

    IsFullLength: boolean;                                                                  // Optional
    DisplaySpinner: KnockoutObservable<boolean> | KnockoutComputed<boolean>;                // Optional
    IsDisabled: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;          // Optional
    DisplayCondition: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;    // Optional
}

export default class StandardButtonsBase {
    ClickEvent: Function;
    IsFullLength: boolean;

    Text: string | KnockoutObservable<string> | KnockoutComputed<boolean>;
    DisplaySpinner: KnockoutObservable<boolean> | KnockoutComputed<boolean>;
    IsDisabled: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;
    DisplayCondition: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;

    constructor(params: IStandardButtonsBase) {
        // Component Validation
        if (!params.Text || !params.ClickEvent) {
            throw new Error("Please ensure all properties are provided to the 'standard-buttons-base' component");
        }

        // Provided Component Properties
        this.Text = params.Text;
        this.ClickEvent = params.ClickEvent;
        this.IsDisabled = params.IsDisabled || false;
        this.IsFullLength = params.IsFullLength || false;
        this.DisplayCondition = params.DisplayCondition != null ? params.DisplayCondition : true;
        this.DisplaySpinner = params.DisplaySpinner != null ? params.DisplaySpinner : ko.observable(false);
    };
}

const dangerOutlineComponent = "button-danger-outline" as string;
ko.components.unregister(dangerOutlineComponent);
ko.components.register(dangerOutlineComponent, {
    viewModel: StandardButtonsBase,
    template: { require: `text!Content/TS/Shared/Bootstrap/Buttons/Standard/Danger/${dangerOutlineComponent}.html` }
});

const primaryComponent = "button-primary" as string;
ko.components.unregister(primaryComponent);
ko.components.register(primaryComponent, {
    viewModel: StandardButtonsBase,
    template: { require: `text!Content/TS/Shared/Bootstrap/Buttons/Standard/Primary/${primaryComponent}.html` }
});

const darkOutlineComponent = "button-dark-outline" as string;
ko.components.unregister(darkOutlineComponent);
ko.components.register(darkOutlineComponent, {
    viewModel: StandardButtonsBase,
    template: { require: `text!Content/TS/Shared/Bootstrap/Buttons/Standard/Dark/${darkOutlineComponent}.html` }
});

const primaryOutlineComponent = "button-primary-outline" as string;
ko.components.unregister(primaryOutlineComponent);
ko.components.register(primaryOutlineComponent, {
    viewModel: StandardButtonsBase,
    template: { require: `text!Content/TS/Shared/Bootstrap/Buttons/Standard/Primary/${primaryOutlineComponent}.html` }
});