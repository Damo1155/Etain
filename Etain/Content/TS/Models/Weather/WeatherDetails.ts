// Enums
import { WeatherTypes } from "Content/TS/Enums/Weather/WeatherTypes";

export interface WeatherDetailsRequest {
    woeid: number;
}

export interface WeatherDetailsResponse {
    title: string;

    consolidated_weather: Array<WeatherBreakdownResponse>;
}

export interface WeatherBreakdownResponse {
    applicable_date: string;
    weather_state_name: string;
    weather_state_abbr: WeatherTypes;
}

export interface MappedWeatherBreakdownResponse {
    Date: string;
    Location: string;

    WeatherStateName: string;

    WeatherTypes: WeatherTypes;
}