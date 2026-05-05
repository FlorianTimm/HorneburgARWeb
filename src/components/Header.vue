<template>
    <header>
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="center">
            <slot name="center"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    height: 60px;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
}


.left {
    display: flex;
    align-items: flex-start;
    padding-left: 20px;
}

.center {
    display: flex;
    justify-content: flex-start;
}

.right {
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
}
</style>


<style>
header button {
    background: none;
    border: none;
    font-size: 2.5em;
    cursor: pointer;
}

header .center h1 {
    font-size: 20px;
    font-weight: 500;
}
</style>