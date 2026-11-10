import { StyleSheet, Text, TextInput, View } from "react-native";

import styles from './styles';

type Props = {
    placeholder: string
    type?: 'default' | 'textArea'
    value?: string
    setValue: (value: string) => void
};

export default function MyInput(props: Props) {
    if (props.type === 'textArea') {
        return (
            <TextInput
                multiline numberOfLines={10}
                style={styles.inputTextArea} placeholder={props.placeholder}
                value={props.value} onChangeText={v => props.setValue(v)}
            />
        )
    }
    return (
        <TextInput
            style={styles.input} placeholder={props.placeholder}
            value={props.value} onChangeText={v => props.setValue(v)}
        />
    )
}