import get from 'axios';

export type ModelJson = {
    name: string;
    path: string;
    longitude: number;
    latitude: number;
    rotation: number;
    breite: number;
    tiefe: number;
    hoehe: number;
};

export type GeoJsonFeature = {
    type: string;
    properties: {
        id: string;
        name: string;
        path: string;
        rotation: number;
        breite: number;
        tiefe: number;
        hoehe: number;
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
        liste[prop.id] = {
            name: prop.name,
            path: prop.path,
            rotation: prop.rotation,
            breite: prop.breite,
            tiefe: prop.tiefe,
            hoehe: prop.hoehe,
            longitude: geom.coordinates[0],
            latitude: geom.coordinates[1]
        };
    }
    return liste;
}