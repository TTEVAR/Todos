
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

type Todo = {
    id: string;
    title: string;
    done: boolean;
};

export default function App() {
     const [todos, setTodos] = useState<Todo[]>([]);

    const [fontsLoaded] = useFonts({
      Interceptor: require('./assets/fonts/Interceptor.otf'),
    });

    
    useEffect(() => {
        AsyncStorage.getItem('todos').then(data => {
            if (!data) return;

            try {
              const storedTodos: unknown = JSON.parse(data);
              if (Array.isArray(storedTodos)) {
                setTodos(storedTodos as Todo[]);
              }
            } catch {
              AsyncStorage.removeItem('todos');
            }
        })
        .catch(() => {});
      }, []);

    if (!fontsLoaded) {
      return null;
    }

    const updateTodos = (updater: (current: Todo[]) => Todo[]) => {
        setTodos(current => {
        const updated = updater(current);
        AsyncStorage.setItem('todos', JSON.stringify(updated));
        return updated;
        });
    };

    const addTodo = (title: string) => {
      updateTodos(current => [
        ...current,
        {
          id: `${Date.now()}-${Math.random()}`,
          title,
          done: false,
        },
      ]);
    };

    const toggleTodo = (id: string) => {
      updateTodos(current =>
        current.map(todo =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    };

    const deleteTodo = (id: string) => {
      updateTodos(current => current.filter(todo => todo.id !== id));
    };

  return (
     <View style={styles.container}>
            <Text style={styles.heading}>Todo List</Text>
          <View></View>

            <TodoInput onAdd={addTodo} />

            <FlatList
                data={todos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TodoItem todo={item} onToggle={toggleTodo} onDelete={deleteTodo} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: 'black',

    },
    heading: {
      width: '100%',
      textAlign: 'center',
      fontFamily: 'Interceptor',
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'green',

    }
});
