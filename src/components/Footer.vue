<template>
    <footer>

        <div class="logos">
            <a href="https://www.horneburg.de" target="_blank" title="Flecken Horneburg"><img
                    src="../assets/logo_horneburg.png" alt="Flecken Horneburg" /></a>
            <a href="https://www.landkreis-stade.de" target="_blank" title="Landkreis Stade"><img
                    src="../assets/logo_stade.png" alt="Landkreis Stade" /></a>
            <a href="https://www.hcu-hamburg.de" target="_blank" title="HafenCity Universität Hamburg"><img
                    src="../assets/logo_hcu.png" alt="HafenCity Universität Hamburg" /></a>
        </div>
        <div class="footer-text">
            {{ $t('footer_line1') }}<br />{{ $t('footer_line2') }}
        </div>

        <div>
            <a href="https://www.horneburg.de/portal/seiten/Seite-900000001-20450.html" target="_blank">
                {{ $t('imprint') }}
            </a>&nbsp;&nbsp;
            <a href="https://www.horneburg.de/portal/seiten/Seite-900000002-20450.html" target="_blank">
                {{ $t('privacy') }}
            </a>
        </div>

    </footer>

</template>


<style lang="css" scoped>
footer {
    display: grid;
    grid-template-columns: auto auto auto;
    width: 100%;
    align-items: center;
    float: none;
    clear: both;
    text-align: center;
}

footer div {
    margin: 10px 0;
    text-align: left;
}

a:hover {
    text-decoration: underline;
}

a:hover img {
    filter: grayscale(0%);
}

footer img {
    filter: grayscale(100%);
    transition: filter 0.3s;
    height: 3em;
    margin-left: 20px;
}
</style>