import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapPage() {

    const [location, setLocation] = React.useState<any>()

    React.useEffect(() => {
        Location.requestForegroundPermissionsAsync().then(async (result: Location.LocationPermissionResponse) => {
            if (result.status !== 'granted') {
                Alert.alert('A permissão para acessar a Localização foi negada');
                return;
            }
    
            setLocation(await Location.getCurrentPositionAsync({}));
            console.log('Location: ', location);
        });
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                showsUserLocation={true}
                zoomControlEnabled={true}
                camera={{
                    center: {
                        latitude: location === undefined ? 0 : location?.coords.latitude,
                        longitude: location === undefined ? 0 : location?.coords.longitude,
                    },
                    heading: 0, pitch: 0, zoom: 14
                }}
                style={styles.map}
            />
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