<template>
    <DefaultPage headertype="object" :footer="false" fullscreen>
        <template #header_left>
            <button @click="$router.push('/artifacts')" :title="t('close')"><img src="@/assets/icons/close.svg"
                    :alt="t('close')"></button>
        </template>
        <template #header_center>
            <h1>{{ artifacts[artifact]?.getName(locale) }}</h1>
        </template>

        <template #header_right>
            <div id="vorzurueck">
                <button @click="vorheriges()" :title="t('previous')"><img src="@/assets/icons/arrow_left.svg"
                        :alt="t('previous')"></button>
                <button @click="naechstes()" :title="t('next')"><img src="@/assets/icons/arrow_right.svg"
                        :alt="t('next')"></button>
            </div>
        </template>

        <template #fullscreen>
            <div id="imgmap"></div>
            <Infobox :header="artifacts[artifact]?.getName(locale) ?? ''" subheader=""
                :text="artifacts[artifact]?.getDescription(locale) ?? ''" />
            <div id="img_select" v-if="(artifacts[artifact]?.images?.length ?? 0) > 1">
                <button v-for="(image, index) in artifacts[artifact]?.images ?? []" :key="index"
                    :title="`${t('image')} ${index + 1}`" @click="changeImg(image)"
                    :class="{ 'active': currentImage === image }">
                    <img :src="image.previewUrl" :alt="`${t('image')} ${index + 1}`" />
                </button>
            </div>
            <div id="description" v-if="currentImage?.description">{{ currentImage?.description }}</div>
        </template>
    </DefaultPage>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';
import { ArtifactJson, Image as ArtifactImage } from '@/func/artifacts_json';
import { type JsonFile } from '@/func/json';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';
import DefaultPage from '@/components/DefaultPage.vue';

import Map from 'ol/Map';
import View from 'ol/View';
import { getCenter } from 'ol/extent';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import 'ol/ol.css';

import router from '@/router'

import { useI18n } from 'vue-i18n'
import Infobox from '@/components/Infobox.vue';
const { t, locale } = useI18n()


const route = useRoute();
const { artifact } = route.params as { artifact: string };
const artifacts: Ref<JsonFile<ArtifactJson>> = ref({});

let map: Map;

let currentImage = ref<ArtifactImage | null>(null);

onMounted(async () => {
    artifacts.value = await ArtifactJson.load_json();

    map = new Map({
        target: 'imgmap',
    });

    changeImg(artifacts.value[artifact]?.images[0]);
});


function changeImg(img?: ArtifactImage) {
    if (!img) return;
    let imgElement = new Image();
    currentImage.value = img;
    imgElement.src = img.imageUrl;
    imgElement.onload = function () {
        const extent = [0, 0, imgElement.width, imgElement.height];
        const mapExtent = [-imgElement.width, -imgElement.height, imgElement.width * 2, imgElement.height * 2];
        const projection = new Projection({
            code: 'xkcd-image',
            units: 'pixels',
            extent: extent,
        });

        const imageLayer = new ImageLayer({
            source: new Static({
                url: img.imageUrl,
                projection: projection,
                imageExtent: extent,
            }),
        });

        const view = new View({
            projection: projection,
            center: getCenter(extent),
            zoom: 2,
            maxZoom: 5,
            extent: mapExtent
        });

        const map_width = ((map.getSize() ?? [0, 0])[0] ?? 1000);

        let padding_right = 0;
        if (map_width > 800) {
            padding_right = map_width * 0.4;
        }

        view.fit(extent, { size: map.getSize(), padding: [0, padding_right, 0, 0] });

        map.setView(view);

        // remove old layers
        map.getLayers().forEach(layer => {
            map.removeLayer(layer);
        });

        map.addLayer(imageLayer);
    };
}

function vorheriges() {


    let keys = Object.keys(artifacts.value);

    let index = keys.indexOf(artifact);



    index--;
    if (index < 0) {
        index = keys.length - 1;
    }


    if (index >= 0 && index < keys.length) {
        let nextArtifact = keys[index];
        router.push(`/artifacts/${nextArtifact}`);
    }
}

function naechstes() {
    let keys = Object.keys(artifacts.value);
    let index = keys.indexOf(artifact);

    index++;

    if (index >= keys.length) {
        index = 0;
    }


    if (index >= 0 && index < keys.length) {
        let nextArtifact = keys[index];
        router.push(`/artifacts/${nextArtifact}`);
    }
}


</script>

<style scoped>
#vorzurueck {
    display: flex;
    gap: 0.5rem;
}

#imgmap {
    width: 100%;
    height: 100%;
}

#img_select {
    position: absolute;
    top: 15rem;
    left: 0.5rem;
    transform: translateY(-50%);
}

#img_select button {
    display: block;
    background: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.2rem;
    margin: 0.5rem 0.5rem;
}

#img_select button.active {
    border-color: #555;
    background-color: rgba(0, 0, 0, 0.3);
}

#img_select button:hover {
    background-color: rgba(0, 0, 0, 0.3);
}

#img_select button:hover img {
    filter: drop-shadow(0 0 5px rgba(82, 82, 82, 0.8));
}

#img_select img {
    height: 5rem;
    width: auto;
}

#description {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    max-width: 40%;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1rem;
    border-radius: 4px;
}

@media (max-width: 800px) {
    #description {
        top: 4.5rem;
        right: 0.5rem;
        bottom: auto;
        left: auto;
        max-width: calc(100% - 5rem);
        font-size: 0.8rem;
        padding: 0.3rem;
    }
}
</style>