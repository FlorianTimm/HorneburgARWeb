<template>
    <DefaultPage>
        <template #header_left>
            <button @click="$router.push('/#main')"><img src="@/assets/icons/arrow_long.svg"
                    :title="t('back')"></button>
        </template>
        <template #header_center>
            <h1>{{ t('privacy') }}</h1>
        </template>
        <template #main>
            <article v-html="t('privacy_html')" id="text" />

            <div class="innen" style="padding:0px;background:transparent;">
                <p><strong>I. Name und Anschrift des Verantwortlichen</strong><br><br>Der Verantwortliche im Sinne der
                    Datenschutz-Grundverordnung und sonstiger datenschutzrechtlicher Bestimmungen ist die:</p>
                <p>Samtgemeinde Horneburg<br>Samtgemeindebürgermeister Knut Willenbockel<br>Lange Straße 47/49<br>21640
                    Horneburg<br>Telefon:
                <div style="display:inline-block;cursor:pointer;padding-left:3px;-webkit-border-radius: 8px;-webkit-box-shadow: 0 1px 1px #ddd, 0 1px 1px #555;box-shadow: 0 1px 1px #ddd, 0 1px 1px #555;white-space: nowrap;position:relative;padding-right:20px;"
                    title="Call: +49 (0) 4163 8079-0" class="DetectedNumber">+49 (0) 4163 8079-0<img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3gcWEAU3+l7xlgAAApJJREFUOMuVkk1IVGEUht/z3TuO482s1FTIJH8wQYXsnzLLhZUWEtYuClqYiwosSyhJIZJiNkUZLoxaFEJZbQzKRQSGVIgI5cLf0HGc1HG8c0fHmTv3+75WQkSL67s85zzP5j0Emyls/upIS3LWqYqyvByJdX1p3GkAgGpXkODAoZVIrAVkuVxOtRDAVQBgduDi272aynB2ak7f+MsXcC2GVmoP3u8/Z1sQryBvIbh0hHNOBAHfgqGZMV6d0/Q90ZYgHI0VmKaZKQWHFAKQHN553RGzuMOWwAibwUg0NigF51IKSCG54NbPqXv7A7YEUdPs4UKcgeSDUnBAckOC3mCtyavv7kyt7ZJpde9erc6YXfiou6/EwVAmBQ9JwdvXJDj18Ft6JBJt9etGCknRJkG9qztbj2SEli9N+fzllmVNMKY88OfXxJIea+CWAP19WNbywZmXtSWNS8w8u1BoHWh670hK1Go8s4GO6Tk9zBTluKvi+uDp3FKuOlcwujgNZRWudn9OSdmwrsHjm2tI0pxeV9GJiYzUTdXzi4Z7zPNbYQpr1HMbe87vLuVR1YPZ8DxmlgJQ993oUjIzNm9fiZgdfQNDJXoo7FjUjbaCnK3Dk775PcPj0/FE1CSFeOFaH7LCIoRAQMWCCKK56AnU9NTkyoAedA8MjeZbXIIYw9ikN3t8aiZbAn7G1DsgeqR31nFthwuRcALai19ixPqB7ORtUFju4Ysj45NVFudEAAgSIAJB6gqjeiI8D76+bAJAbK8Fv+qDh4+gKqsSxz5WgLSTrcWQ0k1E5SBSiRgnxvpB7Kbx9tqnfxtR7hKkxkCOOHBDgwqJIIBWQD4FKbtA5JVCdEONm/hfpfyWBK5wQHBAGPgDf9c6qAYOxxMAAAAASUVORK5CYII="
                        style="display: inline-block; width: initial; border: 0px; padding: 0px; margin: 0px; float: right; bottom: 1px; right: 1px; position: absolute; background-color:rgba(0,0,0,0);"
                        class="DetectedNumberImg"></div><br>Telefax: <div
                    style="display:inline-block;cursor:pointer;padding-left:3px;-webkit-border-radius: 8px;-webkit-box-shadow: 0 1px 1px #ddd, 0 1px 1px #555;box-shadow: 0 1px 1px #ddd, 0 1px 1px #555;white-space: nowrap;position:relative;padding-right:20px;"
                    title="Call: +49 (0) 4163 8079-77" class="DetectedNumber">+49 (0) 4163 8079-77<img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3gcWEAU3+l7xlgAAApJJREFUOMuVkk1IVGEUht/z3TuO482s1FTIJH8wQYXsnzLLhZUWEtYuClqYiwosSyhJIZJiNkUZLoxaFEJZbQzKRQSGVIgI5cLf0HGc1HG8c0fHmTv3+75WQkSL67s85zzP5j0Emyls/upIS3LWqYqyvByJdX1p3GkAgGpXkODAoZVIrAVkuVxOtRDAVQBgduDi272aynB2ak7f+MsXcC2GVmoP3u8/Z1sQryBvIbh0hHNOBAHfgqGZMV6d0/Q90ZYgHI0VmKaZKQWHFAKQHN553RGzuMOWwAibwUg0NigF51IKSCG54NbPqXv7A7YEUdPs4UKcgeSDUnBAckOC3mCtyavv7kyt7ZJpde9erc6YXfiou6/EwVAmBQ9JwdvXJDj18Ft6JBJt9etGCknRJkG9qztbj2SEli9N+fzllmVNMKY88OfXxJIea+CWAP19WNbywZmXtSWNS8w8u1BoHWh670hK1Go8s4GO6Tk9zBTluKvi+uDp3FKuOlcwujgNZRWudn9OSdmwrsHjm2tI0pxeV9GJiYzUTdXzi4Z7zPNbYQpr1HMbe87vLuVR1YPZ8DxmlgJQ993oUjIzNm9fiZgdfQNDJXoo7FjUjbaCnK3Dk775PcPj0/FE1CSFeOFaH7LCIoRAQMWCCKK56AnU9NTkyoAedA8MjeZbXIIYw9ikN3t8aiZbAn7G1DsgeqR31nFthwuRcALai19ixPqB7ORtUFju4Ysj45NVFudEAAgSIAJB6gqjeiI8D76+bAJAbK8Fv+qDh4+gKqsSxz5WgLSTrcWQ0k1E5SBSiRgnxvpB7Kbx9tqnfxtR7hKkxkCOOHBDgwqJIIBWQD4FKbtA5JVCdEONm/hfpfyWBK5wQHBAGPgDf9c6qAYOxxMAAAAASUVORK5CYII="
                        style="display: inline-block; width: initial; border: 0px; padding: 0px; margin: 0px; float: right; bottom: 1px; right: 1px; position: absolute; background-color:rgba(0,0,0,0);"
                        class="DetectedNumberImg"></div><br>E-Mail: <a
                    href="mailto:info@horneburg.de">info@horneburg.de</a><br>Internet: <a
                    href="https://https//horneburg.de/" target="_blank" rel="noopener">https://horneburg.de/</a></p>
                <p><br><strong>II. Name und Anschrift des Datenschutzbeauftragten</strong><br><br>Der
                    Datenschutzbeauftragte des Verantwortlichen ist:</p>
                <p>Behördlicher Datenschutzbeauftragter der Samtgemeinde Horneburg<br>Lange Straße 47/49<br>21640
                    Horneburg<em><br></em></p>
                <p>E-Mail: <a class="link_katalog email nolis-link-intern nolis-link-mailto"
                        href="mailto:%64%61%74%65%6E%73%63%68%75%74%7A%40%68%6F%72%6E%65%62%75%72%67%2E%64%65"
                        title="datenschutz@horneburg.de">datenschutz@horneburg.de</a></p>
                <p><br><strong>III. Allgemeines zur Datenverarbeitung</strong><br><br>1. Umfang der Verarbeitung
                    personenbezogener Daten<br>Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur,
                    soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen
                    erforderlich ist. Die Verarbeitung personenbezogener Daten unserer Nutzer erfolgt regelmäßig nur
                    nach Einwilligung des Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige
                    Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der
                    Daten durch gesetzliche Vorschriften gestattet ist.<br><br>2. Rechtsgrundlage für die Verarbeitung
                    personenbezogener Daten<br>Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine
                    Einwilligung der betroffenen Person einholen, dient Art. 6 Abs. 1 lit. a
                    EU-Datenschutzgrundverordnung (DSGVO) als Rechtsgrundlage. Bei der Verarbeitung von
                    personenbezogenen Daten, die zur Erfüllung eines Vertrages, dessen Vertragspartei die betroffene
                    Person ist, erforderlich ist, dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage. Dies gilt auch
                    für Verarbeitungsvorgänge, die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind. Soweit
                    eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung erforderlich
                    ist, der unser Unternehmen unterliegt, dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage. Für den
                    Fall, dass lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person
                    eine Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als
                    Rechtsgrundlage. Ist die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens
                    oder eines Dritten erforderlich und überwiegen die Interessen, Grundrechte und Grundfreiheiten des
                    Betroffenen das erstgenannte Interesse nicht, so dient Art. 6 Abs. 1 lit. f DSGVO als
                    Rechtsgrundlage für die Verarbeitung. <br><br>3. Datenlöschung und Speicherdauer<br>Die
                    personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der
                    Speicherung entfällt. Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den
                    europäischen oder nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen
                    Vorschriften, denen der Verantwortliche unterliegt, vorgesehen wurde. Eine Sperrung oder Löschung
                    der Daten erfolgt auch dann, wenn eine durch die genannten Normen vorgeschriebene Speicherfrist
                    abläuft, es sei denn, dass eine Erforderlichkeit zur weiteren Speicherung der Daten für einen
                    Vertragsabschluss oder eine Vertragserfüllung besteht.<br><br><strong>IV. Bereitstellung der Website
                        und Erstellung von Logfiles</strong><br><br>1. Beschreibung und Umfang der
                    Datenverarbeitung<br>Bei jedem Aufruf unserer Internetseite erfasst unser System automatisiert Daten
                    und Informationen vom Computersystem des aufrufenden Rechners.<br><br>Folgende Daten werden hierbei
                    erhoben:<br>(1) Informationen über den Browsertyp und die verwendete Version<br>(2) Das
                    Betriebssystem des Nutzers<br>(3) Den Internet-Service-Provider des Nutzers<br>(4) Die IP-Adresse
                    des Nutzers<br>(5) Datum und Uhrzeit des Zugriffs<br>(6) Websites, von denen das System des Nutzers
                    auf unsere Internetseite gelangt <br>(7) Websites, die vom System des Nutzers über unsere Website
                    aufgerufen werden<br>Die Daten werden ebenfalls in den Logfiles unseres Systems gespeichert. Eine
                    Speicherung dieser Daten zusammen mit anderen personenbezogenen Daten des Nutzers findet nicht
                    statt.<br><br>2. Rechtsgrundlage für die Datenverarbeitung<br>Rechtsgrundlage für die vorübergehende
                    Speicherung der Daten und der Logfiles ist Art. 6 Abs. 1 lit. f DSGVO.<br><br>3. Zweck der
                    Datenverarbeitung<br>Die vorübergehende Speicherung der IP-Adresse durch das System ist notwendig,
                    um eine Auslieferung der Website an den Rechner des Nutzers zu ermöglichen. Hierfür muss die
                    IP-Adresse des Nutzers für die Dauer der Sitzung gespeichert bleiben. <br><br>Die Speicherung in
                    Logfiles erfolgt, um die Funktionsfähigkeit der Website sicherzustellen. Zudem dienen uns die Daten
                    zur Optimierung der Website und zur Sicherstellung der Sicherheit unserer informationstechnischen
                    Systeme. Eine Auswertung der Daten zu Marketingzwecken findet in diesem Zusammenhang nicht statt.
                    <br>In diesen Zwecken liegt auch unser berechtigtes Interesse an der Datenverarbeitung nach Art. 6
                    Abs. 1 lit. f DSGVO.<br><br>4. Dauer der Speicherung<br>Die Daten werden gelöscht, sobald sie für
                    die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Im Falle der Erfassung der
                    Daten zur Bereitstellung der Website ist dies der Fall, wenn die jeweilige Sitzung beendet ist.
                    <br><br>Im Falle der Speicherung der Daten in Logfiles ist dies nach spätestens zehn Tagen der Fall.
                    Eine darüberhinausgehende Speicherung im Zusammenhang mit Datensicherungen ist möglich, in diesem
                    Fall beträgt die maximale Dauer der Speicherung sechs Monate.<br><br>5. Widerspruchs- und
                    Beseitigungsmöglichkeit<br>Die Erfassung der Daten zur Bereitstellung der Website und die
                    Speicherung der Daten in Logfiles ist für den Betrieb der Internetseite zwingend erforderlich. Es
                    besteht folglich seitens des Nutzers keine Widerspruchsmöglichkeit.<br><br><strong>V. Verwendung von
                        Cookies</strong><br><br>1. Beschreibung und Umfang der Datenverarbeitung<br>Unsere Webseite
                    verwendet Cookies. Bei Cookies handelt es sich um Textdateien, die im Internetbrowser bzw. vom
                    Internetbrowser auf dem Computersystem des Nutzers gespeichert werden. Ruft ein Nutzer eine Website
                    auf, so kann ein Cookie auf dem Betriebssystem des Nutzers gespeichert werden. Dieses Cookie enthält
                    eine charakteristische Zeichenfolge, die eine eindeutige Identifizierung des Browsers beim erneuten
                    Aufrufen der Website ermöglicht. Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu
                    gestalten. Einige Elemente unserer Internetseite erfordern es, dass der aufrufende Browser auch nach
                    einem Seitenwechsel identifiziert werden kann.<br>In den Cookies werden dabei folgende Daten
                    gespeichert und übermittelt:<br>(1) Letzter aktivierter Menüpunkt<br>(2) Status aufklickbarer
                    Bereiche<br>(3) Log-In-Informationen (Sessionbasiert)
                </p>
                <p>(4) Artikel im Warenkorb (bei eCommerce-Nutzung)</p>
                <p>Zusätzlich zu eigenen Cookies werden bei Bedarf weitere 3rd-Party Cookies verwendet, die Beschreibung
                    erfolgt im jeweiligen Abschnitt.<br><br>2. Rechtsgrundlage für die Datenverarbeitung <br>Die
                    Rechtsgrundlage für die Verarbeitung personenbezogener Daten unter Verwendung von Cookies ist Art. 6
                    Abs. 1 lit. f DSGVO.<br><br>3. Zweck der Datenverarbeitung<br>Der Zweck der Verwendung technisch
                    notwendiger Cookies ist, die Nutzung von Websites für die Nutzer zu vereinfachen. Einige Funktionen
                    unserer Internetseite können ohne den Einsatz von Cookies nicht angeboten werden. Für diese ist es
                    erforderlich, dass der Browser auch nach einem Seitenwechsel wiedererkannt wird.<br>Für folgende
                    Anwendungen benötigen wir Cookies:<br>(1) Steuerung der Website<br>(2) Personalisierte oder
                    passwortgeschützte Bereiche</p>
                <p>(3) Warenkorb</p>
                <p>Die durch technisch notwendige Cookies erhobenen Nutzerdaten werden nicht zur Erstellung von
                    Nutzerprofilen verwendet. In diesen Zwecken liegt auch unser berechtigtes Interesse in der
                    Verarbeitung der personenbezogenen Daten nach Art. 6 Abs. 1 lit. f DSGVO. <br><br>4. Dauer der
                    Speicherung, Widerspruchs- und Beseitigungsmöglichkeit<br>Cookies werden auf dem Rechner des Nutzers
                    gespeichert und von diesem an unserer Seite übermittelt. Daher haben Sie als Nutzer auch die volle
                    Kontrolle über die Verwendung von Cookies. Durch eine Änderung der Einstellungen in Ihrem
                    Internetbrowser können Sie die Übertragung von Cookies deaktivieren oder einschränken. Bereits
                    gespeicherte Cookies können jederzeit gelöscht werden. Dies kann auch automatisiert erfolgen. Werden
                    Cookies für unsere Website deaktiviert, können möglicherweise nicht mehr alle Funktionen der Website
                    vollumfänglich genutzt werden.<br><br><strong>VI. Newsletter</strong></p>
                <p>1. Beschreibung und Umfang der Datenverarbeitung<br>Auf unserer Internetseite besteht die Möglichkeit
                    einen kostenfreien Newsletter zu abonnieren. Dabei werden bei der Anmeldung zum Newsletter die Daten
                    aus der Eingabemaske an uns übermittelt.</p>
                <p>Zudem werden folgende Daten bei der Anmeldung erhoben:<br>(1) Datum und Uhrzeit der
                    Registrierung<br>Für die Verarbeitung der Daten wird im Rahmen des Anmeldevorgangs Ihre Einwilligung
                    eingeholt und auf diese Datenschutzerklärung verwiesen.<br><br>Es erfolgt im Zusammenhang mit der
                    Datenverarbeitung für den Versand von Newslettern keine Weitergabe der Daten an Dritte. Die Daten
                    werden ausschließlich für den Versand des Newsletters verwendet.<br><br>2. Rechtsgrundlage für die
                    Datenverarbeitung<br>Rechtsgrundlage für die Verarbeitung der Daten nach Anmeldung zum Newsletters
                    durch den Nutzer ist bei Vorliegen einer Einwilligung des Nutzers Art. 6 Abs. 1 lit. a
                    DSGVO.<br><br>3. Zweck der Datenverarbeitung<br>Die Erhebung der E-Mail-Adresse des Nutzers dient
                    dazu, den Newsletter zuzustellen. Die Erhebung sonstiger personenbezogener Daten im Rahmen des
                    Anmeldevorgangs dient dazu, einen Missbrauch der Dienste oder der verwendeten E-Mail-Adresse zu
                    verhindern.<br><br>4. Dauer der Speicherung<br>Die Daten werden gelöscht, sobald sie für die
                    Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Die E-Mail-Adresse des Nutzers
                    wird demnach solange gespeichert, wie das Abonnement des Newsletters aktiv ist. <br><br>5.
                    Widerspruchs- und Beseitigungsmöglichkeit<br>Das Abonnement des Newsletters kann durch den
                    betroffenen Nutzer jederzeit gekündigt werden. Zu diesem Zweck findet sich in jedem Newsletter ein
                    entsprechender Link. Hierdurch wird ebenfalls ein Widerruf der Einwilligung der Speicherung der
                    während des Anmeldevorgangs erhobenen personenbezogenen Daten ermöglicht.<br><br><strong>VII.
                        Kommentarfunktion</strong><br><br>1. Beschreibung und Umfang der Datenverarbeitung<br>Auf
                    unserer Internetseite bieten wir Nutzern die Möglichkeit, Meldungen unter Angabe personenbezogener
                    Daten zu kommentieren. Die Daten werden dabei in eine Eingabemaske eingegeben und an uns übermittelt
                    und gespeichert. Eine Weitergabe der Daten an Dritte findet nicht statt. Folgende Daten werden im
                    Rahmen der Kommentierung erhoben:<br>(1) Name<br>(2) E-Mail-Adresse<br>(3) Kommentartext<br>Im
                    Zeitpunkt der Kommentierung werden zudem folgende Daten gespeichert:<br>(1) Datum und Uhrzeit der
                    Kommentierung<br>Im Rahmen der Kommentierung wird eine Einwilligung des Nutzers zur Verarbeitung
                    dieser Daten eingeholt.<br><br>2. Rechtsgrundlage für die Datenverarbeitung <br>Rechtsgrundlage für
                    die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung des Nutzers Art. 6 Abs. 1 lit. a
                    DSGVO.<br><br>3. Zweck der Datenverarbeitung<br>Anzeige von Benutzerkommentaren und Interaktion mit
                    Benutzern.<br><br>4. Dauer der Speicherung<br>Die Daten werden gelöscht, sobald sie für die
                    Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Dies ist für die während der
                    Kommentierung erhobenen Daten der Fall, wenn die zugehörige Meldung auf unserer Internetseite
                    aufgehoben oder abgeändert wird. <br><br>5. Widerspruchs- und Beseitigungsmöglichkeit<br>Als Nutzer
                    haben sie jederzeit die Möglichkeit, den Kommentar entfernen zu lassen. Hierfür ist eine E-Mail an
                    den Verantwortlichen nötig.<br><br><strong>VIII. Registrierung</strong><br><br>1. Beschreibung und
                    Umfang der Datenverarbeitung<br>Auf unserer Internetseite bieten wir Nutzern die Möglichkeit, sich
                    unter Angabe personenbezogener Daten zu registrieren. Die Daten werden dabei in eine Eingabemaske
                    eingegeben und an uns übermittelt und gespeichert. Eine Weitergabe der Daten an Dritte findet nicht
                    statt. Folgende Daten werden im Rahmen des Registrierungsprozesses erhoben:</p>
                <p>Im Zeitpunkt der Registrierung werden zudem folgende Daten gespeichert:<br>(1) Datum und Uhrzeit der
                    Registrierung<br>Im Rahmen des Registrierungsprozesses wird eine Einwilligung des Nutzers zur
                    Verarbeitung dieser Daten eingeholt.<br><br>2. Rechtsgrundlage für die Datenverarbeitung
                    <br>Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung des Nutzers
                    Art. 6 Abs. 1 lit. a DSGVO. Dient die Registrierung der Erfüllung eines Vertrages, dessen
                    Vertragspartei der Nutzer ist oder der Durchführung vorvertraglicher Maßnahmen, so ist zusätzliche
                    Rechtsgrundlage für die Verarbeitung der Daten Art. 6 Abs. 1 lit. b DSGVO.<br><br>3. Zweck der
                    Datenverarbeitung<br>Eine Registrierung des Nutzers ist für das Bereithalten bestimmter Inhalte und
                    Dienstleistungen auf unserer Website erforderlich.
                </p>
                <p><br>4. Dauer der Speicherung<br>Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes
                    ihrer Erhebung nicht mehr erforderlich sind. Dies ist für die während des Registrierungsvorgangs
                    erhobenen Daten der Fall, wenn die Registrierung auf unserer Internetseite aufgehoben oder
                    abgeändert wird.</p>
                <p><br>5. Widerspruchs- und Beseitigungsmöglichkeit<br>Als Nutzer haben sie jederzeit die Möglichkeit,
                    die Registrierung aufzulösen. Die über Sie gespeicherten Daten können Sie jederzeit abändern lassen.
                </p>
                <p><br><strong>IX. Kontaktformular und E-Mail-Kontakt</strong><br><br>1. Beschreibung und Umfang der
                    Datenverarbeitung<br>Auf unserer Website ist ein Kontaktformular vorhanden, welches für die
                    elektronische Kontaktaufnahme genutzt werden kann. Nimmt ein Nutzer diese Möglichkeit wahr, so
                    werden die in der Eingabemaske eingegeben Daten an uns übermittelt und gespeichert. Diese Daten
                    sind:</p>
                <p><br>Im Zeitpunkt der Absendung der Nachricht werden zudem folgende Daten gespeichert:<br>(1) Datum
                    und Uhrzeit der Kontaktaufnahme<br>Für die Verarbeitung der Daten wird im Rahmen des Absendevorgangs
                    Ihre Einwilligung eingeholt und auf diese Datenschutzerklärung verwiesen. Alternativ ist eine
                    Kontaktaufnahme über die bereitgestellte E-Mail-Adresse möglich. In diesem Fall werden die mit der
                    E-Mail übermittelten personenbezogenen Daten des Nutzers gespeichert. Es erfolgt in diesem
                    Zusammenhang keine Weitergabe der Daten an Dritte. Die Daten werden ausschließlich für die
                    Verarbeitung der Konversation verwendet.<br><br>2. Rechtsgrundlage für die
                    Datenverarbeitung<br>Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer
                    Einwilligung des Nutzers Art. 6 Abs. 1 lit. a DSGVO. Rechtsgrundlage für die Verarbeitung der Daten,
                    die im Zuge einer Übersendung einer E-Mail übermittelt werden, ist Art. 6 Abs. 1 lit. f DSGVO. Zielt
                    der E-Mail-Kontakt auf den Abschluss eines Vertrages ab, so ist zusätzliche Rechtsgrundlage für die
                    Verarbeitung Art. 6 Abs. 1 lit. b DSGVO. <br><br>3. Zweck der Datenverarbeitung<br>Die Verarbeitung
                    der personenbezogenen Daten aus der Eingabemaske dient uns allein zur Bearbeitung der
                    Kontaktaufnahme. Im Falle einer Kontaktaufnahme per E-Mail liegt hieran auch das erforderliche
                    berechtigte Interesse an der Verarbeitung der Daten. Die sonstigen während des Absendevorgangs
                    verarbeiteten personenbezogenen Daten dienen dazu, einen Missbrauch des Kontaktformulars zu
                    verhindern und die Sicherheit unserer informationstechnischen Systeme sicherzustellen.<br><br>4.
                    Dauer der Speicherung<br>Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer
                    Erhebung nicht mehr erforderlich sind. Für die personenbezogenen Daten aus der Eingabemaske des
                    Kontaktformulars und diejenigen, die per E-Mail übersandt wurden, ist dies dann der Fall, wenn die
                    jeweilige Konversation mit dem Nutzer beendet ist. Beendet ist die Konversation dann, wenn sich aus
                    den Umständen entnehmen lässt, dass der betroffene Sachverhalt abschließend geklärt ist. Die während
                    des Absendevorgangs zusätzlich erhobenen personenbezogenen Daten werden spätestens nach einer Frist
                    von sieben Tagen gelöscht.<br><br>5. Widerspruchs- und Beseitigungsmöglichkeit<br>Der Nutzer hat
                    jederzeit die Möglichkeit, seine Einwilligung zur Verarbeitung der personenbezogenen Daten zu
                    widerrufen. Nimmt der Nutzer per E-Mail Kontakt mit uns auf, so kann er der Speicherung seiner
                    personenbezogenen Daten jederzeit widersprechen. In einem solchen Fall kann die Konversation nicht
                    fortgeführt werden. Alle personenbezogenen Daten, die im Zuge der Kontaktaufnahme gespeichert
                    wurden, werden in diesem Fall gelöscht.<br><br><strong>X. Google Translate</strong></p>
                <p>Umfang der Verarbeitung personenbezogener Daten<br>Wir nutzen auf unserer Website den
                    Übersetzungsdienst „Google Translate“, bereitgestellt von Google LLC (Google), um unseren Nutzern
                    die Inhalte in verschiedenen Sprachen zugänglich zu machen. Beim Einsatz von Google Translate können
                    Daten wie die IP-Adresse des Nutzers an Server von Google in den USA übertragen werden. Google ist
                    unter dem Privacy-Shield-Abkommen zertifiziert und bietet dadurch eine Garantie, das europäische
                    Datenschutzrecht einzuhalten (<a
                        href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active"
                        target="_new"
                        rel="noopener">https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active</a>).
                    Die Nutzung von Google Translate erfolgt direkt durch eine Verbindung des Browsers des Nutzers mit
                    den Servern von Google.</p>
                <p>Rechtsgrundlage für die Verarbeitung personenbezogener Daten<br>Die Rechtsgrundlage für die
                    Verarbeitung der personenbezogenen Daten der Nutzer ist Art. 6 Abs. 1 lit. a DSGVO.</p>
                <p>Zweck der Datenverarbeitung<br>Der Einsatz von Google Translate dient der Verbesserung der
                    Nutzererfahrung auf unserer Website, indem Inhalte in verschiedenen Sprachen angeboten werden
                    können. Dies ermöglicht uns, eine größere Zielgruppe anzusprechen und die Zugänglichkeit unserer
                    Inhalte zu erhöhen. In diesem Zweck liegt auch unser berechtigtes Interesse an der Verarbeitung der
                    Daten nach Art. 6 Abs. 1 lit. a DSGVO.</p>
                <p>Dauer der Speicherung<br>Wir speichern keine Daten, die im Zusammenhang mit der Nutzung von Google
                    Translate stehen. Google kann jedoch Daten speichern, sofern dies in deren Datenschutzerklärung
                    vorgesehen ist.</p>
                <p>Widerspruchs- und Beseitigungsmöglichkeit<br>Die Nutzer können durch entsprechende Einstellungen in
                    ihrem Browser die Übermittlung von Daten an Google verhindern, z. B. durch das Blockieren von
                    Drittanbieter-Cookies. Darüber hinaus bietet Google weitere Optionen zur Datenkontrolle und
                    -verwaltung, die in der Datenschutzerklärung von Google (<a target="_new"
                        rel="noopener">https://policies.google.com/privacy</a>) sowie den Einstellungen für
                    Werbeanzeigen (<a href="https://adssettings.google.com/authenticated" target="_new"
                        rel="noopener">https://adssettings.google.com/authenticated</a>) beschrieben werden.</p>
                <p>Weitere Informationen<br>Für weitere Informationen zur Datenverarbeitung durch Google Translate sowie
                    zu Widerspruchs- und Einstellungsoptionen verweisen wir auf die Datenschutzerklärung von Google (<a
                        target="_new" rel="noopener">https://policies.google.com/privacy</a>).</p>
                <p><strong>XI. Bezahldienste</strong><br><br>1. Beschreibung und Umfang der Datenverarbeitung<br>Auf
                    unserer Website wird den Nutzern eine Plattform für den Abschluss von Kaufverträgen geboten, im
                    Rahmen des Vertragsschlusses werden für die Kaufabwicklung notwendige personenbezogene Daten des
                    Vertragspartners erhoben und zur Abwicklung des Bezahlvorganges an GiroSolution (<a
                        href="https://www.girosolution.de/">https://www.girosolution.de/</a>), bei Nutzung von
                    GiroCheckout, oder GovConnect (<a href="https://www.govconnect.de">https://www.govconnect.de</a>),
                    bei Nutzung von pmPayment, weitergegeben.<br><br>Übermittelt werden Ihre eingegebenen Zahlungsdaten,
                    die Höhe der Zahlung und der hinterlegte Verwendungszweck.<br><br>2. Rechtsgrundlage für die
                    Datenverarbeitung <br>Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer
                    Einwilligung des Nutzers Art. 6 Abs. 1 lit. b DSGVO.<br><br>3. Zweck der
                    Datenverarbeitung<br>Abwicklung von Bezahlvorgängen.<br><br>4. Dauer der Speicherung<br>Die Daten
                    werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich
                    sind.<br><br>5. Widerspruchs- und Beseitigungsmöglichkeit<br>Der Nutzer hat jederzeit die
                    Möglichkeit, seine Einwilligung zur Verarbeitung der personenbezogenen Daten zu widerrufen. Nimmt
                    der Nutzer per E-Mail Kontakt mit uns auf, so kann er der Speicherung seiner personenbezogenen Daten
                    jederzeit widersprechen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt
                    vom Widerruf unberührt.<br><br><br><br><strong>XII. Konfigurierbare Formulare</strong><br><br>1.
                    Beschreibung und Umfang der Datenverarbeitung<br>Unsere Website enthält konfigurierbare Formulare.
                    Über ein Formular können Sie Ihre persönlichen Daten (z.B. Name, Vorname, Geburtsdatum, Geburtsort,
                    Geburtsland, Nationalität, Anschrift, Telefonnummer, E-Mail Adresse) sowie sonstige Informationen
                    (z.B. Bewertungen, persönliche Nachrichten, Anmeldungen) eingeben bzw. hochladen.<br><br>2.
                    Rechtsgrundlage für die Datenverarbeitung <br>Rechtsgrundlage für die Verarbeitung der Daten ist bei
                    Vorliegen einer Einwilligung des Nutzers Art. 6 Abs. 1 lit. a DSGVO. Rechtsgrundlage für die
                    Verarbeitung der Daten, die im Zuge einer Übersendung einer E-Mail übermittelt werden, ist Art. 6
                    Abs. 1 lit. f DSGVO. Zielt der E-Mail-Kontakt auf den Abschluss eines Vertrages ab, so ist
                    zusätzliche Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. b DSGVO. <br>3. Zweck der
                    Datenverarbeitung<br>Die Daten werden zur Abfrage von zweckgebundenen Informationen
                    genutzt.<br><br>4. Dauer der Speicherung<br>Die Daten werden unter Einhaltung gesetzlicher
                    Bestimmungen gespeichert und gelöscht. <br>5. Widerspruchs- und Beseitigungsmöglichkeit<br>Der
                    Nutzer hat jederzeit die Möglichkeit, seine Einwilligung zur Verarbeitung der personenbezogenen
                    Daten zu widerrufen. Nimmt der Nutzer per E-Mail Kontakt mit uns auf, so kann er der Speicherung
                    seiner personenbezogenen Daten jederzeit widersprechen. Die Rechtmäßigkeit der bis zum Widerruf
                    erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.<br><br><br></p>
                <p><strong>XIII, Registrierung für natürliche Personen (BundID)</strong></p>
                <ol>
                    <li>Zweck der Verarbeitung:&nbsp;Ihre Daten werden zum Zweck der Anmeldung an unser Portal und zur
                        Bereitstellung Ihres individuellen Postkorbs sowie zur Bearbeitung Ihrer Anträge verarbeitet.
                    </li>
                    <li>Rechtsgrundlage für die Datenverarbeitung: Rechtsgrundlage für die Verarbeitung der Daten ist
                        die Wahrnehmung einer Aufgabe im öffentlichen Interesse oder in Ausübung öffentlicher Gewalt,
                        die der Behörde übertragen wurde. Insofern ist Art. 6 Abs. 1 lit. e DSGVO in Verbindung mit §§
                        1, 3, 8 OZG die Rechtsgrundlage der Verarbeitung.</li>
                    <li>Kategorien der verarbeiteten personenbezogenen Daten: Folgende personenbezogene Daten werden in
                        Abhängigkeit des Vertrauensniveaus und der Art Ihrer Anmeldung von Ihnen verarbeitet:<br>&nbsp;
                        &nbsp; • Benutzername zum Zweck der Anmeldung (immer)<br>&nbsp; &nbsp; • Name und
                        Vorname<br>&nbsp; &nbsp; • Geburtsdatum, Geburtsname, Geburtsort, Anschrift mit Wohnort-ID,
                        E-Mail-Adresse<br>&nbsp; &nbsp; • Das Vertrauensniveau, mit dem Sie am Servicekonto angemeldet
                        sind<br>&nbsp; &nbsp; • Doktorgrad<br>&nbsp; &nbsp; • Das sogenannte dienste- und
                        kartenspezifische Kennzeichen (gem. §18 Abs. 3 Nr. 8 PAuswG)<br>&nbsp; &nbsp; • eine eindeutige
                        Kennung, die vom übermittelnden Mitgliedstaat entsprechend den technischen Spezifikationen für
                        die Zwecke der grenzüberschreitenden Identifizierung erstellt wurde und möglichst dauerhaft
                        fortbesteht.<br>&nbsp; &nbsp; • E-Mail-Adresse<br>&nbsp; &nbsp; • Ihre Anrede und
                        Telefonnummer<br>&nbsp; &nbsp; • Staatsangehörigkeit<br>&nbsp; &nbsp; •
                        eIDAS-Issuing-Country<br>&nbsp; &nbsp; • Dokumenttyp</li>
                    <li>Empfänger oder Kategorien von Empfängern der personenbezogenen Daten: Ihre personenbezogenen
                        Daten werden an eine landkreisweite Zentralstelle „OpenRathaus-Connect“ weitergegeben. Auf diese
                        Daten erhalten Kommunen des gleichen Landkreises dann Zugriff, wenn Sie sich über das
                        OpenR@thaus dieser Kommunen anmelden. Dabei werden zum Zwecke Ihrer eindeutigen Identifikation
                        die folgenden Daten zum Zweck der Bereitstellung eines für Sie gebündelten, landkreisweiten
                        Postkorbs an „OpenR@thaus-Connect“ übermittelt:<br>- Ihre persönliche OpenR@thaus-ID und Ihre
                        persönliche BundID-ID<br>- Ihre E-Mail-Adresse<br>- Die Bezeichnung der von Ihnen in Anspruch
                        genommenen Dienstleistung (ohne inhaltliche Angaben)<br>- Angaben dazu, wann welche Anträge von
                        Ihnen gestellt wurden und welchen Status diese haben</li>
                    <li>
                        <p>Übermittlung Ihrer personenbezogenen Daten an ein Drittland oder eine internationale
                            Organisation:&nbsp;Ihre Daten werden nicht an ein Drittland oder eine internationale
                            Organisation übermittelt</p>
                    </li>
                    <li>
                        <p>Dauer der Speicherung bzw. Kriterien für die Festlegung der Speicherdauer: Die Daten werden
                            gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich
                            sind. Dies ist für die während des Registrierungsvorgangs erhobenen Daten der Fall, wenn die
                            Registrierung aufgehoben oder abgeändert wird.</p>
                    </li>
                    <li>
                        <p>Quelle Ihrer Daten: Wir haben Ihre Daten aus dem Servicekonto des Bundes, der BundID,
                            erhalten.&nbsp;</p>
                    </li>
                </ol>
                <p><strong>XiV: Registrierung für Unternehmen und juristische Personen (Mein Unternehmenskonto –
                        „MUK“)</strong></p>
                <ol>
                    <li>1. Zweck der Verarbeitung Ihre Daten werden zum Zweck der Anmeldung an unser Portal und zur
                        Bereitstellung Ihres individuellen Postkorbs sowie zur Bearbeitung Ihrer Anträge verarbeitet.
                    </li>
                    <li>Rechtsgrundlage für die Datenverarbeitung: Rechtsgrundlage für die Verarbeitung der Daten ist
                        die Wahrnehmung einer Aufgabe im öffentlichen Interesse oder in Ausübung öffentlicher Gewalt,
                        die der Behörde übertragen wurde. Insofern ist Art. 6 Abs. 1 lit. e DSGVO in Verbindung mit §§
                        1, 3, 8 OZG die Rechtsgrundlage der Verarbeitung.</li>
                    <li>Kategorien der verarbeiteten personenbezogenen Daten: Folgende personenbezogene Daten werden in
                        Abhängigkeit des Vertrauensniveaus und der Art Ihrer Anmeldung von Ihnen verarbeitet:<br>&nbsp;
                        &nbsp; (1) Angaben, die bei Anmeldung mit persönlichem Zertifikat (ID) übermittelt werden sofern
                        vorhanden<br>&nbsp; &nbsp; • Adressdaten (Adresstyp, Straße, Hausnummer, PLZ, Ort, Ortsteil,
                        Adressergänzung, Land)<br>&nbsp; &nbsp; • Elster-Vertrauensniveau-Identifizierung<br>&nbsp;
                        &nbsp; • Testkonto-Kennzeichen<br>&nbsp; &nbsp; • Pseudonyme des Nutzers<br>&nbsp; &nbsp; •
                        E-Mail-Adresse<br>&nbsp; &nbsp; • Anschrift<br>&nbsp; &nbsp; • Name und Vorname des
                        Nutzers<br>&nbsp; &nbsp; • Geburtsdatum<br>&nbsp; &nbsp; • Geburtsname<br>&nbsp; &nbsp; •
                        Geburtsort<br>&nbsp; &nbsp; • Geburtsland<br>&nbsp; &nbsp; • Akademischer Grad<br>&nbsp; &nbsp;
                        • Namenszusatz<br>&nbsp; &nbsp; • Namensvorsatz<br>&nbsp; &nbsp; (2) Angaben, die bei Anmeldung
                        mit Organisations- zertifikat (StNr) übermittelt werden sofern vorhanden<br>&nbsp; &nbsp; •
                        Adressdaten (Adresstyp, Straße, Hausnummer, PLZ, Ort, Ortsteil, Adressergänzung, Land)<br>&nbsp;
                        &nbsp; • Elster-Vertrauensniveau-Identifizierung<br>&nbsp; &nbsp; •
                        Testkonto-Kennzeichen<br>&nbsp; &nbsp; • Pseudonyme des Nutzers<br>&nbsp; &nbsp; •
                        E-Mail-Adresse<br>&nbsp; &nbsp; • Personentyp (natürliche oder juristische Person)<br>&nbsp;
                        &nbsp; • Unternehmensanschrift<br>&nbsp; &nbsp; • Name und Vorname handelnde Person<br>&nbsp;
                        &nbsp; • Geburtsdatum handelnde Person<br>&nbsp; &nbsp; • Akademischer Grad handelnde
                        Person<br>&nbsp; &nbsp; • Namenszusatz handelnde Person<br>&nbsp; &nbsp; • Namensvorsatz
                        handelnde Person<br>&nbsp; &nbsp; • Rechtsform<br>&nbsp; &nbsp; • Tätigkeit<br>&nbsp; &nbsp; •
                        Registernummer<br>&nbsp; &nbsp; • Registerart<br>&nbsp; &nbsp; • Registergericht<br>&nbsp;
                        &nbsp; • Datum der Übermittlung<br>&nbsp; &nbsp; • DatenübermittlerPseudonymId</li>
                    <li>Empfänger oder Kategorien von Empfängern der personenbezogenen Daten: Ihre personenbezogenen
                        Daten werden an eine landkreisweite Zentralstelle „OpenRathaus-Connect“ weitergegeben. Auf diese
                        Daten erhalten Kommunen des gleichen Landkreises dann Zugriff, wenn Sie sich über das
                        OpenR@thaus dieser Kommunen anmelden. Dabei werden zum Zwecke Ihrer eindeutigen Identifikation
                        die folgenden Daten zum Zweck der Bereitstellung eines für Sie gebündelten, landkreisweiten
                        Postkorbs an „OpenR@thaus-Connect“ übermittelt:<br>- Ihre OpenR@thaus-ID und Ihre MUK-ID<br>-
                        Ihre E-Mail-Adresse<br>- Die Bezeichnung der von Ihnen in Anspruch genommenen Dienstleistung
                        (ohne inhaltliche Angaben)<br>- Angaben dazu, wann welche Anträge von Ihnen gestellt wurden und
                        welchen Status diese haben</li>
                    <li>Übermittlung Ihrer personenbezogenen Daten an ein Drittland oder eine internationale
                        Organisation: Ihre Daten werden nicht an ein Drittland oder eine internationale Organisation
                        übermittelt</li>
                    <li>Dauer der Speicherung bzw. Kriterien für die Festlegung der Speicherdauer: Die Daten werden
                        gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind.
                        Dies ist für die während des Registrierungsvorgangs erhobenen Daten der Fall, wenn die
                        Registrierung aufgehoben oder abgeändert wird.</li>
                    <li>Quelle Ihrer Daten: Wir haben Ihre Daten aus dem MUK Self Service Portal erhalten (MUK).</li>
                </ol>
                <p><strong>XV. Verarbeitung personenbezogener Daten im Rahmen der
                        Kommunalen&nbsp;<br>Wärmeplanung</strong></p>
                <p>Die Samtgemeinde Horneburg wurde, basierend auf dem Ratsbeschluss vom 03.09.2024&nbsp;und vor dem
                    Hintergrund des am 01.01.2024 inkraftgetretenden Gesetzes für die Wärmeplanung und zur
                    Dekarbonisierung der Wärmenetze (Wärmeplanungsgesetz – WPG) mit der Erstellung einer strategischen
                    Planung zu einer treibhausgasneutralen Wärmeversorgung (Kommunale Wärmeplanung) beauftrag. Zu
                    berücksichtigen ist auch das Niedersächsischen Gesetzes zur Förderung des Klimaschutzes und zur
                    Minderung der Folgen des Klimawandels (Niedersächsisches Klimagesetz – NKlimaG).<br>Zu diesem Zweck
                    ist zunächst eine Bestands- und Potenzialanalyse durchzuführen, auf deren Basis Zielszenarien
                    entwickelt und verbindliche Maßnahmen zur Umsetzung beschlossen werden sollen. Da es hierbei auch
                    zur Erhebung und Verarbeitung von personenbezogenen Daten kommen kann, werden Sie hiermit
                    entsprechend Art. 13 und 14 DS-GVO über die Verarbeitung dieser Daten und die hieraus resultierenden
                    Rechte der Betroffenen informiert:</p>
                <p>1. Zwecke und Rechtsgrundlagen der Datenverarbeitung:<br>Die Samtgemeinde Horneburg verarbeitet Ihre
                    personenbezogenen Daten für die Erstellung des Wärmeplans im Rahmen der gesetzlich vorgeschriebenen
                    kommunalen Wärmeplanung gemäß Artt. 6 Abs. 1 lit. e, Abs. 2 und 3 DS-GVO, § 3 NDSG i.V.m. §§ 10 ff
                    WPG und §§ 20, 21 NKlimaG.<br>Eine Verarbeitung der Daten zu anderen als den hier genannten Zwecken
                    erfolgt nicht.&nbsp;</p>
                <p>2. Kategorien personenbezogener Daten:<br>Die Samtgemeinde Horneburg verarbeitet nur solche Daten,
                    die abschließend in § 21 NKlimaG und in Anlage 1 zu § 15 des WPG genannt sind. Hierbei handelt es
                    sich im Wesentlichen um Informationen zu</p>
                <p>• Gebäuden (Adresse, Nutzung, Wohnfläche oder Bruttogeschossfläche, Geschosszahl, Energieträger zur
                    Wärmeerzeugung, Gebäudealter). Außerdem werden zähler- oder gebäudescharfe Angaben zu<br>• Art,
                    Umfang und Standorte des Energie- und Brennstoffverbrauchs von Gebäuden oder Gebäudegruppen
                    sowie<br>• Stromverbrauch zu Heizzwecken, insbesondere für Wärmepumpen und Direktheizungen erhoben
                    und verarbeitet.&nbsp;</p>
                <p>Die gesamte Anlage 1 zu § 15 WPG finden Sie im Internet z.B. unter folgendem Link: <a
                        class="link_katalog nolis-link-extern"
                        href="https://www.gesetze-im-internet.de/wpg/anlage_1.html"
                        title="Gesetze im Internet - WPG (https://www.gesetze-im-internet.de/wpg/anlage_1.html)"
                        target="_blank"
                        rel="noopener noreferrer">https://www.gesetze-im-internet.de/wpg/anlage_1.html</a></p>
                <p>3. Erhebung von Daten&nbsp;<br>Die Bereitstellung von Daten erfolgt innerhalb der Gemeindeverwaltung
                    durch interne Stellen wie z. B. durch das Klimaschutzmanagement und innerhalb des Fachbereichs
                    "Bauen und 8mwelt“.&nbsp;<br>Die Energieverbrauchsdaten werden von den Stadtwerken Stade, der EWE
                    Netz und den Stadtwerken Buxtehude sowie von den zuständigen Schornsteinfegern für das
                    Gemeindegebiet der Samtgemeinde erhoben.&nbsp;</p>
                <p>4. Pflichten zur Bereitstellung personenbezogener Daten<br>Die Pflicht zur Bereitstellung der
                    personenbezogenen Daten ist gesetzlich geregelt, insbesondere in § 21 Abs. 2 und 3 NKlimaG.&nbsp;
                </p>
                <p>5. Empfänger oder Kategorie von Empfängern personenbezogener Daten<br>Die Daten werden zu gegebener
                    Zeit an ein externes Dienstleistungsunternehmen übermittelt, welches die Gemeinde Horneburg bei der
                    Durchführung der Maßnahme unterstützen soll. Hierbei verarbeitet der Dienstleister die
                    personenbezogenen Daten gem. Art. 28 DSGVO im Auftrag der Gemeinde ausschließlich zu den oben
                    genannten Zwecken.</p>
                <p><strong>XVI. Rechte der betroffenen Person</strong><br><br>Werden personenbezogene Daten von Ihnen
                    verarbeitet, sind Sie Betroffener i.S.d. DSGVO und es stehen Ihnen folgende Rechte gegenüber dem
                    Verantwortlichen zu:<br><br>1. Auskunftsrecht<br>Sie können von dem Verantwortlichen eine
                    Bestätigung darüber verlangen, ob personenbezogene Daten, die Sie betreffen, von uns verarbeitet
                    werden. Liegt eine solche Verarbeitung vor, können Sie von dem Verantwortlichen über folgende
                    Informationen Auskunft verlangen:<br><br>(1) die Zwecke, zu denen die personenbezogenen Daten
                    verarbeitet werden;<br>(2) die Kategorien von personenbezogenen Daten, welche verarbeitet
                    werden;<br>(3) die Empfänger bzw. die Kategorien von Empfängern, gegenüber denen die Sie
                    betreffenden personenbezogenen Daten offengelegt wurden oder noch offengelegt werden;<br>(4) die
                    geplante Dauer der Speicherung der Sie betreffenden personenbezogenen Daten oder, falls konkrete
                    Angaben hierzu nicht möglich sind, Kriterien für die Festlegung der Speicherdauer;<br>(5) das
                    Bestehen eines Rechts auf Berichtigung oder Löschung der Sie betreffenden personenbezogenen Daten,
                    eines Rechts auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines
                    Widerspruchsrechts gegen diese Verarbeitung; <br>(6) das Bestehen eines Beschwerderechts bei einer
                    Aufsichtsbehörde;<br>(7) alle verfügbaren Informationen über die Herkunft der Daten, wenn die
                    personenbezogenen Daten nicht bei der betroffenen Person erhoben werden;<br>(8) das Bestehen einer
                    automatisierten Entscheidungsfindung einschließlich Profiling gemäß Art. 22 Abs. 1 und 4 DSGVO und –
                    zumindest in diesen Fällen – aussagekräftige Informationen über die involvierte Logik sowie die
                    Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung für die betroffene
                    Person.<br><br>Ihnen steht das Recht zu, Auskunft darüber zu verlangen, ob die Sie betreffenden
                    personenbezogenen Daten in ein Drittland oder an eine internationale Organisation übermittelt
                    werden. In diesem Zusammenhang können Sie verlangen, über die geeigneten Garantien gem. Art. 46
                    DSGVO im Zusammenhang mit der Übermittlung unterrichtet zu werden.<br><br>2. Recht auf
                    Berichtigung<br>Sie haben ein Recht auf Berichtigung und/oder Vervollständigung gegenüber dem
                    Verantwortlichen, sofern die verarbeiteten personenbezogenen Daten, die Sie betreffen, unrichtig
                    oder unvollständig sind. Der Verantwortliche hat die Berichtigung unverzüglich
                    vorzunehmen.<br><br>3. Recht auf Einschränkung der Verarbeitung<br>Unter den folgenden
                    Voraussetzungen können Sie die Einschränkung der Verarbeitung der Sie betreffenden personenbezogenen
                    Daten verlangen:<br><br>(1) wenn Sie die Richtigkeit der Sie betreffenden personenbezogenen für eine
                    Dauer bestreiten, die es dem Verantwortlichen ermöglicht, die Richtigkeit der personenbezogenen
                    Daten zu überprüfen;<br>(2) die Verarbeitung unrechtmäßig ist und Sie die Löschung der
                    personenbezogenen Daten ablehnen und stattdessen die Einschränkung der Nutzung der personenbezogenen
                    Daten verlangen;<br>(3) der Verantwortliche die personenbezogenen Daten für die Zwecke der
                    Verarbeitung nicht länger benötigt, Sie diese jedoch zur Geltendmachung, Ausübung oder Verteidigung
                    von Rechtsansprüchen benötigen, oder<br>(4) wenn Sie Widerspruch gegen die Verarbeitung gemäß Art.
                    21 Abs. 1 DSGVO eingelegt haben und noch nicht feststeht, ob die berechtigten Gründe des
                    Verantwortlichen gegenüber Ihren Gründen überwiegen.<br><br>Wurde die Verarbeitung der Sie
                    betreffenden personenbezogenen Daten eingeschränkt, dürfen diese Daten – von ihrer Speicherung
                    abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von
                    Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder
                    aus Gründen eines wichtigen öffentlichen Interesses der Union oder eines Mitgliedstaats verarbeitet
                    werden.<br>Wurde die Einschränkung der Verarbeitung nach den o.g. Voraussetzungen eingeschränkt,
                    werden Sie von dem Verantwortlichen unterrichtet bevor die Einschränkung aufgehoben wird.<br><br>4.
                    Recht auf Löschung<br><br><u>a) Löschungspflicht</u><br>Sie können von dem Verantwortlichen
                    verlangen, dass die Sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden, und der
                    Verantwortliche ist verpflichtet, diese Daten unverzüglich zu löschen, sofern einer der folgenden
                    Gründe zutrifft:<br><br>(1) Die Sie betreffenden personenbezogenen Daten sind für die Zwecke, für
                    die sie erhoben oder auf sonstige Weise verarbeitet wurden, nicht mehr notwendig.<br>(2) Sie
                    widerrufen Ihre Einwilligung, auf die sich die Verarbeitung gem. Art. 6 Abs. 1 lit. a oder Art. 9
                    Abs. 2 lit. a DSGVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die
                    Verarbeitung. <br>(3) Sie legen gem. Art. 21 Abs. 1 DSGVO Widerspruch gegen die Verarbeitung ein und
                    es liegen keine vorrangigen berechtigten Gründe für die Verarbeitung vor, oder Sie legen gem. Art.
                    21 Abs. 2 DSGVO Widerspruch gegen die Verarbeitung ein. <br>(4) Die Sie betreffenden
                    personenbezogenen Daten wurden unrechtmäßig verarbeitet.<br>(5) Die Löschung der Sie betreffenden
                    personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach dem Unionsrecht oder
                    dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt. <br>(6) Die Sie
                    betreffenden personenbezogenen Daten wurden in Bezug auf angebotene Dienste der
                    Informationsgesellschaft gemäß Art. 8 Abs. 1 DSGVO erhoben.<br><br><u>b) Information an
                        Dritte</u><br>Hat der Verantwortliche die Sie betreffenden personenbezogenen Daten öffentlich
                    gemacht und ist er gem. Art. 17 Abs. 1 DSGVO zu deren Löschung verpflichtet, so trifft er unter
                    Berücksichtigung der verfügbaren Technologie und der Implementierungskosten angemessene Maßnahmen,
                    auch technischer Art, um für die Datenverarbeitung Verantwortliche, die die personenbezogenen Daten
                    verarbeiten, darüber zu informieren, dass Sie als betroffene Person von ihnen die Löschung aller
                    Links zu diesen personenbezogenen Daten oder von Kopien oder Replikationen dieser personenbezogenen
                    Daten verlangt haben. <br><br><u>c) Ausnahmen</u><br>Das Recht auf Löschung besteht nicht, soweit
                    die Verarbeitung erforderlich ist<br><br>(1) zur Ausübung des Rechts auf freie Meinungsäußerung und
                    Information;<br>(2) zur Erfüllung einer rechtlichen Verpflichtung, die die Verarbeitung nach dem
                    Recht der Union oder der Mitgliedstaaten, dem der Verantwortliche unterliegt, erfordert, oder zur
                    Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt
                    erfolgt, die dem Verantwortlichen übertragen wurde;<br>(3) aus Gründen des öffentlichen Interesses
                    im Bereich der öffentlichen Gesundheit gemäß Art. 9 Abs. 2 lit. h und i sowie Art. 9 Abs. 3
                    DSGVO;<br>(4) für im öffentlichen Interesse liegende Archivzwecke, wissenschaftliche oder
                    historische Forschungszwecke oder für statistische Zwecke gem. Art. 89 Abs. 1 DSGVO, soweit das
                    unter Abschnitt a) genannte Recht voraussichtlich die Verwirklichung der Ziele dieser Verarbeitung
                    unmöglich macht oder ernsthaft beeinträchtigt, oder<br>(5) zur Geltendmachung, Ausübung oder
                    Verteidigung von Rechtsansprüchen.<br><br>5. Recht auf Unterrichtung<br>Haben Sie das Recht auf
                    Berichtigung, Löschung oder Einschränkung der Verarbeitung gegenüber dem Verantwortlichen geltend
                    gemacht, ist dieser verpflichtet, allen Empfängern, denen die Sie betreffenden personenbezogenen
                    Daten offengelegt wurden, diese Berichtigung oder Löschung der Daten oder Einschränkung der
                    Verarbeitung mitzuteilen, es sei denn, dies erweist sich als unmöglich oder ist mit einem
                    unverhältnismäßigen Aufwand verbunden. Ihnen steht gegenüber dem Verantwortlichen das Recht zu, über
                    diese Empfänger unterrichtet zu werden.<br><br>6. Recht auf Datenübertragbarkeit<br>Sie haben das
                    Recht, die Sie betreffenden personenbezogenen Daten, die Sie dem Verantwortlichen bereitgestellt
                    haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten. Außerdem haben
                    Sie das Recht diese Daten einem anderen Verantwortlichen ohne Behinderung durch den
                    Verantwortlichen, dem die personenbezogenen Daten bereitgestellt wurden, zu übermitteln,
                    sofern<br><br>(1) die Verarbeitung auf einer Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO oder Art.
                    9 Abs. 2 lit. a DSGVO oder auf einem Vertrag gem. Art. 6 Abs. 1 lit. b DSGVO beruht und<br>(2) die
                    Verarbeitung mithilfe automatisierter Verfahren erfolgt.<br><br>In Ausübung dieses Rechts haben Sie
                    ferner das Recht, zu erwirken, dass die Sie betreffenden personenbezogenen Daten direkt von einem
                    Verantwortlichen einem anderen Verantwortlichen übermittelt werden, soweit dies technisch machbar
                    ist. Freiheiten und Rechte anderer Personen dürfen hierdurch nicht beeinträchtigt werden. Das Recht
                    auf Datenübertragbarkeit gilt nicht für eine Verarbeitung personenbezogener Daten, die für die
                    Wahrnehmung einer Aufgabe erforderlich ist, die im öffentlichen Interesse liegt oder in Ausübung
                    öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen wurde.<br><br>7.
                    Widerspruchsrecht<br>Sie haben das Recht, aus Gründen, die sich aus ihrer besonderen Situation
                    ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund
                    von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf
                    diese Bestimmungen gestütztes Profiling. Der Verantwortliche verarbeitet die Sie betreffenden
                    personenbezogenen Daten nicht mehr, es sei denn, er kann zwingende schutzwürdige Gründe für die
                    Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die
                    Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. Werden die
                    Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das
                    Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum
                    Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher
                    Direktwerbung in Verbindung steht. Widersprechen Sie der Verarbeitung für Zwecke der Direktwerbung,
                    so werden die Sie betreffenden personenbezogenen Daten nicht mehr für diese Zwecke verarbeitet. Sie
                    haben die Möglichkeit, im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft –
                    ungeachtet der Richtlinie 2002/58/EG – Ihr Widerspruchsrecht mittels automatisierter Verfahren
                    auszuüben, bei denen technische Spezifikationen verwendet werden.<br><br>8. Recht auf Widerruf der
                    datenschutzrechtlichen Einwilligungserklärung<br>Sie haben das Recht, Ihre datenschutzrechtliche
                    Einwilligungserklärung jederzeit zu widerrufen. Durch den Widerruf der Einwilligung wird die
                    Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht
                    berührt.<br><br>9. Automatisierte Entscheidung im Einzelfall einschließlich Profiling<br>Sie haben
                    das Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung – einschließlich
                    Profiling – beruhenden Entscheidung unterworfen zu werden, die Ihnen gegenüber rechtliche Wirkung
                    entfaltet oder Sie in ähnlicher Weise erheblich beeinträchtigt. Dies gilt nicht, wenn die
                    Entscheidung<br><br>(1) für den Abschluss oder die Erfüllung eines Vertrags zwischen Ihnen und dem
                    Verantwortlichen erforderlich ist,<br>(2) aufgrund von Rechtsvorschriften der Union oder der
                    Mitgliedstaaten, denen der Verantwortliche unterliegt, zulässig ist und diese Rechtsvorschriften
                    angemessene Maßnahmen zur Wahrung Ihrer Rechte und Freiheiten sowie Ihrer berechtigten Interessen
                    enthalten oder<br>(3) mit Ihrer ausdrücklichen Einwilligung erfolgt.<br><br>Allerdings dürfen diese
                    Entscheidungen nicht auf besonderen Kategorien personenbezogener Daten nach Art. 9 Abs. 1 DSGVO
                    beruhen, sofern nicht Art. 9 Abs. 2 lit. a oder g DSGVO gilt und angemessene Maßnahmen zum Schutz
                    der Rechte und Freiheiten sowie Ihrer berechtigten Interessen getroffen wurden. Hinsichtlich der in
                    (1) und (3) genannten Fälle trifft der Verantwortliche angemessene Maßnahmen, um die Rechte und
                    Freiheiten sowie Ihre berechtigten Interessen zu wahren, wozu mindestens das Recht auf Erwirkung des
                    Eingreifens einer Person seitens des Verantwortlichen, auf Darlegung des eigenen Standpunkts und auf
                    Anfechtung der Entscheidung gehört.<br><br>10. Recht auf Beschwerde bei einer
                    Aufsichtsbehörde<br>Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen
                    Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem
                    Mitgliedstaat ihres Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes,
                    zu, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten
                    gegen die DSGVO verstößt.<br>Die Aufsichtsbehörde, bei der die Beschwerde eingereicht wurde,
                    unterrichtet den Beschwerdeführer über den Stand und die Ergebnisse der Beschwerde einschließlich
                    der Möglichkeit eines gerichtlichen Rechtsbehelfs nach Art. 78 DSGVO.</p>
                <div class="clearfloat">&nbsp;</div>
            </div>
        </template>
    </DefaultPage>
</template>

<script setup lang="ts">
import DefaultPage from '@/components/DefaultPage.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
#text {
    margin-top: 1rem;
}
</style>
