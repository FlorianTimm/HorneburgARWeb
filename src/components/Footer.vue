<template>
    <footer>
        <div>
            <div>
                <a href="https://www.horneburg.de" target="_blank" title="Flecken Horneburg"><img
                        src="../assets/logo_horneburg.png" alt="Flecken Horneburg" /></a>
                <a href="https://www.landkreis-stade.de" target="_blank" title="Landkreis Stade"><img
                        src="../assets/logo_stade.png" alt="Landkreis Stade" /></a>
                <a href="https://www.hcu-hamburg.de" target="_blank" title="HafenCity Universität Hamburg"><img
                        src="../assets/logo_hcu.png" alt="HafenCity Universität Hamburg" /></a>
            </div>
            <div>
                {{ $t('footer_line1') }}<br />{{ $t('footer_line2') }}
            </div>

            <div>
                <a href="https://www.horneburg.de/portal/seiten/Seite-900000001-20450.html" target="_blank"
                    class="footer-link">
                    {{ $t('imprint') }}
                </a>&nbsp;&nbsp;
                <a href="https://www.horneburg.de/portal/seiten/Seite-900000002-20450.html" target="_blank"
                    class="footer-link">
                    {{ $t('privacy') }}
                </a>
            </div>
        </div>
    </footer>

</template>


<style lang="css" scoped>
footer {
    float: none;
    clear: both;
    text-align: center;
}


.footer-text {
    font-size: 0.8em;
    color: #555;
}

.footer-link {
    font-size: 0.8em;
    color: #555;
    text-decoration: none;
}

.footer-link:hover {
    text-decoration: underline;
}

footer img {
    filter: grayscale(100%);
    transition: filter 0.3s;
    height: 35px;
    margin-left: 20px;
}
</style>