import * as ko from "knockout";

// Helpers
import "bootstrapModals";

// Enums
import { WorkflowSteps } from "Content/TS/Account/Enums/WorkflowSteps";

// Configuration
import { AccountSignalConfiguration } from "Content/TS/Account/Services/AccountSignalConfiguration";

// Modules
import "Content/TS/Account/Login/account-login";
import "Content/TS/Account/Register/account-register";

// Components
import "Content/TS/Shared/Bootstrap/Buttons/Standard/standard-buttons-base";

export interface IAccountBase {
    SignalConfiguration: AccountSignalConfiguration;
}

export default class AccountBase {
    CustomMessages!: {
        Close: string;
        Login: string;
        Register: string;
        RegisterAccount: string;
        AlreadyHaveAccount: string;
    };

    SignalConfiguration: AccountSignalConfiguration;

    DisplayModal: KnockoutObservable<boolean>;
    CurrentStep: KnockoutObservable<WorkflowSteps>;

    ModalTitle!: KnockoutComputed<string>;
    IsLoginStep!: KnockoutComputed<boolean>;
    IsRegistrationStep!: KnockoutComputed<boolean>;
    WorkflowStateButtonText!: KnockoutComputed<string>;

    constructor(params: IAccountBase) {
        // Provided Module Configuration
        this.SignalConfiguration = params.SignalConfiguration;

        // Standard Module Properties
        this.DisplayModal = ko.observable(false);
        this.CurrentStep = ko.observable(WorkflowSteps.Login);

        // Computed Methods
        this.RetrieveCustomMessages();

        this.ComputedMethods();
        this.InitialiseSignals();
    };

    public ToggleWorkflowState(): void {
        const newStep = this.IsLoginStep() ? WorkflowSteps.Register : WorkflowSteps.Login;

        this.CurrentStep(newStep);
    };

    public CloseModal(): void {
        this.DisplayModal(false);

        this.CurrentStep(WorkflowSteps.Login);
    };

    private ToggleModalState(): void {
        const currentValue = this.DisplayModal();
        this.DisplayModal(!currentValue);
    };

    private ComputedMethods(): void {
        this.IsLoginStep = ko.pureComputed(() => {
            return this.CurrentStep() == WorkflowSteps.Login;
        });

        this.IsRegistrationStep = ko.pureComputed(() => {
            return this.CurrentStep() == WorkflowSteps.Register;
        });

        this.WorkflowStateButtonText = ko.pureComputed(() => {
            return this.IsLoginStep() ? this.CustomMessages.RegisterAccount : this.CustomMessages.AlreadyHaveAccount;
        });

        this.ModalTitle = ko.pureComputed(() => {
            return this.IsLoginStep() ? this.CustomMessages.Login : this.CustomMessages.Register;
        });
    };

    private RetrieveCustomMessages(): void {
        this.CustomMessages = {
            Close: "Close",
            Login: "Login",
            Register: "Register",
            RegisterAccount: "Register an account",
            AlreadyHaveAccount: "Already have an account?"
        };
    };

    private InitialiseSignals(): void {
        this.SignalConfiguration.ToggleModalState.add(this.ToggleModalState.bind(this));
    };
}

const moduleName = "account-base" as string;
ko.components.unregister(moduleName);
ko.components.register(moduleName, {
    viewModel: AccountBase,
    template: { require: `text!Content/TS/Account/${moduleName}.html` }
});