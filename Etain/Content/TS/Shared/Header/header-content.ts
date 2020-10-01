import * as ko from "knockout";

// Helpers
import "fontAwesomeBindings";

// Services
import { AccountService } from "Content/TS/Account/Services/AccountService";

// Components
import "Content/TS/Shared/Bootstrap/Buttons/Icon/icon-buttons-base";

export default class HeaderContent {
    CustomMessages!: {
        Logout: string;
    };

    IsLoggedIn: KnockoutObservable<boolean>;

    constructor() {
        // Standard Component Properties
        this.IsLoggedIn = ko.observable(false);

        // Initialisation Methods
        this.RetrieveCustomMessages();

        this.IsUserLoggedIn();
    };

    public ProcessLogout(): void {
        AccountService.ProcessLogout()
            .then(() => {
                window.location.replace("/");
            });
    };

    private IsUserLoggedIn(): void {
        AccountService.IsUserLoggedIn()
            .then((response: boolean) => {
                this.IsLoggedIn(response);
            });
    };

    private RetrieveCustomMessages(): void {
        this.CustomMessages = {
            Logout: "Logout"
        };
    };
}

const moduleName = "header-content" as string;
ko.components.unregister(moduleName);
ko.components.register(moduleName, {
    viewModel: HeaderContent,
    template: { require: `text!Content/TS/Shared/Header/${moduleName}.html` }
});