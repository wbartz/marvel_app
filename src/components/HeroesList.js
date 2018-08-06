import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableHighlight,
} from 'react-native';
import Label from './Label';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#202020',
  },
  imageBox: {
    flex: 0.2,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textBox: {
    flex: 0.7,
  },
  text: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 20,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  iconBox: {
    flex: 0.1,
  },
  icon: {
    fontSize: 24,
  },
});

const noImage = require('../assets/images/noImage.png');

class HeroesList extends React.Component {
  state = {
    offset: 20,
  }

  componentDidMount() {
    const { reset } = this.props;
    reset();
  }

  search = () => {
    const { offset } = this.state;
    const { listHeroes, heroes } = this.props;

    if (heroes.length > 10) {
      this.setState({
        offset: offset + 20,
      });

      listHeroes(offset);
    }
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;

    return (
      <TouchableHighlight
        onPress={
          () => navigation.navigate('Detail', {
            hero: item.id,
          })
        }
      >
        <View style={styles.item}>
          <View style={styles.imageBox}>
            {item.image.includes('image_not_available')
              ? <Image source={noImage} style={styles.image} />
              : <Image source={{ uri: item.image }} style={styles.image} />
            }
          </View>

          <View style={styles.textBox}>
            <Text style={styles.text}>
              {item.name}
            </Text>
          </View>

          <View style={styles.iconBox}>
            <Icon name="chevron-right" color="#F0141E" style={styles.icon} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const {
      heroes,
      loading,
      error,
      reset,
    } = this.props;

    if (error) {
      return (
        <View style={styles.textBox}>
          <Label text={error} />
        </View>
      );
    }

    if (heroes.length === 0 && !loading) {
      return (
        <View style={styles.textBox}>
          <Label text="Nenhum registro encontrado" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          refreshing={loading}
          onRefresh={reset}
          data={heroes}
          renderItem={this.renderItem}
          keyExtractor={item => String(item.id)}
          // onEndReached={this.search}
          // onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

HeroesList.propTypes = {
  heroes: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  listHeroes: PropTypes.func,
  reset: PropTypes.func,
  navigation: PropTypes.object,
};

HeroesList.defaultProps = {
  heroes: {},
  loading: true,
  error: null,
  listHeroes: {},
  reset: {},
  navigation: {},
};

export default HeroesList;
