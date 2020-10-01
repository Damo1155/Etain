import * as Q from "q";
import * as $ from "jquery";

// Models
import { LoginRequest } from "Content/TS/Models/Account/LoginDetails";
import { RegisterRequest } from "Content/TS/Models/Account/RegistrationDetails";

export module AccountService {
    export function IsUserLoggedIn(): Q.Promise<boolean> {
        return Q($.ajax({
            type: "GET",
            url: "/api/account"
        }));
    };

    export function ProcessLogin(request: LoginRequest): Q.Promise<void> {
        return Q($.ajax({
            type: "POST",
            data: request,
            url: "/api/account"
        }));
    };

    export function ProcessRegistration(request: RegisterRequest): Q.Promise<void> {
        return Q($.ajax({
            type: "PUT",
            data: request,
            url: "/api/account"
        }));
    };

    export function ProcessLogout(): Q.Promise<void> {
        return Q($.ajax({
            type: "DELETE",
            url: "/api/account"
        }));
    };
}