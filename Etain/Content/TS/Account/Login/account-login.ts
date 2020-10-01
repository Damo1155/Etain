import * as ko from "knockout";

// Enums
import { XhrStatusCodes } from "Content/TS/Enums/Shared/Ajax/XhrStatusCodes";

// Models
import { LoginFormProperties, LoginRequest } from "Content/TS/Models/Account/LoginDetails";

// Services
import { AccountService } from "Content/TS/Account/Services/AccountService";
import { ValidationService } from "Content/TS/Shared/Common/ValidationService";

// Components
import "Content/TS/Shared/Bootstrap/Alerts/alert-base";
import "Content/TS/Shared/Controls/Inputs/Email/input-email";
import "Content/TS/Shared/Bootstrap/Buttons/Submit/submit-action";
import "Content/TS/Shared/Controls/Inputs/Password/input-password";
import "Content/TS/Shared/Bootstrap/Alerts/GenericError/generic-error";

export default class AccountLogin {
    CustomMessages!: {
        Email: string;
        Login: string;
        Password: string;
        UnauthorisedError: string;
    };

    FormProperties: LoginFormProperties;

    ValidationFields: KnockoutObservable<any>[];
    HasErrorOccurred: KnockoutObservable<boolean>;
    IsProcessingLogin: KnockoutObservable<boolean>;
    NonStandardErrorMessage: KnockoutObservable<string | null>;

    DisplayNonStandardError!: KnockoutComputed<boolean>;

    constructor() {
        // Standard Module Properties
        this.HasErrorOccurred = ko.observable(false);
        this.IsProcessingLogin = ko.observable(false);

        this.NonStandardErrorMessage = ko.observable(null);

        this.ValidationFields = [];

        this.FormProperties = {
            Email: ko.observable(null),
            Password: ko.observable(null),
        } as LoginFormProperties;

        // Initialisation Methods
        this.RetrieveCustomMessages();

        this.ComputedMethods();
    };

    public ProcessLogin(): void {
        if (!ValidationService.IsValid(this.ValidationFields)) {
            return;
        }

        this.HasErrorOccurred(false);
        this.IsProcessingLogin(true);
        this.NonStandardErrorMessage(null);

        const request = {
            Email: this.FormProperties.Email(),
            Password: this.FormProperties.Password()
        } as LoginRequest;

        AccountService.ProcessLogin(request)
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
                this.IsProcessingLogin(false);
            });
    };

    private RetrieveCustomMessages(): void {
        this.CustomMessages = {
            Email: "Email",
            Login: "Login",
            Password: "Password",
            UnauthorisedError: "The email address and/or password has not been recognised."
        }
    };

    private ComputedMethods(): void {
        this.DisplayNonStandardError = ko.pureComputed(() => {
            return this.NonStandardErrorMessage() != null;
        });
    };
}

const moduleName = "account-login" as string;
ko.components.unregister(moduleName);
ko.components.register(moduleName, {
    viewModel: AccountLogin,
    template: { require: `text!Content/TS/Account/Login/${moduleName}.html` }
});