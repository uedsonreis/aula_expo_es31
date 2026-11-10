import AsyncStorage from '@react-native-async-storage/async-storage';

import { Place } from '../models/place';

const LIST_KEY = 'place@LIST_KEY';

export async function getPlaces() {
    const json = await AsyncStorage.getItem(LIST_KEY);
    if (json) {
        return JSON.parse(json) as Place[]
    }
    return []
}

export async function save(place: Place) {
    const list = await getPlaces();

    const saved = list.find(p => p.latitude === place.latitude && p.longitude === place.longitude);
    if (saved) {
        saved.name = place.name;
        saved.description = place.description;
    } else {
        list.push(place);
    }

    await AsyncStorage.setItem(LIST_KEY, JSON.stringify(list));
}
