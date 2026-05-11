<template>
    <header v-if="type === 'object' || type === 'ar'" id="header_object">
        <div id="left">
            <slot name="left"></slot>
        </div>
        <div id="center">
            <slot name="center"></slot>
        </div>
        <div id="right">
            <slot name="right"></slot>
        </div>
    </header>

    <header v-if="type === 'default'" id="header_default">
        <div id="left_container">
            <div id="left">
                <slot name="left"></slot>
            </div>
            <div id="center">
                <slot name="center"></slot>
            </div>
        </div>
        <div id="right">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script lang="ts" setup>
let props = defineProps<{
    type?: "default" | "object" | "ar";
}>()

let background: string;
switch (props.type) {
    case "object":
        background = "#fff";
        break;
    case "ar":
        background = "rgba(255, 255, 255, 0.8)";
        break;
    default:
        background = "inherit";
}
</script>

<style scoped>
#header_object,
#header_default {
    width: 100%;
    height: 60px;
    display: grid;
    align-items: center;
    background-color: v-bind(background);
}

#header_object {
    grid-template-columns: 1fr 3fr 1fr;
}

#header_default {
    grid-template-columns: 3fr 1fr;
    max-width: 1700px;
    margin: 20px auto;
    margin-top: 0;
}

#left {
    display: flex;
    align-items: flex-start;
    padding-left: 20px;
}

#center {
    display: flex;
    justify-content: flex-start;
}

#right {
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
}

#left_container {
    display: grid;
    grid-template-rows: auto auto;
}

#left_container #left {
    align-items: flex-start;
    z-index: 10;
}

#left_container #center {
    align-items: flex-start;
    padding-left: 30px;
}
</style>


<style>
#header_default button,
#header_object button {
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
}

#header_default #center h1,
#header_object #center h1 {
    font-size: 20px;
    font-weight: 500;
}
</style>