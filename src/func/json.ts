export class JsonEntry {
    private _name: { [key: string]: string };
    private _description: { [key: string]: string };
    private _path: string;

    constructor(name: { [key: string]: string }, description: { [key: string]: string }, path: string) {
        this._name = name;
        this._description = description;
        this._path = path;
    }

    getName(locale: string = 'en'): string {
        locale = locale.split('-')[0]; // Nur die Sprache, ohne Region
        return this._name[locale] || this._name['en'] || Object.values(this._name)[0] || 'Unknown';
    }

    getDescription(locale: string = 'en'): string {
        locale = locale.split('-')[0]; // Nur die Sprache, ohne Region
        return this._description[locale] || this._description['en'] || Object.values(this._description)[0] || 'No description available.';
    }

    get path(): string {
        return this._path;
    }

}

export type JsonFile<T extends JsonEntry> = { [key: string]: T };