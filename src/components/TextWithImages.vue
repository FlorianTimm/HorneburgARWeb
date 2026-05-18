<template>
    <div class="textwithimages">
        <div id="text">
            <slot> </slot>
        </div>
        <div id="images">
            <a v-for="(image, index) in images" :key="index" class="image-container" :href="image.src"
                @click="fullScreen(image.src, image.description[locale.split('-')[0] ?? 'de'], $event);"
                :title="image.description[locale.split('-')[0] ?? 'de']">
                <img :src="image.src" :alt="image.description[locale.split('-')[0] ?? 'de']"
                    class="textwithimages-image" />
                <span v-if="images.length > 0" class="image-description">
                    {{ image.description[locale.split('-')[0] ?? 'de'] }}
                </span>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import fullScreen from '@/func/imageHelper';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

defineProps<{
    images: {
        src: string;
        description: { [language: string]: string };
    }[]
}>()
</script>


<style scoped>
.textwithimages {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 4em;
}

.textwithimages>div {
    display: flex;
    flex-direction: column;
    justify-content: top;
    gap: 2em;
}



.image-container {
    width: 30vw;
    cursor: pointer;
}

.image-container:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
    transition: transform 0.3s ease, filter 0.3s ease;
}

img {
    max-width: 100%;
    height: auto;
}

#text {
    max-width: 800px;
}

#images {
    max-width: 300px;
}

.image-description {
    text-align: center;
    font-size: 0.9em;
    margin-top: 0.5em;
    line-height: inherit;
}

@media(max-width: 800px) {
    .textwithimages {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }

    #images>* {
        width: 100%;
    }
}
</style>