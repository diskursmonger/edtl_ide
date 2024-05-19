import { LanguageGrammarDefinitionContribution, TextmateRegistry } from '@theia/monaco/lib/browser/textmate';
import { injectable } from 'inversify';
import { EDTL_LANGUAGE_FILE_EXTENSION, EDTL_LANGUAGE_SERVER_ID, EDTL_LANGUAGE_SERVER_NAME } from '../common';

@injectable()
export class PoSTGrammarContribution implements LanguageGrammarDefinitionContribution {
    readonly scopeName = "source.edtl";
    readonly scopeNameST = "source.st";

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: EDTL_LANGUAGE_SERVER_ID,
            aliases: [
                EDTL_LANGUAGE_SERVER_NAME, EDTL_LANGUAGE_SERVER_ID
            ],
            extensions: [
                EDTL_LANGUAGE_FILE_EXTENSION,
            ],
            mimetypes: [
                'text/sm'
            ]
        });
        monaco.languages.setLanguageConfiguration(EDTL_LANGUAGE_SERVER_ID, this.configuration);

        registry.registerTextmateGrammarScope(this.scopeName, {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: require('../../data/post.tmLanguage.json')
                }
            }
        });
        registry.mapLanguageIdToTextmateGrammar(EDTL_LANGUAGE_SERVER_ID, this.scopeName);

        registry.registerTextmateGrammarScope(this.scopeNameST, {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: require('../../data/post.tmLanguage.json')
                }
            }
        });
    }

    protected configuration: monaco.languages.LanguageConfiguration = {
        'comments': {
            'lineComment': '//',
            'blockComment': ['/*', '*/']
        },
        'brackets': [
            ['{', '}'],
            ['[', ']'],
            ['(', ')']
        ],
        'autoClosingPairs': [
            { 'open': '{', 'close': '}' },
            { 'open': '[', 'close': ']' },
            { 'open': '(', 'close': ')' },
            { 'open': "'", 'close': "'", 'notIn': ['string', 'comment'] },
            { 'open': '"', 'close': '"', 'notIn': ['string'] },
            { 'open': '/*', 'close': ' */', 'notIn': ['string'] }
        ],
        'surroundingPairs': [
            { 'open': '{', 'close': '}' },
            { 'open': '[', 'close': ']' },
            { 'open': '(', 'close': ')' },
            { 'open': "'", 'close': "'" },
            { 'open': '"', 'close': '"' },
            { 'open': '`', 'close': '`' }
        ],
        'folding': {
            'markers': {
                'start': new RegExp('^\\s*//\\s*#?region\\b'),
                'end': new RegExp('^\\s*//\\s*#?endregion\\b')
            }
        }
    };
}