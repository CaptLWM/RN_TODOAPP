import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
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
        {/* SafeAreaView는 언제나 SafeAreaProvider 안에 */}
        {/* edge => top, left, right, bottom / left right는 가로모드사용할 때 필요함 */}
        <DateHead date={today} />
        <Empty />
        <AppToDo />
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
});
export default App;
