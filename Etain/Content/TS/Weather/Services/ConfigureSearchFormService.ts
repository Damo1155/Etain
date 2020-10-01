import * as ko from "knockout";
import * as _ from "underscore";
import * as moment from "moment";

// Types
import { DefaultSelectTwoModel } from "Content/TS/Models/SelectTwo/SelectTwoBindingModels";

// Enums
import { WeatherTypes } from "Content/TS/Enums/Weather/WeatherTypes";

// Models
import { FormProperties } from "Content/TS/Models/Weather/WeatherDetailsFormProperties";
import { MappedWeatherBreakdownResponse, WeatherDetailsResponse, WeatherBreakdownResponse } from "Content/TS/Models/Weather/WeatherDetails";

export module ConfigureSearchFormService {
    const DefaultWoeid = 44544 as number;

    export function ConfigureSearchFromProperties(): FormProperties {
        return {
            Woeid: ko.observable(null)
        } as FormProperties;
    };

    export function ResetFormProperties(formProperties: FormProperties): void {
        formProperties.Woeid(DefaultWoeid);
    };

    export function ConfigureWoeidOptions(): Array<DefaultSelectTwoModel> {
        const locations = [
            { text: "Manchester", id: "28218" },
            { text: "London", id: "44418" },
            { text: "Swansea", id: "36758" },
            { text: "Belfast", id: DefaultWoeid.toString(), selected: true }
        ];

        return _.sortBy(locations, "text");
    };

    export function MapSearchResults(searchResult: WeatherDetailsResponse): Array<MappedWeatherBreakdownResponse> {
        return _.map(searchResult.consolidated_weather, (result: WeatherBreakdownResponse) => {
            return {
                Location: searchResult.title,
                WeatherTypes: result.weather_state_abbr,
                WeatherStateName: result.weather_state_name,
                IconClass: ConfigureFontAwesomeIcon(result),
                Date: moment(result.applicable_date).format("DD MMM, YYYY")
            } as MappedWeatherBreakdownResponse;
        });
    };

    function ConfigureFontAwesomeIcon(result: WeatherBreakdownResponse): string {
        // Important    :   Implemented using FontAwesome as it can be quite heavy in terms of performance to pull back images from any source 
        //                  multiple times. FontAwesome on the other hand will keep it nice and compact whilst also dealing with accessibility
        //                  and converting icons to SVGs so will have a higher quality scaleable image.
        switch (result.weather_state_abbr) {
            case WeatherTypes.Snow:
                return "fa-snowflake";
            case WeatherTypes.Sleet:
                return "fa-snowflake";
            case WeatherTypes.Hail:
                return "fa-cloud-meatball";
            case WeatherTypes.Thunderstorm:
                return "fa-bolt";
            case WeatherTypes.HeavyRain:
                return "fa-cloud-showers-heavy";
            case WeatherTypes.LightRain:
                return "fa-cloud-sun-rain";
            case WeatherTypes.Showers:
                return "fa-cloud-rain";
            case WeatherTypes.HeavyCloud:
                return "fa-smog";
            case WeatherTypes.LightCloud:
                return "fa-cloud";
            case WeatherTypes.Clear:
                return "fa-sun";
            default:
                throw new Error("Weather type provided not supported");
        }
    };
}