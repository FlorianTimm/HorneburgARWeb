import axios from 'axios';

export type ModelJson = {
    name: string;
    path: string;
    longitude: number;
    latitude: number;
    rotation: number;
};

export type ModelleJson = { [key: string]: ModelJson };

export async function load_json(): Promise<ModelleJson> {
    return axios.get('/modelle/modelle.json').then(response => response.data);
}