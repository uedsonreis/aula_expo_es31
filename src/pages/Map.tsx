import { StyleSheet, Text, View } from 'react-native'

import MapView from 'react-native-maps';

export default function MapPage() {
  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        zoomControlEnabled={true}
        camera={{
          center: { latitude: -12.9822831, longitude: -38.4607409 },
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