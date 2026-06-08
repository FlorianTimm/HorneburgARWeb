<template>
    <transition name="fade">

        <div id="infobox" v-if="text || header">


            <div id="infobox_header">
                <div id="infobox_header_left">
                    <h3 v-if="subheader && header">{{ header }}</h3>
                    <h4 v-else-if="header">{{ header }}</h4>
                    <h4 v-if="subheader">{{ subheader }}</h4>
                </div>
                <button id="infobox_minimize" v-if="visible && text" @click="visible = false"><img
                        src="@/assets/icons/minus.svg" :title="t('minimize')"></button>
                <button id="infobox_maximize" v-if="!visible && text" @click="visible = true"><img
                        src="@/assets/icons/plus.svg" :title="t('maximize')"></button>
            </div>

            <div v-if="visible && text" v-html="text" id="infobox_text"></div>

        </div>
    </transition>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


let props = defineProps<{
    header: string;
    subheader: string;
    text: string;
}>()

let visible = ref(false);
/*
watch(() => props.text, (newText) => {
    if (newText) {
        window.innerWidth <= 800 ? visible.value = false : visible.value = true;
    } else {
        visible.value = false;
    }
});*/

onMounted(() => {
    window.innerWidth <= 800 ? visible.value = false : visible.value = true;
});
</script>

<style scoped>
#infobox {
    --abstand: 2em;
    position: absolute;
    bottom: var(--abstand);
    right: var(--abstand);
    min-width: 15em;
    max-width: 40%;
    min-height: 3em;
    max-height: 90%;
    max-height: calc(100vh - 2 * var(--abstand) - 4em);
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 0.95);
    padding: 1.2em 1.2em 0em 1.2em;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 10;
    text-align: left;
    display: grid;
    grid-template-rows: auto 1fr;
}

#infobox #infobox_header,
#infobox #infobox_text {
    margin-bottom: 1.2em;

}

#infobox #infobox_text {
    overflow-y: auto;
    display: block;
    padding-right: 1em;
    margin-right: -1em;
}

#infobox h3 {
    font-size: 0.8em !important;
}

#infobox h4 {
    font-size: 1.1em !important;
}

@media (max-width: 800px) {
    #infobox {
        width: 90%;
        max-width: none;
        left: 5%;
        right: 5%;
        bottom: 1em;
        margin: 0px;
        box-sizing: border-box;
    }
}

#infobox_header {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.75em;
}

#infobox_header_left>h3 {
    margin-bottom: 0.7em;
}

#infobox_header_left>h4 {
    margin-bottom: 0;
}

#infobox_maximize,
#infobox_minimize {
    right: 0.5em;
    vertical-align: middle;
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 0.75em;
}

#infobox_maximize:hover,
#infobox_minimize:hover {
    filter: drop-shadow(0 0 4px rgb(13, 158, 0));
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

<style>
#infobox h4 {
    margin-top: 0;
    margin-bottom: 10px;
}

#infobox_text p {
    margin-bottom: 0.7em;
}
</style>
