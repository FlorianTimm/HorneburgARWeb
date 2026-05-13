<template>
    <transition name="fade">

        <div id="infobox" v-if="text || header">
            <button id="infobox_minimize" v-if="visible && text" @click="visible = false"><img
                    src="@/assets/icons/minus.svg" :title="t('minimize')"></button>
            <button id="infobox_maximize" v-if="!visible && text" @click="visible = true"><img
                    src="@/assets/icons/plus.svg" :title="t('maximize')"></button>
            <h3 v-if="header">{{ header }}</h3>
            <span v-if="visible && text" v-html="text"></span>

        </div>
    </transition>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


let props = defineProps<{
    header: string;
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
    position: absolute;
    bottom: 4em;
    right: 1em;
    min-width: 15em;
    max-width: 40%;
    min-height: 3em;
    max-height: 30em;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 0.95);
    padding: 1em 1em;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 10;
    text-align: left;
}

#infobox h3 {
    margin-top: 0;
    margin-bottom: 0.5em;
}

@media (max-width: 800px) {
    #infobox {
        width: 90%;
        max-width: none;
        left: 5%;
        right: 5%;
        top: inherit;
        bottom: 1em;
        margin: 0px;
        box-sizing: border-box;
    }
}

#infobox_maximize,
#infobox_minimize {
    position: absolute;
    top: 1em;
    right: 0.5em;
    background: none;
    border: none;
    cursor: pointer;
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
</style>
