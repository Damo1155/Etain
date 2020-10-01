import * as ko from "knockout";

// Helpers
import "fontAwesomeBindings";

// Models
import { MappedWeatherBreakdownResponse } from "Content/TS/Models/Weather/WeatherDetails";

// Components
import "Content/TS/Shared/Loading/loading-base";

export interface IWeatherSearchResults {
    IsRetreieveSearchResults: KnockoutObservable<boolean>;
    SearchResults: KnockoutObservableArray<MappedWeatherBreakdownResponse>;
}

export default class WeatherSearchResults {
    CustomMessages!: {
        RetrievingWeatherBreakdown: string;
    };

    IsRetreieveSearchResults: KnockoutObservable<boolean>;

    SearchResults: KnockoutObservableArray<MappedWeatherBreakdownResponse>;

    HasSearchResults!: KnockoutComputed<boolean>;

    constructor(params: IWeatherSearchResults) {
        // Provided Module Properties
        this.SearchResults = params.SearchResults;
        this.IsRetreieveSearchResults = params.IsRetreieveSearchResults;

        // Initialisation Methods
        this.RetrieveCustomMessages();

        this.ComputedMethods();
    };

    private RetrieveCustomMessages(): void {
        this.CustomMessages = {
            RetrievingWeatherBreakdown: "Retrieving weather details"
        };
    };

    private ComputedMethods(): void {
        this.HasSearchResults = ko.pureComputed(() => {
            return this.SearchResults().length > 0 && !this.IsRetreieveSearchResults();
        });
    };
}

const moduleName = "weather-search-results" as string;
ko.components.unregister(moduleName);
ko.components.register(moduleName, {
    viewModel: WeatherSearchResults,
    template: { require: `text!Content/TS/Weather/Results/${moduleName}.html` }
});