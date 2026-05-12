<template>
    <transition name="fade">

        <div v-if="visible" id="infobox">
            <button id="infobox_close" @click="visible = false"><img src="@/assets/icons/close.svg"
                    :alt="t('close')"></button>
            <span v-html="text"></span>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


let props = defineProps<{
    text: string;
}>()

let visible = ref(false);

watch(() => props.text, (newText) => {
    if (newText) {
        visible.value = true;
    } else {
        visible.value = false;
    }
});
</script>

<style scoped>
#infobox {
    position: absolute;
    bottom: 4em;
    right: 1em;
    min-width: 15em;
    max-width: 40%;
    min-height: 7em;
    max-height: 30em;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 0.95);
    padding: 2em 1em;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 10;
    text-align: left;
}

@media (max-width: 800px) {
    #infobox {
        width: 90%;
        max-width: none;
        left: 5%;
        right: 5%;
        top: inherit;
        bottom: -5px;
        margin: 0px;
        box-sizing: border-box;
    }
}

#infobox_close {
    position: absolute;
    top: 10px;
    right: 10px;
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
