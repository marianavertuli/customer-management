import en from '@/lang/en.json';
import pt from '@/lang/pt.json';

export type Languages = 'PT' | 'EN';

interface SupportedLanguages {
    id: Languages;
    value: string;
}

export const supportedLanguages: SupportedLanguages[] = [
    {id: 'EN', value: 'EN-US'},
    {id: 'PT', value: 'PT-BR'}
]

let selectedLanguage: Languages | undefined = undefined;

export function getSelectedLanguage() {
    return selectedLanguage;
}

export function setSelectedLanguage(language: Languages) {
    selectedLanguage = language;
}

function getLabelFromObject(labels: string[], object: Object): string {
    for (let label of labels) {
        if (object.hasOwnProperty(label)) {
            const prop = object[label as keyof typeof object]
            if (typeof(prop) == 'string') {
                return prop;
            }
            else {
                labels.shift();
                return getLabelFromObject(labels, prop);
            }
        }
    }

    return "";

}

function getJsonFromLanguage(language: Languages) {
    switch (language) {
        case 'PT':
            return pt;
    
        default:
            return en;
    }
}

export function getLabelByLanguage(label: string): string {
    const language = getSelectedLanguage();
    if (!language)
        return "";
    
    return getLabelFromObject(label.split("."), getJsonFromLanguage(language));
}