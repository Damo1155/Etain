import * as $ from "jquery";
import * as ko from "knockout";

// Models
import { CustomFontAwesomeOptions, BaseFontAwesomeOptions } from "Content/TS/Models/FontAwesome/FontAwesomeConfiguration";

export module FontAwesomeBindings {
    const DefaultFontAwesomeClass = "fas" as string;

    ko.bindingHandlers.CustomIcon = {
        init: (ele: any, valueAccessor: () => string, allBindingsAccessor: () => CustomFontAwesomeOptions) => {
            const allBindings = allBindingsAccessor(),
                value = valueAccessor(),
                iconSize = allBindings.IconSize || "",
                iconType = allBindings.IconType || DefaultFontAwesomeClass;

            $(ele).html(CustomIcon(iconType, value, iconSize));
        }
    };

    ko.bindingHandlers.ChangeableIcon = {
        init: (ele: any, valueAccessor: () => KnockoutComputed<string>, allBindingsAccessor: () => CustomFontAwesomeOptions) => {
            let value = valueAccessor(),
                allBindings = allBindingsAccessor(),
                iconSize = allBindings.IconSize || "",
                defaultIconOverride = allBindings.IconType || DefaultFontAwesomeClass;

            $(ele).html(CustomIcon(defaultIconOverride, value(), iconSize));
        },
        update: (ele: any, valueAccessor: () => KnockoutComputed<string>, allBindingsAccessor: () => CustomFontAwesomeOptions) => {
            let value = valueAccessor(),
                allBindings = allBindingsAccessor(),
                iconSize = allBindings.IconSize || "",
                defaultIconOverride = allBindings.IconType || DefaultFontAwesomeClass;

            $(ele).html(CustomIcon(defaultIconOverride, value(), iconSize));
        }
    };

    ko.bindingHandlers.IconSpinner = {
        update: (ele: any, valueAccessor: () => any, allBindingsAccessor: () => BaseFontAwesomeOptions) => {
            let allBindings = allBindingsAccessor();
            const displayCondition = ko.unwrap(allBindings.DisplayCondition);

            var element = $(ele).html(CustomIcon(DefaultFontAwesomeClass, "fa-spinner fa-spin"));

            if (displayCondition != null) {
                if (displayCondition) {
                    element.show();
                } else {
                    element.hide();
                }
            }
        }
    };

    ko.bindingHandlers.IconSpinnerLarge = {
        update: (ele: any, valueAccessor: () => any, allBindingsAccessor: () => BaseFontAwesomeOptions) => {
            let allBindings = allBindingsAccessor();
            const displayCondition = ko.unwrap(allBindings.DisplayCondition);

            var element = $(ele).html(CustomIcon(DefaultFontAwesomeClass, "fa-spinner fa-spin", "fa-2x"));

            if (displayCondition != null) {
                if (displayCondition) {
                    element.show();
                } else {
                    element.hide();
                }
            }
        }
    };

    function CustomIcon(baseIconClass: string, icon: string, iconSize: string = ""): string {
        return `<i class="${baseIconClass} ${icon} ${iconSize} fa-fw"></i>`;
    };
}
