<template>
    <ion-page>
        <transition name="fade">
            <div v-if="showSplash" class="splash-overlay">
                <div class="splash-content">
                    <ion-icon :icon="logoIonic" size="large"></ion-icon>
                    <h1>Willkommen</h1>
                    <p>Scrolle oder warte kurz...</p>
                </div>
            </div>
        </transition>

        <ion-header>
            <ion-toolbar>
                <ion-title>App Content</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :scroll-events="true" @ionScroll="handleScroll">
            <div class="main-content">
                <ion-card v-for="n in 15" :key="n">
                    <ion-card-content>Inhalt Element {{ n }}</ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonIcon } from '@ionic/vue';
import { logoIonic } from 'ionicons/icons';

const showSplash = ref(true);

// Funktion zum Ausblenden
const dismissSplash = () => {
    showSplash.value = false;
};

// Timer: Nach 3 Sekunden automatisch ausblenden
onMounted(() => {
    setTimeout(() => {
        dismissSplash();
    }, 3000);
});

// Scroll: Sobald der User scrollt, Splash entfernen
const handleScroll = (event) => {
    if (showSplash.value && event.detail.scrollTop > 10) {
        dismissSplash();
    }
};
</script>

<style scoped>
/* Splash-Screen Styling */
.splash-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #3880ff, #2dd36f);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    color: white;
    text-align: center;
}

/* Vue Fade-Animation */
.fade-leave-active {
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.main-content {
    padding: 16px;
}
</style>