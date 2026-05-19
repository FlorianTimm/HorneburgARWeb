import get from 'axios';
import { JsonEntry, type JsonFile } from './json';


export class ModelJson extends JsonEntry {
    private _subheader: { [key: string]: string };
    private _path: string;
    private _svgPath: string;
    private _longitude: number;
    private _latitude: number;
    private _rotation: number;
    private _breite: number;
    private _tiefe: number;
    private _hoehe: number;
    private _show_in_list: boolean = true;

    private static _cache?: Promise<JsonFile<ModelJson>>;

    constructor(name: { [key: string]: string }, subheader: { [key: string]: string }, description: { [key: string]: string }, path: string, svg_path: string, longitude: number, latitude: number, rotation: number, breite: number, tiefe: number, hoehe: number, show_in_list: boolean = true) {
        super(name, description);
        this._subheader = subheader;
        this._path = path;
        this._svgPath = svg_path;
        this._longitude = longitude;
        this._latitude = latitude;
        this._rotation = rotation;
        this._breite = breite;
        this._tiefe = tiefe;
        this._hoehe = hoehe;
        this._show_in_list = show_in_list;
    }


    get path(): string {
        return this._path;
    }

    get svg_path(): string {
        return this._svgPath;
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

    getSubheader(locale: string = 'en'): string {
        locale = locale.split('-')[0] ?? 'de'; // Nur die Sprache, ohne Region
        return this._subheader[locale] || this._subheader['en'] || Object.values(this._subheader)[0] || 'No subheader available.';
    }

    public static async load_json(): Promise<JsonFile<ModelJson>> {
        if (!this._cache) {
            this._cache = get('/modelle/modelle.geojson')
                .then(response => response.data as GeoJson)
                .then(data => {
                    let liste: JsonFile<ModelJson> = {};
                    for (let feature of data.features) {
                        let prop = feature.properties;
                        let geom = feature.geometry;
                        liste[prop.id] = new ModelJson(
                            prop.name,
                            prop.subheader,
                            prop.description,
                            prop.path,
                            prop.svg_path,
                            geom.coordinates[0] ?? 0,
                            geom.coordinates[1] ?? 0,
                            prop.rotation,
                            prop.breite,
                            prop.tiefe,
                            prop.hoehe,
                            prop.show_in_list
                        );
                    }
                    return liste;
                });
        }
        return this._cache;
    }
};

export type GeoJsonFeature = {
    type: string;
    properties: {
        id: string;
        name: { [key: string]: string };
        subheader: { [key: string]: string };
        description: { [key: string]: string };
        path: string;
        rotation: number;
        breite: number;
        tiefe: number;
        hoehe: number;
        show_in_list: boolean;
        svg_path: string;
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