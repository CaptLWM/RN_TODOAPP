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

const App = () => {
  const today = new Date();

  return (
    // <SafeAreaView style={{flex:1}}> ios 노치 양옆 채울때
    <SafeAreaProvider>
      <SafeAreaView style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding', android: undefined})}
          //ios면 keyboard가 올라오면서 input도 밀어버리게(화면 가리지 않게)
          style={styles.avoid}>
          {/* SafeAreaView는 언제나 SafeAreaProvider 안에 */}
          {/* edge => top, left, right, bottom / left right는 가로모드사용할 때 필요함 */}
          <DateHead date={today} />
          <Empty />
          <AppToDo />
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
