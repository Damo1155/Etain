export module UniqueIdentifierService {
    (<any>window).uniqueIdSeed = (<any>window).uniqueIdSeed || 1;
    (<any>window).uniqueIdLinkHash = (<any>window).uniqueIdLinkHash || {};

    export function AddNewIdentifier(valueAccessor: any): string {
        const response = GenerateNewIdentifier();
        (<any>window).uniqueIdLinkHash[valueAccessor] = response;

        return response
    };

    export function RetrieveLinkHash(valueAccessor: any): string {
        return (<any>window).uniqueIdLinkHash[valueAccessor];
    }

    export function RemoveLinkHash(valueAccessor: any): void {
        (<any>window).uniqueIdLinkHash[valueAccessor] = undefined;
    }

    export function GenerateNewIdentifier() {
        return `unique-identifier-${(<any>window).uniqueIdSeed++}`;
    }
}
