import * as $ from "jquery";
import * as ko from "knockout";

// Components
import "Content/TS/Shared/Header/header-content";

export function InitialisePage() {
    ko.applyBindings(null, $("header-content")[0]);
}