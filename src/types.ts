import { Ref } from 'vue';

export type ModelleJson = Ref<Record<string, { name: string; path: string, longitude: number, latitude: number, rotation: number }>>;