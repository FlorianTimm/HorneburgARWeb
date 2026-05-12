import { JsonEntry } from './json';
import get from 'axios';

export class ArtifactJson extends JsonEntry {
    private _images: {
        'large': string,
        'small': string
    }[] = [];

    constructor(name: { [key: string]: string }, description: { [key: string]: string }, images: { large: string, small: string }[]) {
        super(name, description);
        this._images = images;
    }

    public static async load_json(): Promise<{
        [key: string]: ArtifactJson
    }> {
        let data: { [key: string]: any } = await get('/artifacts/artifacts.json').then(response => response.data);
        let liste: { [key: string]: ArtifactJson } = {};
        for (let key in data) {
            let entry = data[key];
            liste[key] = new ArtifactJson(
                entry.name,
                entry.description,
                entry.images
            );
        }
        return liste;
    }

    get images(): { large: string, small: string }[] {
        return this._images;
    }

    getPreviewImage(index: number = 0): string {
        if (this._images.length > 0) {
            return this._images[index]?.small ?? '';
        }
        return '';
    }

}

