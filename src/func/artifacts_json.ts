import { JsonEntry } from './json';
import get from 'axios';
import { useI18n } from 'vue-i18n';

export class ArtifactJson extends JsonEntry {
    private _images: Image[] = [];

    constructor(name: { [key: string]: string }, description: { [key: string]: string }, images: { large: string, small?: string, description?: { [key: string]: string } }[]) {
        super(name, description);
        this._images = images.map(img => new Image(img.large, img.small, img.description));
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

    get images(): Image[] {
        return this._images;
    }

    getPreviewImage(index: number = 0): string {
        if (this._images.length > 0) {
            let img = this._images[index];
            if (img) {
                return img.previewUrl;
            }
        }
        return '';
    }

}

export class Image {
    private _large: string
    private _small?: string
    private _description?: {
        [key: string]: string
    }

    constructor(large: string, small?: string, description?: { [key: string]: string }) {
        this._large = large;
        this._small = small;
        this._description = description;
    }

    get large(): string {
        return this._large;
    }

    get small(): string | undefined {
        return this._small;
    }

    get description(): string | undefined {
        if (this._description) {
            const { t, locale } = useI18n()
            return this._description[locale.value] || this._description['de'];
        }
    }

    get previewUrl(): string {
        return this._small || this._large;
    }

    get imageUrl(): string {
        return this._large;
    }
}