import { injectable, inject } from 'inversify';
import { Workspace, Languages, LanguageClientFactory, BaseLanguageClientContribution } from '@theia/languages/lib/browser';
import { EDTL_LANGUAGE_SERVER_ID, EDTL_LANGUAGE_SERVER_NAME, EDTL_LANGUAGE_FILE_EXTENSION } from '../common';

@injectable()
export class PoSTClientContribution extends BaseLanguageClientContribution {
    readonly id = EDTL_LANGUAGE_SERVER_ID;
    readonly name = EDTL_LANGUAGE_SERVER_NAME;

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory
    ) {
        super(workspace, languages, languageClientFactory)
    }

    protected get globPatterns(): string[] {
        return [
            '**/*' + EDTL_LANGUAGE_FILE_EXTENSION
        ];
    }

    protected get documentSelector(): string[] {
        return [
            EDTL_LANGUAGE_SERVER_ID
        ];
    }
}