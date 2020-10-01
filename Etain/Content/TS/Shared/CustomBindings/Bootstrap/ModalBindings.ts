import * as $ from "jquery";
import * as ko from "knockout";

// Helpers
import "bootstrap";

export module ModalBindings {
    ko.bindingHandlers.ToggleModal = {
        update: (ele: any, valueAccessor: () => KnockoutObservable<boolean>) => {
            let value = valueAccessor();

            // Purpose  :   If the value has only just been set to true then display the modal, otherwise hide it.
            if (value()) {
                displayModal(ele, value);
            } else {
                hideModal(ele, value);
            }
        }
    };

    function displayModal(ele: any, value: KnockoutObservable<boolean>): void {
        (<any>$(ele)).modal({
            keyboard: false,
            backdrop: "static",
            show: true
        });

        $(ele).off("hidden.bs.modal");

        // Purpose : used when the BS methods are used to close the modal. The observable needs to be changed in Legend code to match the modal visible state
        $(ele).on("hidden.bs.modal", function () {
            $("body").removeClass("modal-open");
            value(false);
        });
    };

    function hideModal(ele: any, value: KnockoutObservable<boolean>): void {
        (<any>$(ele)).modal('hide');


        $(ele).off("shown.bs.modal");

        // Purpose : used when the BS methods are used to open the modal. The observable needs to be changed in Legend code to match the modal visible state
        $(ele).on("shown.bs.modal", function () {
            $("body").addClass("modal-open");
            value(true);
        });
    };
}
