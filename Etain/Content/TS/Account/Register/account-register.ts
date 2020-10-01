import * as ko from "knockout";

// Enums
import { XhrStatusCodes } from "Content/TS/Enums/Shared/Ajax/XhrStatusCodes";

// Models
import { RegisterFormProperties, RegisterRequest } from "Content/TS/Models/Account/RegistrationDetails";

// Services
import { AccountService } from "Content/TS/Account/Services/AccountService";
import { ValidationService } from "Content/TS/Shared/Common/ValidationService";

// Components
import "Content/TS/Shared/Bootstrap/Alerts/alert-base";
import "Content/TS/Shared/Controls/Inputs/Email/input-email";
import "Content/TS/Shared/Bootstrap/Buttons/Submit/submit-action";
import "Content/TS/Shared/Controls/Inputs/Password/input-password";
import "Content/TS/Shared/Bootstrap/Alerts/GenericError/generic-error";

export default class AccountRegister {
    CustomMessages!: {
        Email: string;
        Register: string;
        Password: string;
        UnauthorisedError: string;
    };

    FormProperties: RegisterFormProperties;

    ValidationFields: KnockoutObservable<any>[];
    HasErrorOccurred: KnockoutObservable<boolean>;
    IsProcessingRegistration: KnockoutObservable<boolean>;
    NonStandardErrorMessage: KnockoutObservable<string | null>;

    DisplayNonStandardError!: KnockoutComputed<boolean>;

    constructor() {
        // Standard Module Properties
        this.HasErrorOccurred = ko.observable(false);
        this.IsProcessingRegistration = ko.observable(false);

        this.NonStandardErrorMessage = ko.observable(null);

        this.ValidationFields = [];

        this.FormProperties = {
            Email: ko.observable(null),
            Password: ko.observable(null),
        } as RegisterFormProperties;

        // Initialisation Methods
        this.RetrieveCustomMessages();

        this.ComputedMethods();
    };

    public ProcessRegistration(): void {
        if (!ValidationService.IsValid(this.ValidationFields)) {
            return;
        }

        this.HasErrorOccurred(false);
        this.NonStandardErrorMessage(null);
        this.IsProcessingRegistration(true);

        const request = {
            Email: this.FormProperties.Email(),
            Password: this.FormProperties.Password(),
        } as RegisterRequest;

        AccountService.ProcessRegistration(request)
            .then(() => {
                window.location.replace("/");
            })
            .catch((xhr: JQueryXHR) => {
                switch (xhr.status) {
                    case XhrStatusCodes.BadRequest:
                    case XhrStatusCodes.Unauthorised:
                        this.NonStandardErrorMessage(this.CustomMessages.UnauthorisedError);
                        break;
                    default:
                        this.HasErrorOccurred(true);
                }
            })
            .finally(() => {
                this.IsProcessingRegistration(false);
            });
    };

    private RetrieveCustomMessages(): void {
        this.CustomMessages = {
            Email: "Email",
            Register: "Register",
            Password: "Password",
            UnauthorisedError: "An unknown error occurred whilst registering your account"
        }
    };

    private ComputedMethods(): void {
        this.DisplayNonStandardError = ko.pureComputed(() => {
            return this.NonStandardErrorMessage() != null;
        });
    };
}

const moduleName = "account-register" as string;
ko.components.unregister(moduleName);
ko.components.register(moduleName, {
    viewModel: AccountRegister,
    template: { require: `text!Content/TS/Account/Register/${moduleName}.html` }
});