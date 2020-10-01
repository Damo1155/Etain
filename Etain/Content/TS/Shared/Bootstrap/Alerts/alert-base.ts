import * as ko from "knockout";

export interface IAlertBase {
    Text: string | KnockoutComputed<string>;                                                // Required
    DisplayCondition?: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;   // Required
}

export default class AlertBase {
    Text: string | KnockoutComputed<string>;
    DisplayCondition?: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;

    constructor(params: IAlertBase) {
        // Component Validation
        if (!params.Text) {
            throw new Error("Please ensure all properties are provided to the 'submit-action-base' component");
        }

        // Provided Component Properties
        this.Text = params.Text;
        this.DisplayCondition = params.DisplayCondition != null && params.DisplayCondition != undefined ? params.DisplayCondition : true;
    };
}

const alertPrimaryComponent = "alert-primary" as string;
ko.components.unregister(alertPrimaryComponent);
ko.components.register(alertPrimaryComponent, {
    viewModel: AlertBase,
    template: { require: `text!Content/TS/Shared/Bootstrap/Alerts/Primary/${alertPrimaryComponent}.html` }
});

const alertDangerComponent = "alert-danger" as string;
ko.components.unregister(alertDangerComponent);
ko.components.register(alertDangerComponent, {
    viewModel: AlertBase,
    template: { require: `text!Content/TS/Shared/Bootstrap/Alerts/Danger/${alertDangerComponent}.html` }
});