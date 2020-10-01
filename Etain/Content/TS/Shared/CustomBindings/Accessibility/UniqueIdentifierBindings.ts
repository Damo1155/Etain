import * as $ from "jquery";
import * as ko from "knockout";

// Services
import { UniqueIdentifierService } from "Content/TS/Shared/Common/UniqueIdentifierService";

export module UniqueIdentifierBindings {
    ko.bindingHandlers.UniqueIdentifier = {
        update: (ele: any, valueAccessor: () => KnockoutObservable<boolean>) => {
            let id = null as string | null,
                element = $(ele);

            id = UniqueIdentifierService.RetrieveLinkHash(valueAccessor);
            if (id) {
                UniqueIdentifierService.RemoveLinkHash(valueAccessor);
            } else {
                id = UniqueIdentifierService.AddNewIdentifier(valueAccessor);
            }

            element.is("label") ? element.attr("for", id) : element.attr("id", id);
        }
    };
}
