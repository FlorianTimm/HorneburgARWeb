<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/artifacts"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ artifacts[artifact]?.getName($i18n.locale) }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div id="orbit-container"></div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonBackButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

import { onMounted } from 'vue';
import { ref } from 'vue';
import { ArtifactJson } from '@/func/artifacts_json';
import { JsonFile } from '@/func/json';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { artifact } = route.params as { artifact: string };
const artifacts: Ref<JsonFile<ArtifactJson>> = ref({});

onMounted(async () => {
    artifacts.value = await ArtifactJson.load_json();
});

</script>

<style scoped></style>
