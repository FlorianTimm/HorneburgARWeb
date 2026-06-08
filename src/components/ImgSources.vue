<template>
    <div id="sources">
        <h4>{{ t('sources') }}</h4>
        <span v-html="sources"></span>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

defineProps<{
    sources: string;
}>()

</script>

<style scoped>
#sources {
    color: #555;
    margin-top: 2rem;
}

#sources h4 {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

#sources span {
    font-size: 0.8rem;
}
</style>

<style>
#sources p {
    margin-bottom: 0.5rem;
}
</style>