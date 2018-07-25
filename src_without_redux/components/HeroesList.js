import React from 'react'
import { FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import HeroesListItem from './HeroesListItem'

import marvelService from '../services';

class HeroesList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      limit: 20,
      offset: 0,
      heroes: [],
      loading: false
    }
  }

  componentDidMount() {
    this.setState({loading: true})

    /*
    (async() => {
      await Font.loadAsync({
          'BarlowCondensed-Bold': require('../assets/fonts/BarlowCondensed-Bold.ttf'),
          'BarlowCondensed-Medium': require('../assets/fonts/BarlowCondensed-Medium.ttf'),
          'BarlowCondensed-Regular': require('../assets/fonts/BarlowCondensed-Regular.ttf')
      })
    })()
    */

    marvelService()
    .then((response) => {
      const {results} = response.data.data
      console.log(results);
      this.setState({
        heroes: results,
        loading: false
      })
      SplashScreen.hide()
    })
    .catch((err) => err)

  }

  listElements = ({item}) => (
    <HeroesListItem key={item.id}
                           hero={item}
                           navigateHeroDetail={this.props.onPressItem} />
  )

  alreadyLoadAll = () => {
    return false
  }

  loadMoreCharacter = () => {
    console.log('aqui')
    if(!this.state.loading && !this.alreadyLoadAll()){
      console.log('if')
      this.state.loading = true;
      this.state.ofsset += this.state.limit;
      this.loadCharacter();
    }
  }

  loadCharacter = () => {
    marvelService(this.state.ofsset, this.state.limit).then((data, reject) => {
      if(reject){
        Alert.alert('Alert', reject);
        this.setState({
          loading: false
        });
      }else{
        console.info(data);
        this.setState({
          characters: this.state.characters.concat(data.results),
          showLoader: false,
          total: data.total,
          loading: false
        });
      }
    })
    .catch((err) => err);
  }

  render() {
    return (
      this.state.loading
      ? <ActivityIndicator size="large" color="#B50F16" />
      :
      <FlatList style={style.containerList}
                data={ this.state.heroes }
                renderItem={ this.listElements }
                keyExtractor={ item => String(item.id) }
                onRefresh={this.loadCharacter}
                refreshing={this.state.loading}
                onEndReached={ () => {
                    // this.loadMoreCharacter
                    console.log('onEndReached')
                  }
                }
                onEndReachedThreshold={ 0.5 }
      />
  )}
}

const style = StyleSheet.create({
  containerList: {
    marginTop: 10,
    flex: 1
  }
})

export default HeroesList