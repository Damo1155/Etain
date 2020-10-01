import * as ko from "knockout";

// Helpers
import "fontAwesomeBindings";

export interface IIconButtonsBase {
    Icon: string;                                                                           // Required
    ClickEvent: Function;                                                                   // Required
    ScreenReaderText: string;                                                               // Required

    IsFullLength: boolean;                                                                  // Optional
    IsDisabled: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;          // Optional
    DisplaySpinner: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;      // Optional
    DisplayCondition: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;    // Optional
}

export default class IconButtonsBase {
    Icon: string;
    ClickEvent: Function;
    IsFullLength: boolean;
    ScreenReaderText: string;

    IsDisabled: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;
    DisplaySpinner: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;
    DisplayCondition: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;

    constructor(params: IIconButtonsBase) {
        // Component Validation
        if (!params.ScreenReaderText || !params.ClickEvent || !params.Icon) {
            throw new Error("Please ensure all properties are provided to the 'icon-buttons-base' component");
        }

        // Provided Component Properties
        this.Icon = params.Icon;
        this.ClickEvent = params.ClickEvent;
        this.IsDisabled = params.IsDisabled || false;
        this.ScreenReaderText = params.ScreenReaderText;
        this.IsFullLength = params.IsFullLength || false;
        this.DisplaySpinner = params.DisplaySpinner != null ? params.DisplaySpinner : false;
        this.DisplayCondition = params.DisplayCondition != null ? params.DisplayCondition : true;
    };
}

const dangerComponent = "button-danger-icon" as string;
ko.components.unregister(dangerComponent);
ko.components.register(dangerComponent, {
    viewModel: IconButtonsBase,
    template: { require: `text!Content/TS/Shared/Bootstrap/Buttons/Icon/Danger/${dangerComponent}.html` }
});