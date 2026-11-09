import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { LongPressEvent, Marker } from 'react-native-maps';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function MapPage() {

    const navigation = useNavigation<NavigationProp<any>>();
    const [location, setLocation] = React.useState<any>()

    React.useEffect(() => {
        Location.requestForegroundPermissionsAsync().then(async (result: Location.LocationPermissionResponse) => {
            if (result.status !== 'granted') {
                Alert.alert('A permissão para acessar a Localização foi negada');
                return;
            }
    
            setLocation(await Location.getCurrentPositionAsync({}));
        });
    }, [])

    function goToCreatePage(event: LongPressEvent) {
        console.log(event.nativeEvent.coordinate)
        navigation.navigate('place');
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
                <Marker
                    title='Testando'
                    coordinate={{ latitude: -12.9943265, longitude: -38.4592818 }}
                />
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