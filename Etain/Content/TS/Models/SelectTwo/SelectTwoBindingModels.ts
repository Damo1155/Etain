export interface DefaultSelectTwoModel {
    id: string;
    text: string;
    selected?: boolean;
}

export interface SelectTwoBindingParams {
    SelectedValue: KnockoutObservable<number | null>;
}

export interface SelectTwoEventOptions {
    params: {
        data: {
            id: string;
        }
    }
}