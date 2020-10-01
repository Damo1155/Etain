import * as ko from "knockout";

// Helpers
import "passwordBindings";
import "fontAwesomeBindings";

// Models
import InputsBase, { IInputsBase } from "Content/TS/Shared/Controls/Inputs/inputs-base";

export default class InputPassword extends InputsBase {
    ExtendedCustomMessages!: {
        HidePassword: string;
        DisplayPassword: string;
    };

    IsPasswordVisible: KnockoutObservable<boolean>;

    PasswordVisibilityIcon!: KnockoutComputed<string>;
    PasswordVisibilityMessage!: KnockoutComputed<string>;

    constructor(params: IInputsBase) {
        super(params);

        // Standard Component Properties
        this.IsPasswordVisible = ko.observable(false);

        // Initialisation Methods
        this.RetrieveExtendedCustomMessages();

        this.ExtendedComputedMethods();
    }

    public TogglePasswordVisibility(): void {
        const currentValue = this.IsPasswordVisible();
        this.IsPasswordVisible(!currentValue);
    };

    private RetrieveExtendedCustomMessages(): void {
        this.ExtendedCustomMessages = {
            HidePassword: "Hide password",
            DisplayPassword: "Display password"
        }
    };

    private ExtendedComputedMethods(): void {
        this.PasswordVisibilityIcon = ko.pureComputed(() => {
            return this.IsPasswordVisible() ? "fa-eye" : "fa-eye-slash";
        });

        this.PasswordVisibilityMessage = ko.pureComputed(() => {
            return this.IsPasswordVisible() ? this.ExtendedCustomMessages.HidePassword : this.ExtendedCustomMessages.DisplayPassword;
        });
    };

    public dispose() {
        super.dispose();
    };
}

const componentName = "input-password" as string;
ko.components.unregister(componentName);
ko.components.register(componentName, {
    viewModel: InputPassword,
    template: { require: `text!Content/TS/Shared/Controls/Inputs/Password/${componentName}.html` }
});