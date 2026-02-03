import get from 'axios';

export type ModelJson = {
    name: string;
    path: string;
    longitude: number;
    latitude: number;
    rotation: number;
};

export type ModelleJson = { [key: string]: ModelJson };

export async function load_json(): Promise<ModelleJson> {
    return get('/modelle/modelle.json').then(response => response.data);
}