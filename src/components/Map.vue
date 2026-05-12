<template>
    <div id="map" ref="mapContainer">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Map, Marker, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();


const mapContainer = ref<HTMLDivElement | null>(null);
let map: Map | null = null;

interface MapProps {
    center?: [number, number];
    zoom?: number;
}

const props = defineProps<MapProps>();

onMounted(() => {
    if (mapContainer.value) {
        map = new Map({
            container: mapContainer.value,
            style: 'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_gry.json',
            center: props.center || [9.58769, 53.50963],
            zoom: props.zoom || 10
        });

        new Marker()
            .setLngLat(props.center || [9.58769, 53.50963])
            .setPopup(new Popup().setHTML(`Moin`))
            .addTo(map);
    }
});

onUnmounted(() => {
    if (map) {
        map.remove();
    }
});
</script>

<style lang="css" scoped>
#map {
    font-size: 0.8em;
    max-width: 100%;
    overflow: hidden;

}
</style>