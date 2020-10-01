import { Signal } from "signals";

export interface AccountSignalConfiguration {
    ToggleModalState: Signal;
}

export class AccountSignalConfiguration {
    ToggleModalState: Signal;

    constructor() {
        this.ToggleModalState = new Signal();
    }
}