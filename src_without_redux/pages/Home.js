import React from 'react'
import {StyleSheet, View} from 'react-native'
import HeroesList from '../components/HeroesList'
import Header from '../components/Header'

// import SplashScreen from 'react-native-splash-screen'

const style = StyleSheet.create({
  app: {
    backgroundColor: '#303030',
    flex: 1,
    justifyContent: 'center'
  }
})

export default class List extends React.Component {

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <View style={style.app}>
        <Header contentHeader="Characters" />
        <HeroesList onPressItem={this.props.navigation}/>
      </View>
    )
  }
}

