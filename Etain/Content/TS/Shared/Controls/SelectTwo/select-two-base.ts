import * as ko from "knockout";

// Helpers
import "selectTwoBindings";
import "uniqueIdentifierBindings";

// Models
import { DefaultSelectTwoModel } from "Content/TS/Models/SelectTwo/SelectTwoBindingModels";

// Services
import { ValidationService } from "Content/TS/Shared/Common/ValidationService";

export interface ISelectTwoBase {
    Value: KnockoutObservable<any>;                                                 // Required
    Options: KnockoutObservableArray<DefaultSelectTwoModel>;                        // Required
    Text: string | KnockoutObservable<string> | KnockoutComputed<string>;           // Required

    ValidationFields: KnockoutObservable<any>[];                                    // Optional
    IsRequired: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;  // Optional
}

export default class SelectTwoBase {
    CustomMessages!: {
        PropertyRequired: string;
    };

    Value: KnockoutObservable<any>;
    ValidationFields: KnockoutObservable<any>[];

    Options: KnockoutObservableArray<DefaultSelectTwoModel>;

    Text: string | KnockoutObservable<string> | KnockoutComputed<string>;
    IsRequired: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;

    constructor(params: ISelectTwoBase) {
        // Component Validation
        if (!params.Text || !params.Value || !params.Options) {
            throw new Error("Please ensure all properties are provided to the 'select-two-base' component");
        }

        // Provided Component Properties
        this.Text = params.Text;
        this.Value = params.Value;
        this.Options = params.Options;
        this.IsRequired = params.IsRequired || false;
        this.ValidationFields = params.ValidationFields || [];

        // Initialisation Methods
        this.RetrieveCustomMessages();

        this.SetupValidation();
    };

    private RetrieveCustomMessages(): void {
        this.CustomMessages = {
            PropertyRequired: "{0} is a required field"
        };
    };

    private SetupValidation(): void {
        ValidationService.AddValidationRule(this.Value, this.ValidationFields, {
            required: {
                params: true,
                message: () => {
                    const text = ko.unwrap(this.Text) as string;

                    return this.CustomMessages.PropertyRequired
                        .replace("{0}", text);
                },
                onlyIf: () => {
                    return ko.unwrap(this.IsRequired);
                }
            }
        });
    };

    public dispose() {
        ValidationService.RemoveValidationRule(this.Value, this.ValidationFields);
    };
}

const componentName = "select-two-single" as string;
ko.components.unregister(componentName);
ko.components.register(componentName, {
    viewModel: SelectTwoBase,
    template: { require: `text!Content/TS/Shared/Controls/SelectTwo/${componentName}.html` }
});