import * as $ from "jquery";
import * as ko from "knockout";

export module PasswordBindings {
    ko.bindingHandlers.ChangePasswordType = {
        init: (ele: any, valueAccessor: () => KnockoutObservable<boolean>) => {
            const value = valueAccessor(),
                newType = value() ? "text" : "password";

            $(ele).prop("type", newType);
        },
        update: (ele: any, valueAccessor: () => KnockoutObservable<boolean>) => {
            const value = valueAccessor(),
                newType = value() ? "text" : "password";

            $(ele).prop("type", newType);
        }
    };
}
