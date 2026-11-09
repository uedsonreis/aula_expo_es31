import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapPage from './src/pages/Map';
import PlacePage from './src/pages/PlacePage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="map" component={MapPage} options={{ headerShown: false }} />
        <Stack.Screen name="place" component={PlacePage} options={{ title: 'Registrar Local' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
