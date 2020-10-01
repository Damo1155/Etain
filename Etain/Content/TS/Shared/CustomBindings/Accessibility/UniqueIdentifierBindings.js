define(["require", "exports", "jquery", "knockout", "Content/TS/Shared/Common/UniqueIdentifierService"], function (require, exports, $, ko, UniqueIdentifierService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UniqueIdentifierBindings = void 0;
    var UniqueIdentifierBindings;
    (function (UniqueIdentifierBindings) {
        ko.bindingHandlers.UniqueIdentifier = {
            update: (ele, valueAccessor) => {
                let id = null, element = $(ele);
                id = UniqueIdentifierService_1.UniqueIdentifierService.RetrieveLinkHash(valueAccessor);
                if (id) {
                    UniqueIdentifierService_1.UniqueIdentifierService.RemoveLinkHash(valueAccessor);
                }
                else {
                    id = UniqueIdentifierService_1.UniqueIdentifierService.AddNewIdentifier(valueAccessor);
                }
                element.is("label") ? element.attr("for", id) : element.attr("id", id);
            }
        };
    })(UniqueIdentifierBindings = exports.UniqueIdentifierBindings || (exports.UniqueIdentifierBindings = {}));
});

//# sourceMappingURL=UniqueIdentifierBindings.js.map
