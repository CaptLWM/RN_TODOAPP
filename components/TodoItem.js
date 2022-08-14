import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TodoItem = ({id, text, done, onToggle, onRemove}) => {
  const remove = () => {
    Alert.alert(
      '삭제', // 제목
      '정말로 삭제하시겠어요?', //내용
      // 버튼 배열
      [
        {text: '취소', onPress: () => {}, style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            onRemove(id);
          },
          style: 'destructive',
        },
        // style : cancel(취소, 폰트 두껍게), default(기본, 파란색 텍스트), destructive('파괴적', 삭제하는 상황에 적합)
        // 안드로이드에서는 style 적용 안됨, 직접 제작 ;해야함
      ],
      // 옵션 객체
      {cancelable: true, onDismiss: () => {}},
      //onDismiss : ALERT가 닫힐때 호출되는 함수
    );
  };
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => onToggle(id)}>
        <View style={[styles.circle, done && styles.filled]}>
          {done && (
            <Image
              source={require('../assets/icons/check_white/check_white.png')}
            />
          )}
        </View>
      </TouchableOpacity>
      <Text style={[styles.text, done && styles.lineThrough]}>{text}</Text>
      <TouchableOpacity onPress={remove}>
        {done ? (
          <Icon name="delete" size={32} color="red" />
        ) : (
          <View style={styles.removePlaceholder} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomColor: '#e0e0e0',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#26a69a',
    borderWidth: 1,
    marginRight: 16,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  filled: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26a69a',
  },
  lineThrough: {
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
  },
  removePlaceholder: {
    widht: 32,
    height: 32,
  },
});
export default TodoItem;
