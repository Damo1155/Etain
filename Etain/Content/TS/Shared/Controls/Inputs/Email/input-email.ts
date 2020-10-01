import * as ko from "knockout";

// Contexts
import InputsBase, { IInputsBase } from "Content/TS/Shared/Controls/Inputs/inputs-base";

// Services
import { ValidationService } from "Content/TS/Shared/Common/ValidationService";

export default class InputEmail extends InputsBase {
    AdditionalCustomMessages!: {
        EmailValidationMessage: string;
    };

    constructor(params: IInputsBase) {
        super(params);

        // Initialisation Methods
        this.RetrieveAdditionalCustomMessages();

        this.AdditionalValidation();
    }

    private RetrieveAdditionalCustomMessages(): void {
        this.AdditionalCustomMessages = {
            EmailValidationMessage: "Please provide a valid email address"
        };
    };

    private AdditionalValidation(): void {
        ValidationService.AddValidationRule(this.Value, this.ValidationFields, {
            email: {
                params: true,
                message: this.AdditionalCustomMessages.EmailValidationMessage
            }
        });
    };

    public dispose() {
        ValidationService.RemoveValidationRule(this.Value, this.ValidationFields);

        super.dispose();
    };
}

const componentName = "input-email" as string;
ko.components.unregister(componentName);
ko.components.register(componentName, {
    viewModel: InputEmail,
    template: { require: `text!Content/TS/Shared/Controls/Inputs/Email/${componentName}.html` }
});