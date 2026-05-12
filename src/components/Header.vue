<template>
    <header v-if="type === 'homepage'" id="header_homepage">
        <div id="left">
            <slot name="left"></slot>
        </div>
        <div id="right">
            <slot name="right"></slot>
        </div>
    </header>

    <header v-if="type === 'object'" id="header_object">
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

    <header v-if="type === 'ar'" id="header_ar">
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
    type?: "default" | "object" | "ar" | "homepage";
}>()

let background: string;
switch (props.type) {
    case "object":
        background = "#fff";
        break;
    case "ar":
        background = "rgba(255, 255, 255, 0.8)";
        break;
    case "homepage":
        background = "inherit";
        break;
    default:
        background = "inherit";
}
</script>

<style scoped>
header {
    height: 4em;
    display: grid;
    align-items: center;
    background-color: v-bind(background);
    margin: 0 var(--margin-sides);

}

#header_ar {
    z-index: 20;
    position: absolute;
    top: 0;
}

#header_homepage {
    display: grid;
    grid-template-columns: 1fr auto;
    height: auto;
    align-items: center;
    border: none;
    border-bottom: 2px solid #999;
    padding-top: 1.5em;
}

@media (max-width: 800px) {
    #header_homepage {
        grid-template-columns: auto;
        grid-template-rows: auto auto;
        padding-bottom: 20px;
    }

    #header_homepage #right {
        justify-content: left;
    }
}

#header_object,
#header_ar {
    width: 100%;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 2em;
    margin: 0;
    padding: 0 var(--margin-sides);
}

#header_default {
    grid-template-columns: 3fr 1fr;
}

#left {
    display: flex;
    align-items: flex-start;
}

#center {
    display: flex;
    justify-content: flex-start;
}

#right {
    display: flex;
    justify-content: flex-end;
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
}
</style>


<style>
#header_default button,
#header_ar button,
#header_object button,
#header_homepage button {
    background: none;
    border: none;
    cursor: pointer;
}

#header_default #center h1,
#header_homepage #right h1,
#header_ar #center h1,
#header_object #center h1 {
    font-size: 1em;
}
</style>