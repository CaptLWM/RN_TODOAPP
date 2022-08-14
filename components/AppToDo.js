import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';

const AppToDo = ({onInsert}) => {
  const [text, setText] = React.useState('');

  const button = (
    <View style={styles.buttonStyle}>
      <Image source={require('../assets/icons/add_white/add_white.png')} />
    </View>
  );

  const onPress = () => {
    onInsert(text);
    setText('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="할일을 입력하세요."
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={onPress}
        //enter누르면 호출되는 함수
        returnKeyType="done"
        // enter의 타입을 지정, enter 부분에 보이는 설명 또는 아이콘 변경됨
      />
      {/* {Platform.OS === 'ios' ? (
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.buttonStyle}>
            <Image
              source={require('../assets/icons/add_white/add_white.png')}
            />
          </View>
        </TouchableOpacity>
      ) : (
        // ios에서 사용 불가
        <View style={styles.circleWrapper}>
          <TouchableNativeFeedback>
            <View style={styles.buttonStyle}>
              <Image
                source={require('../assets/icons/add_white/add_white.png')}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      )} */}
      {/* 짧게 리팩토링 */}
      {Platform.select({
        ios: (
          <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
            {button}
          </TouchableOpacity>
        ),
        android: (
          <View style={styles.circleWrapper}>
            <TouchableNativeFeedback onPress={onPress}>
              {button}
            </TouchableNativeFeedback>
          </View>
        ),
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 64,
    paddingHorizontal: 16,
    borderColor: '#bdbdbd',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#26a69a',
    borderRadius: 24,
  },
  circleWrapper: {
    overflow: 'hidden',
    borderRadius: 24,
    // 효과가 영역 바깥까지 나오는거 방지
  },
});

export default AppToDo;
