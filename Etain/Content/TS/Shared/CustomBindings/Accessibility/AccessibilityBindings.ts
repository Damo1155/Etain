import * as $ from "jquery";
import * as ko from "knockout";

export module AccessibilityBindings {
    ko.bindingHandlers.ContentVisible = {
        update: (ele: any, valueAccessor: () => boolean | KnockoutObservable<boolean> | KnockoutComputed<boolean>) => {
            const value = valueAccessor();

            const element = $(ele)
                .attr("aria-live", "polite")
                .attr("aria-hidden", `${!value}`);

            if (ko.unwrap(value)) {
                $(element).show();
            } else {
                $(element).hide();
            }
        }
    };

    ko.bindingHandlers.AriaRequired = {
        update: (ele: any, valueAccessor: () => KnockoutObservable<boolean> | KnockoutComputed<boolean>) => {
            const value = ko.unwrap(valueAccessor());
            $(ele).attr("aria-required", `${value}`); // Important  :   Needs to be stringified, otherwise jQuery doesn't like making the change correctly
        }
    };
}
