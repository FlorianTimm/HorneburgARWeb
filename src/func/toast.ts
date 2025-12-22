import { toastController } from '@ionic/vue';

export async function toast(text: string) {
    const toast = await toastController.create({
        message: text,
        duration: 1500,
        position: 'bottom',
    });

    await toast.present();
}