import * as ko from "knockout";

export module ValidationService {
    // Purpose  :   There are occasions where we'll change the context of a page and it'll immediately validate 
    //              the form. Whilst this is a good thing, it's also not great when it immediately pops up the
    //              validation messages as soon as you open modal, panel or whatever is being displayed. This will
    //              remove that issue in it's entirety so call it wisely.
    export function HideAllMessages(validationFields: KnockoutObservable<any>[]): void {
        const validationMessages =
            ko.validation.group(validationFields, { deep: true });

        validationMessages.showAllMessages(false);
    };

    // Purpose  :   There are occasions where we'll change the context of a value and it'll immediately validate 
    //              group form properties (i.e. where one form properties depends on another to function). Whilst 
    //              this is a good thing, it's also not great when it immediately pops up the validation messages 
    //              as the linked property is displayed. This will remove that issue in it's entirety so call it 
    //              wisely.
    export function HideValidationMessage(value: KnockoutObservable<any> | KnockoutObservableArray<any>): void {
        value.isModified(false);
    };

    export function AddValidationRule(field: KnockoutObservable<any> | KnockoutObservableArray<any>, validationFields: KnockoutObservable<any>[], rule: any): void {
        field.extend(rule);
        validationFields.push(field);
    };

    export function RemoveValidationRule(field: KnockoutObservable<any> | KnockoutObservableArray<any>, validationFields: KnockoutObservable<any>[]): void {
        var index = validationFields.indexOf(field);

        if (index >= 0) {
            validationFields.splice(index, 1);
        }
    };

    // Purpose  :   Checks that the field(s) are valid with forced mutation of the property(s).
    // Usage    :   Use this on functionality which needs to check that the property is valid and to have any invalid
    //              properties display the appropriate validation error.
    // Example  :   This is a perfect candidate for methods which are about to submit a request to the server. 
    //              e.g. Pressing the submit button on a form and the action it calls validates the form properties.
    export function IsValid(validationFields: KnockoutObservable<any>[]): boolean {
        var allValid = true;

        ko.utils.arrayForEach(validationFields, (field: KnockoutObservable<any> | KnockoutObservableArray<any>) => {
            if (field.valueHasMutated !== undefined) {
                field.valueHasMutated();
            }

            if (!field.isValid()) {
                allValid = false;
            }
        });

        return allValid;
    };

    // Purpose  :   Checks that the field(s) are valid with no forced mutation of the property(s).
    // Usage    :   Use this on functionality which only needs to check that the property is valid without having all
    //              validation messages being rendered.
    // Example  :   This is a perfect candidate for computed methods which only need to validate whether all the fields
    //              are valid so that a button is enabled when true.
    export function AreFieldsValid(validationFields: KnockoutObservable<any>[]): boolean {
        var allValid = true;

        ko.utils.arrayForEach(validationFields, (field: KnockoutObservable<any> | KnockoutObservableArray<any>) => {
            if (!field.isValid()) {
                allValid = false;
            }
        });

        return allValid;
    };
}
