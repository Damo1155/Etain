import * as ko from "knockout";

// Helpers
import "uniqueIdentifierBindings";

// Services
import { ValidationService } from "Content/TS/Shared/Common/ValidationService";

// Components
import "Content/TS/Shared/Bootstrap/Alerts/ValidationError/validation-error";

export interface IInputsBase {
    Value: KnockoutObservable<any>;                                                 // Required
    Text: string | KnockoutObservable<string> | KnockoutComputed<string>;           // Required

    ValidationFields: KnockoutObservable<any>[];                                    // Optional
    IsRequired: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;  // Optional
}

export default class InputsBase {
    CustomMessages!: {
        PropertyRequired: string;
    };

    Value: KnockoutObservable<any>;
    ValidationFields: KnockoutObservable<any>[];
    Text: string | KnockoutObservable<string> | KnockoutComputed<string>;

    IsRequired: boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>;

    constructor(params: IInputsBase) {
        // Component Validation
        if (!params.Text || !params.Value) {
            throw new Error("Please ensure all properties are provided to the 'inputs-base' component");
        }

        // Provided Component Properties
        this.Text = params.Text;
        this.Value = params.Value;
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

const inputTextComponent = "input-text" as string;
ko.components.unregister(inputTextComponent);
ko.components.register(inputTextComponent, {
    viewModel: InputsBase,
    template: { require: `text!Content/TS/Shared/Controls/Inputs/Text/${inputTextComponent}.html` }
});