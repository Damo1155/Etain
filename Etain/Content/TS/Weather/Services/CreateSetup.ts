import * as $ from "jquery";
import * as ko from "knockout";

// Components
import "Content/TS/Weather/weather-base";

export function InitialisePage() {
    ko.applyBindings(null, $("weather-base")[0]);
}