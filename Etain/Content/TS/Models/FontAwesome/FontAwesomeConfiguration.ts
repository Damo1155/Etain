export interface CustomFontAwesomeOptions {
    IconType?: string;
    IconSize?: string;
}

export interface BaseFontAwesomeOptions {
    DisplayCondition: KnockoutObservable<boolean> | KnockoutComputed<boolean>;
}