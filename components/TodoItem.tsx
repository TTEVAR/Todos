import { View, Text, Pressable, Button, StyleSheet } from 'react-native';

type Props = {
    todo: {
        id: string;
        title: string;
        done: boolean;
    };
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
                style={{ flex: 1, padding: 15 }}
                onPress={() => onToggle(todo.id)}
            >
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text
                        style={{
                            fontSize: 18,
                            lineHeight: 24,
                            color: todo.done ? 'red' : 'green',
                        }}
                    >
                        {todo.title}
                    </Text>

                    {todo.done && (
                        <View
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                height: 2,
                                top: 11,
                                backgroundColor: 'white',
                            }}
                        />
                    )}
                </View>
            </Pressable>

            {todo.done && (
                <Pressable
                   style={({ pressed }) => [
                    styles.deleteButton,
                    pressed && styles.pressed,
                   ]}
                    onPress={() => onDelete(todo.id)}
                >
                <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    deleteButton: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: 'black',
    },
    pressed: {
        opacity: 0.6,
    },
    deleteText: {
        color: 'red',
        fontWeight: 'bold',
    },
});
