export interface RegisterRequest {
    Email: string;
    Password: string;
}

export interface RegisterFormProperties {
    Email: KnockoutObservable<string | null>;
    Password: KnockoutObservable<string | null>;
}