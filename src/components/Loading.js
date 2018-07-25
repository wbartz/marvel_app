import React from 'react'
import {
  StyleSheet
} from 'react-native';
import { View, ActivityIndicator } from 'react-native'

const Loading = () => {
  return (
    <View style={style.container}>
      <ActivityIndicator size={75} color='#BB3040' />
    </View>
  )
};

export default Loading

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#d9d9d9',
    opacity: 0.8
  }
})