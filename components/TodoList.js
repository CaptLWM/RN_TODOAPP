import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import TodoItem from './TodoItem';

const TodoList = ({todos, onToggle, onRemove}) => {
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      // 컴포넌트 사이 구분해주는 선 생성
      style={styles.list}
      data={todos}
      renderItem={({item}) => (
        <TodoItem
          id={item.id}
          text={item.text}
          done={item.done}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      )}
      keyExtractor={item => item.id.toString()}
      //각 항목의 고유값 추출, id를 고유값으로, 고유값이 없다면 index 사용, 고유값은 반드시 문자열로 변환해야함
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});
export default TodoList;
