import { JsonEntry } from './json';
import get from 'axios';

export class ArtifactJson extends JsonEntry {

    constructor(name: { [key: string]: string }, description: { [key: string]: string }, img_path: string, svg_path: string) {
        super(name, description, img_path, svg_path);

    }

    public static async load_json(): Promise<{ [key: string]: ArtifactJson }> {
        let data: { [key: string]: any } = await get('/artifacts/artifacts.json').then(response => response.data);
        let liste: { [key: string]: ArtifactJson } = {};
        for (let key in data) {
            let entry = data[key];
            liste[key] = new ArtifactJson(
                entry.name,
                entry.description,
                entry.img_path,
                entry.svg_path
            );
        }
        return liste;
    }

}

