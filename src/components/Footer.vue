<template>
    <footer>

        <div id="footer-logos">
            <a href="https://www.horneburg.de" target="_blank" title="Flecken Horneburg"><img
                    src="../assets/logos/flecken_horneburg_rgb.svg" alt="Flecken Horneburg" /></a>
            <a href="https://www.landkreis-stade.de" target="_blank" title="Landkreis Stade"><img
                    src="../assets/logos/landkreis_stade_rgb.svg" alt="Landkreis Stade" /></a>
            <a href="https://www.hcu-hamburg.de" target="_blank" title="HafenCity Universität Hamburg"><img
                    src="../assets/logos/hcu_rgb.svg" alt="HafenCity Universität Hamburg" /></a>
        </div>
        <div id="footer-text">
            {{ t('footer_line1') }}<br />{{ t('footer_line2') }}
        </div>

        <div id="footer-links">
            <a href="https://www.horneburg.de/portal/seiten/Seite-900000001-20450.html" target="_blank">
                {{ t('imprint') }}
            </a>&nbsp;&nbsp;
            <a href="https://www.horneburg.de/portal/seiten/Seite-900000002-20450.html" target="_blank">
                {{ t('privacy') }}
            </a>
        </div>

    </footer>

</template>


<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>


<style lang="css" scoped>
footer {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 2em;
    width: 100%;
    align-items: center;
    float: none;
    clear: both;
    background-color: #fff;
    box-sizing: border-box;
    padding: 1em var(--margin-sides);
    text-align: left;
    font-size: 0.8em;
}

#footer-logos {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 2em;
    justify-content: center;
}

@media (max-width: 800px) {
    footer {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
    }

    #footer-text {
        justify-self: center;
    }

    #footer-links {
        justify-self: center;
    }
}

a:hover {
    text-decoration: underline;
}

a:hover img {
    filter: grayscale(0%) contrast(100%) brightness(100%);
}

footer img {
    filter: grayscale(100%) contrast(80%) brightness(140%);
    transition: filter 0.3s;
    height: 3em;
}
</style>