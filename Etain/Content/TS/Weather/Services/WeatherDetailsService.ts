import * as Q from "q";
import * as $ from "jquery";

// Models
import { WeatherDetailsRequest, WeatherDetailsResponse } from "Content/TS/Models/Weather/WeatherDetails";

export module WeatherDetailsService {
    export function RetrieveWeatherDetails(request: WeatherDetailsRequest): Q.Promise<WeatherDetailsResponse> {
        return Q($.ajax({
            type: "GET",
            data: request,
            url: "/api/weatherapi"
        }));
    }
}