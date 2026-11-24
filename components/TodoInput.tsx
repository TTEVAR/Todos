import { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
    onAdd: (title: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
    const [title, setTitle] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="New task"
                placeholderTextColor='gray'
                value={title}
                onChangeText={setTitle}
            />

            <Pressable
                style={({ pressed }) => [
                    styles.aButt,
                    pressed && styles.pressed,
                ]}
                onPress={() => {
                    if (title.trim()) {
                        onAdd(title.trim());
                        setTitle('');
                    }
                }}
            >
                <Text style={styles.buttex}>Save</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 44,
        borderWidth: 1,
        borderColor: 'yellow',
        borderRadius: 22,
        paddingHorizontal: 12,
        marginRight: 8,
        color: 'yellow',
    },
    aButt: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: 'yellow',
        backgroundColor: 'black',
    },
    pressed: {
        opacity: 0.6,
    },
    buttex: {
        color: 'yellow',
        fontWeight: 'bold',
    },
});
