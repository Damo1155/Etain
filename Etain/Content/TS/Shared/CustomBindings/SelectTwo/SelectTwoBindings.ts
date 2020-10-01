import * as $ from "jquery";
import * as ko from "knockout";
import * as _ from "underscore";

// Helpers
import "selectTwo";

// Models
import { SelectTwoBindingParams, DefaultSelectTwoModel, SelectTwoEventOptions } from "Content/TS/Models/SelectTwo/SelectTwoBindingModels";

export module SelectTwoBindings {
    // Purpose: Configures a standard searchable list where only one item can be selected.
    ko.bindingHandlers.SelectTwoSingle = {
        init: (element: any, valueAccessor: () => KnockoutObservableArray<DefaultSelectTwoModel>, allBindingsAccessor: () => SelectTwoBindingParams) => {
            let dataSource = valueAccessor(),
                allBindings = allBindingsAccessor();

            ConfigureSelectContainer(element, dataSource, allBindings);
        },
        update: (element: any, valueAccessor: () => KnockoutObservableArray<DefaultSelectTwoModel>, allBindingsAccessor: () => SelectTwoBindingParams) => {
            let dataSource = valueAccessor(),
                allBindings = allBindingsAccessor();

            ReloadTriggers(element, valueAccessor(), allBindings);
            DefaultPreselectOption(dataSource(), allBindings);
        }
    };

    function DefaultPreselectOption(dataSource: DefaultSelectTwoModel[], allBindings: SelectTwoBindingParams): void {
        _.each(dataSource, (item: DefaultSelectTwoModel) => {
            AttemptValueToggle(item, allBindings);
        });
    };

    function AttemptValueToggle(item: DefaultSelectTwoModel, allBindings: SelectTwoBindingParams): void {
        if (item.selected) {
            if (allBindings.SelectedValue) {
                allBindings.SelectedValue(parseInt(item.id));
            }
        }
    };

    // Note: Ensures the list is completely cleaned up before adding the new options. Needs to be done in this manor in order to stop duplicate
    //       items from being added to the list.
    function ReloadTriggers(element: any, dataSource: KnockoutObservableArray<any>, allBindings: SelectTwoBindingParams): void {
        let ele = (<any>$(element)),
            dataAdapter = ele.data("select2").dataAdapter;

        ele.empty();

        dataAdapter.addOptions(dataAdapter.convertToOptions(dataSource()));
        ele.trigger("change");
    }

    // Note: Base configuration for a select2 container, use this when adding new bindings to this file.
    function ConfigureSelectContainer(element: any, dataSource: KnockoutObservableArray<any>, allBindings: SelectTwoBindingParams): any {
        let ele = (<any>$(element));

        AddDispose(element);

        let selectTwoConfiguration =
            ele.select2({
                data: dataSource,
                theme: "bootstrap4",
                dropdownAutoWidth: false,
                allowClear: false,
                multiple: false,
                closeOnSelect: true
            });

        ele
            .on("select2:select", (event: SelectTwoEventOptions) => {
                allBindings.SelectedValue(parseInt(event.params.data.id));
            })
            .on("select2:unselect", () => {
                allBindings.SelectedValue(null);
            })
            .on("select2:clear", function (this: any) {
                $(this).on("select2:opening.cancelOpen", function (event) {
                    // Note     :   Select2 default configuration is to immediately open the dropdown after clearing
                    //              the option. This implementation gets around their decision by preventing the default
                    //              behaviour of the plugin and ensuring the popup window is immediately closed. The
                    //              decision around this has been signed off by the Product Team.
                    // Source   :   https://github.com/select2/select2/issues/3320
                    //              https://github.com/select2/select2/issues/3320#issuecomment-524153140
                    event.preventDefault();
                    $(this).off("select2:opening.cancelOpen");
                });
            });

        allBindings.SelectedValue.subscribe((newValue?: number | null) => {
            const parseValue = newValue ? newValue.toString() : "";

            $(element).val(parseValue).trigger('change');
        });

        return selectTwoConfiguration;
    }

    function AddDispose(element: any): void {
        let ele = (<any>$(element));

        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            if (ele.data("select2")) {
                // Important    :   The argument used to call 'ele.select2("select2")' however that doesn't dispose of
                //                  the binding if it's removed from the UI. This 'destroy' will ensure the binding and
                //                  all events are completely removed from memory in order to prevent a memory leak.
                ele.select2("destroy");
            }
        });
    }
}