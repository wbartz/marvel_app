import React from 'react';
import PropTypes from 'prop-types';
import {
  connect,
} from 'react-redux';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import getComics from '../actions/Comics';
import { colors } from '../assets';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  items: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  imageBox: {
    flex: 0.3,
  },
  image: {
    width: 70,
    height: 90,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    flex: 0.7,
  },
  text: {
    fontFamily: 'BarlowCondensed-Regular',
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 19,
  },
});

class ComicsList extends React.Component {
  componentDidMount() {
    const { find, uri } = this.props;

    find(uri);
  }

  renderItem = ({ item }) => (
    <View style={styles.items}>
      <View style={styles.imageBox}>
        <View style={styles.image}>
          <Image aspectRatio={1} source={{ uri: item.image }} style={styles.image} />
        </View>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          {item.name}
        </Text>
      </View>
    </View>
  );

  render() {
    const { comics, loading } = this.props;

    if (loading) {
      return (
        <ActivityIndicator
          size={30}
          color={colors.light_red}
          style={{
            marginTop: 20,
          }}
        />
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={comics}
          renderItem={this.renderItem}
          keyExtractor={item => String(item.id)}
        />
      </View>
    );
  }
}

ComicsList.propTypes = {
  uri: PropTypes.string,
  find: PropTypes.func,
  comics: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  loading: PropTypes.bool,
};

ComicsList.defaultProps = {
  uri: null,
  find: {},
  comics: {},
  loading: false,
};


const mapStateToProps = (state) => {
  const { comics, loading, error } = state.comics;

  return {
    comics,
    loading,
    error,
  };
};

const mapDispatchToProps = dispatch => ({
  find: comic => dispatch(getComics(comic)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComicsList);
