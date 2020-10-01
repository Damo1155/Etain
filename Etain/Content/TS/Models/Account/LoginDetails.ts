export interface LoginRequest {
    Email: string;
    Password: string;
}

export interface LoginFormProperties {
    Email: KnockoutObservable<string | null>;
    Password: KnockoutObservable<string | null>;
}