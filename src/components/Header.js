import React from 'react'
import { Text, View, StatusBar, StyleSheet } from 'react-native'

const Header = props => (
  <View style={style.headerContainer}>
    <StatusBar backgroundColor="#A5060D" />
    <Text style={style.headerTitle}>{props.contentHeader}</Text>
  </View>
)

const style = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#B50F16',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 4
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold'
    //fontFamily: 'BarlowCondensed-Bold'
  }
})

export default Header