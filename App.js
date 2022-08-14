import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppToDo from './components/AppToDo';
import DateHead from './components/DateHead';
import Empty from './components/Empty';
import TodoList from './components/TodoList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import todosStorage from './storages/todoStorage';

const App = () => {
  const today = new Date();

  const [todos, setTodos] = React.useState([
    {id: 1, text: '작업환경 설정', done: true},
    {id: 2, text: '리액트 네이티브 기초 공부', done: false},
    {id: 3, text: '투두리스트 만들어보기', done: false},
  ]);

  const onInsert = text => {
    // 새로 등록할 항목의 id
    // 등록된 항목 중에서 가장 큰 id를 구하고 그 값에 +1
    // 만약 리스트가 비어있다면 1을 id로 사용
    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false,
    };
    setTodos(todos.concat(todo));
  };

  const onToggle = id => {
    const nextTodos = todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );
    setTodos(nextTodos);
  };

  const onRemove = id => {
    const nextTodos = todos.filter(todo => todo.id !== id);
    setTodos(nextTodos);
  };

  // 비동기 할때는 순서가 중요함
  // 불러오기
  React.useEffect(() => {
    // 추상화 하여 불러오기
    todosStorage.get().then(setTodos).catch(console.error);
    // const load = async () => {
    //   try {
    //     const rawTodos = await AsyncStorage.getItem('todos');
    //     const savedTodos = JSON.parse(rawTodos);
    //   } catch (e) {
    //     console.log('Failed to load todos :', e);
    //   }
    // };
  }, []);

  //저장
  React.useEffect(() => {
    // 추상화 하여 불러오기
    todosStorage.set(todos).catch(console.error);
    // const save = async () => {
    //   try {
    //     await AsyncStorage.setItem('todos', JSON.stringify(todos));
    //   } catch (e) {
    //     console.log('Failed to save todos :', e);
    //   }
    // };
  }, [todos]);
  return (
    // <SafeAreaView style={{flex:1}}> ios 노치 양옆 채울때
    <SafeAreaProvider>
      <SafeAreaView style={styles.block} edge={'bottom'}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding', android: undefined})}
          //ios면 keyboard가 올라오면서 input도 밀어버리게(화면 가리지 않게)
          style={styles.avoid}>
          {/* SafeAreaView는 언제나 SafeAreaProvider 안에 */}
          {/* edge => top, left, right, bottom / left right는 가로모드사용할 때 필요함 */}
          <DateHead date={today} />
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          )}
          <AppToDo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
    //안드로이드 배경색은 기본이 연한 회색
  },
  avoid: {
    flex: 1,
  },
});
export default App;
