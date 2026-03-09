import get from 'axios';

export class ModelJson {
    private _name: { [key: string]: string };
    private _description: { [key: string]: string };
    private _path: string;
    private _longitude: number;
    private _latitude: number;
    private _rotation: number;
    private _breite: number;
    private _tiefe: number;
    private _hoehe: number;
    private _show_in_list: boolean = true;

    constructor(name: { [key: string]: string }, description: { [key: string]: string }, path: string, longitude: number, latitude: number, rotation: number, breite: number, tiefe: number, hoehe: number, show_in_list: boolean = true) {
        this._name = name;
        this._description = description;
        this._path = path;
        this._longitude = longitude;
        this._latitude = latitude;
        this._rotation = rotation;
        this._breite = breite;
        this._tiefe = tiefe;
        this._hoehe = hoehe;
        this._show_in_list = show_in_list;
    }

    getName(locale: string = 'en'): string {
        return this._name[locale] || this._name['en'] || Object.values(this._name)[0] || 'Unknown';
    }

    getDescription(locale: string = 'en'): string {
        return this._description[locale] || this._description['en'] || Object.values(this._description)[0] || 'No description available.';
    }

    get path(): string {
        return this._path;
    }

    get longitude(): number {
        return this._longitude;
    }

    get latitude(): number {
        return this._latitude;
    }

    get rotation(): number {
        return this._rotation;
    }

    get breite(): number {
        return this._breite;
    }

    get tiefe(): number {
        return this._tiefe;
    }

    get hoehe(): number {
        return this._hoehe;
    }

    get show_in_list(): boolean {
        return this._show_in_list;
    }
};

export type GeoJsonFeature = {
    type: string;
    properties: {
        id: string;
        name: { [key: string]: string };
        description: { [key: string]: string };
        path: string;
        rotation: number;
        breite: number;
        tiefe: number;
        hoehe: number;
        show_in_list: boolean;
    },
    geometry: {
        type: string;
        coordinates: number[];
    }
};

export type GeoJson = {
    type: string;
    features: GeoJsonFeature[];
};

export type ModelleJson = { [key: string]: ModelJson };

export async function load_json(): Promise<ModelleJson> {
    let data: GeoJson = await get('/modelle/modelle.geojson').then(response => response.data);
    let liste: ModelleJson = {};
    for (let feature of data.features) {
        let prop = feature.properties;
        let geom = feature.geometry;
        liste[prop.id] = new ModelJson(
            prop.name,
            prop.description,
            prop.path,
            geom.coordinates[0],
            geom.coordinates[1],
            prop.rotation,
            prop.breite,
            prop.tiefe,
            prop.hoehe,
            prop.show_in_list
        );
    }
    return liste;
}