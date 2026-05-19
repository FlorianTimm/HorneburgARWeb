
import closeSvg from '@/assets/icons/close.svg';
import axios from 'axios';

export default function fullScreen(src: string, description?: string, event?: Event) {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '100vw';
    div.style.height = '100vh';
    div.style.background = 'rgb(74, 89, 74)';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.style.zIndex = '1000';
    div.style.cursor = 'pointer';
    div.style.opacity = '0';
    div.style.transition = 'opacity 0.5s ease';
    div.style.animation = 'fadeIn 5s ease';
    const closeDiv = () => {
        div.style.opacity = '0';
        div.style.pointerEvents = 'none';

        setTimeout(() => {
            document.body.removeChild(div);
        }, 1000);
    };

    div.addEventListener('click', closeDiv);
    const img = new Image();
    img.src = src;
    div.appendChild(img);
    document.body.appendChild(div);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeDiv();
        }
    }, { once: true });

    if (description) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.textContent = description;
        descriptionDiv.style.position = 'absolute';
        descriptionDiv.style.bottom = '2em';
        descriptionDiv.style.left = '50%';
        descriptionDiv.style.transform = 'translateX(-50%)';
        descriptionDiv.style.color = 'white';
        descriptionDiv.style.textAlign = 'center';
        descriptionDiv.style.backgroundColor = 'rgba(50, 50, 50, 0.2)';
        descriptionDiv.style.textShadow = '0 0 7px black';
        descriptionDiv.style.borderRadius = '10px';
        descriptionDiv.style.boxShadow = '0 0 15px 30px rgba(50, 50, 50, 0.2)';
        div.appendChild(descriptionDiv);
    }

    const closeButton = document.createElement('img');
    closeButton.src = closeSvg;
    closeButton.style.position = 'absolute';
    closeButton.style.top = '2em';
    closeButton.style.right = '2em';
    closeButton.style.background = 'transparent';
    closeButton.style.cursor = 'pointer';
    closeButton.style.width = '1em';
    closeButton.style.height = '1em';
    closeButton.style.filter = 'invert(1) drop-shadow(0 0 4px rgb(74, 89, 74))';
    closeButton.style.transition = 'transform 0.3s ease';
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.transform = 'scale(1.2)';
    });
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.transform = 'scale(1)';
    });
    closeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        closeDiv();
    });
    div.appendChild(closeButton);

    img.style.position = 'fixed';
    img.style.top = '50%';
    img.style.left = '50%';
    img.style.maxWidth = '90vw';
    img.style.maxHeight = '90vh';
    img.style.transform = 'translate(-50%, -50%)';
    img.onload = () => {
        div.style.opacity = '1';
    }
    if (event) {
        event.preventDefault();
    }
    return false;
}

export type ImageData = {
    src: string;
    description: { [language: string]: string };
}


export async function getImages(key: string): Promise<ImageData[]> {
    const response = await axios.get("./bilder/bilder.json");
    return response.data[key];
}