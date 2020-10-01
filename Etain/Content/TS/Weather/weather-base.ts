import * as ko from "knockout";

// Models
import { MappedWeatherBreakdownResponse } from "Content/TS/Models/Weather/WeatherDetails";

// Modules
import "Content/TS/Weather/Form/weather-search-form";
import "Content/TS/Weather/Results/weather-search-results";

export default class WeatherBase {
    IsRetreieveSearchResults: KnockoutObservable<boolean>;

    SearchResults: KnockoutObservableArray<MappedWeatherBreakdownResponse>;

    constructor() {
        // Standard Module Properties
        this.IsRetreieveSearchResults = ko.observable(false);

        this.SearchResults = ko.observableArray([]);
    };
}

const moduleName = "weather-base" as string;
ko.components.unregister(moduleName);
ko.components.register(moduleName, {
    viewModel: WeatherBase,
    template: { require: `text!Content/TS/Weather/${moduleName}.html` }
});