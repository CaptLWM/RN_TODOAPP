// AsyncStorage 코드 추상화

import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'todos';

const todosStorage = {
  async get() {
    try {
      const rawTodos = await AsyncStorage.getItem(key);

      if (!rawTodos) {
        // 저장된 데이터가 없으면 사용하지 않음
        throw new Error('No saved todos');
      }

      const savedTodos = JSON.parse(rawTodos);
      return savedTodos;
    } catch (e) {
      throw new Error('Failed to load todos:', e);
    }
  },
  async set(data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      throw new Error('failed to save todos:', e);
    }
  },
};

export default todosStorage;
