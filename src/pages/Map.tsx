import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { LongPressEvent, Marker } from 'react-native-maps';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import * as placeRepo from '../services/place.repo';
import { Place } from '../models/place';

export default function MapPage() {

    const navigation = useNavigation<NavigationProp<any>>();

    const [location, setLocation] = React.useState<any>();
    const [places, setPlaces] = React.useState<Place[]>([]);

    function fetchUsers() {
        placeRepo.getPlaces().then(list => {
            setPlaces(list);
        });
    }

    React.useEffect(() => {
        Location.requestForegroundPermissionsAsync().then(async (result: Location.LocationPermissionResponse) => {
            if (result.status !== 'granted') {
                Alert.alert('A permissão para acessar a Localização foi negada');
                return;
            }
    
            setLocation(await Location.getCurrentPositionAsync({}));
        });

        fetchUsers();

        navigation.addListener('focus', fetchUsers);
    }, []);

    function goToCreatePage(event: LongPressEvent) {
        navigation.navigate('place', event.nativeEvent.coordinate);
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                zoomControlEnabled={true}
                onLongPress={goToCreatePage}
                camera={{
                    center: {
                        latitude: location === undefined ? 0 : location?.coords.latitude,
                        longitude: location === undefined ? 0 : location?.coords.longitude,
                    },
                    heading: 0, pitch: 0, zoom: 15
                }}
            >
                { places.map(p => <Marker key={`${p.latitude}_${p.longitude}`} title={p.name} coordinate={p} />) }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});