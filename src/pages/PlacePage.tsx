import React from 'react';
import { useRoute } from "@react-navigation/native";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import MyInput from "../components/MyInput";
import * as PlaceRepo from '../services/place.repo';

export default function PlacePage() {

    const route = useRoute()

    const place = route.params as any

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    function save() {
        if (!name || name.trim() === '') {
            Alert.alert('O nome do local é obrigatório!');
        }

        PlaceRepo.save({
            latitude: place.latitude,
            longitude: place.longitude,
            name, description
        });
    }

    return (
        <View style={styles.container}>
            <Text>Latitude: {place.latitude}</Text>
            <Text>Longitude: {place.longitude}</Text>

            <View style={styles.main}>
                <Text style={styles.label}>Informe o nome do local referente as coordenadas acima</Text>

                <MyInput placeholder="Nome" value={name} setValue={setName} />
                <MyInput placeholder="Descrição" type="textArea" value={description} setValue={setDescription} />

                <Button title="Salvar" onPress={save} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    main: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        textAlign: 'center',
    },
});