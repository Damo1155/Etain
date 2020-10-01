import * as ko from "knockout";

// Helpers
import "fontAwesomeBindings";

// Models
import { FormProperties } from "Content/TS/Models/Weather/WeatherDetailsFormProperties";
import { MappedWeatherBreakdownResponse } from "Content/TS/Models/Weather/WeatherDetails";
import { DefaultSelectTwoModel } from "Content/TS/Models/SelectTwo/SelectTwoBindingModels";
import { WeatherDetailsRequest, WeatherDetailsResponse } from "Content/TS/Models/Weather/WeatherDetails";

// Services
import { AccountService } from "Content/TS/Account/Services/AccountService";
import { ValidationService } from "Content/TS/Shared/Common/ValidationService";
import { WeatherDetailsService } from "Content/TS/Weather/Services/WeatherDetailsService";
import { ConfigureSearchFormService } from "Content/TS/Weather/Services/ConfigureSearchFormService";

// Configuration
import { AccountSignalConfiguration } from "Content/TS/Account/Services/AccountSignalConfiguration";

// Modules
import "Content/TS/Account/account-base"

// Components
import "Content/TS/Shared/Bootstrap/Alerts/alert-base";
import "Content/TS/Shared/Controls/Inputs/inputs-base";
import "Content/TS/Shared/Controls/SelectTwo/select-two-base";
import "Content/TS/Shared/Bootstrap/Buttons/Submit/submit-action";
import "Content/TS/Shared/Bootstrap/Buttons/Standard/standard-buttons-base";

export interface IWeatherSearchForm {
    IsRetreieveSearchResults: KnockoutObservable<boolean>;
    SearchResults: KnockoutObservableArray<MappedWeatherBreakdownResponse>;
}

export default class WeatherSearchForm {
    CustomMessages!: {
        Login: string;
        Search: string;
        Location: string;
        ResetForm: string;
        NotLoggedIn: string;
    };

    FormProperties: FormProperties;
    SignalConfiguration!: AccountSignalConfiguration;

    IsLoggedIn: KnockoutObservable<boolean>;
    ValidationFields: KnockoutObservable<any>[];
    HasErrorOccurred: KnockoutObservable<boolean>;
    IsRetreieveSearchResults: KnockoutObservable<boolean>;

    WoeidOptions: KnockoutObservableArray<DefaultSelectTwoModel>;
    SearchResults: KnockoutObservableArray<MappedWeatherBreakdownResponse>;

    DisplayNotLoggedInContainer!: KnockoutComputed<boolean>;

    constructor(params: IWeatherSearchForm) {
        // Provided Component Properties
        this.SearchResults = params.SearchResults;
        this.IsRetreieveSearchResults = params.IsRetreieveSearchResults;

        // Standard Component Properties
        this.IsLoggedIn = ko.observable(true);
        this.HasErrorOccurred = ko.observable(false);

        this.ValidationFields = [];
        this.FormProperties = ConfigureSearchFormService.ConfigureSearchFromProperties();
        this.WoeidOptions = ko.observableArray(ConfigureSearchFormService.ConfigureWoeidOptions());

        // Initialisation Methods
        this.RetrieveCustomMessages();

        this.ComputedMethods();
        this.InitialiseSignals();

        this.IsUserLoggedIn();
    };

    public ToggleLoginModal(): void {
        this.SignalConfiguration.ToggleModalState.dispatch();
    };

    public ValidateSearch(): void {
        if (!ValidationService.IsValid(this.ValidationFields)) {
            return;
        }

        AccountService.IsUserLoggedIn()
            .then((response: boolean) => {
                if (response) {
                    this.ProcessSearch();
                } else {
                    this.SignalConfiguration.ToggleModalState.dispatch();
                }
            });
    };

    private IsUserLoggedIn(): void {
        AccountService.IsUserLoggedIn()
            .then((response: boolean) => {
                this.IsLoggedIn(response);
            });
    };

    private ProcessSearch(): void {
        this.IsRetreieveSearchResults(true);

        const request = {
            woeid: this.FormProperties.Woeid()
        } as WeatherDetailsRequest;

        WeatherDetailsService.RetrieveWeatherDetails(request)
            .then((response: WeatherDetailsResponse) => {
                this.SearchResults(ConfigureSearchFormService.MapSearchResults(response));
            })
            .catch(() => {
                this.HasErrorOccurred(true);
            })
            .finally(() => {
                this.IsRetreieveSearchResults(false);
            });
    };

    public ClearForm(): void {
        ConfigureSearchFormService.ResetFormProperties(this.FormProperties);

        this.SearchResults([]);

        ValidationService.HideAllMessages(this.ValidationFields);
    };

    private RetrieveCustomMessages(): void {
        this.CustomMessages = {
            Login: "Login",
            Search: "Search",
            Location: "Location",
            ResetForm: "Reset form",
            NotLoggedIn: "You're not currently logged in, please click 'Login' or 'Search' before continuing"
        };
    };

    private ComputedMethods(): void {
        this.DisplayNotLoggedInContainer = ko.pureComputed(() => {
            return !this.IsLoggedIn();
        });
    };

    private InitialiseSignals(): void {
        this.SignalConfiguration = new AccountSignalConfiguration();
    };
}

const moduleName = "weather-search-form" as string;
ko.components.unregister(moduleName);
ko.components.register(moduleName, {
    viewModel: WeatherSearchForm,
    template: { require: `text!Content/TS/Weather/Form/${moduleName}.html` }
});