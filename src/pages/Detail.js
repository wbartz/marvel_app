import React from 'react';
import PropTypes from 'prop-types';
import {
  connect,
} from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
  YellowBox,
  ScrollView,
} from 'react-native';
import {
  colors,
} from '../assets';
import getHero from '../actions/Detail';
import Loading from '../components/Loading';
import Label from '../components/Label';
import TextBox from '../components/TextBox';
import ComicsList from '../components/ComicsList';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  imageBox: {
    flex: 0.4,
    alignItems: 'center',
    paddingTop: 15,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  textBox: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  descriptionBox: {
    flex: 0.25,
  },
  comicsBox: {
    flex: 0.5,
    alignItems: 'center',
  },
});

class Detail extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: colors.light_red,
  };

  componentDidMount() {
    const { find, navigation } = this.props;
    find(navigation.state.params.hero);
  }

  hasDescription = (hero) => {
    if (hero.description) {
      return (
        <TextBox text={hero.description} />
      );
    }
    return null;
  }

  render() {
    const { hero, loading, error } = this.props;
    if (loading) return <Loading />;

    if (error) {
      return (
        <View style={styles.textBox}>
          <Label text={error} />
        </View>
      );
    }

    const image = `${hero.thumbnail.path}/landscape_xlarge.${hero.thumbnail.extension}`;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageBox}>
          <Image aspectRatio={1} source={{ uri: image }} style={styles.image} />
        </View>

        <View style={styles.textBox}>
          <Label text={hero.name} />
        </View>

        <View style={styles.descriptionBox}>
          {this.hasDescription(hero)}
        </View>

        <View style={styles.comicsBox}>
          <Label text="Comics" />
          <ComicsList uri={hero.comics.collectionURI} />
        </View>
      </ScrollView>
    );
  }
}

Detail.propTypes = {
  find: PropTypes.func,
  navigation: PropTypes.object,
  hero: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

Detail.defaultProps = {
  find: {},
  navigation: {},
  hero: {},
  loading: false,
  error: null,
};

const mapStateToProps = (state) => {
  const { hero, loading, error } = state.hero;

  return {
    hero,
    loading,
    error,
  };
};

const mapDispatchToProps = dispatch => ({
  find: hero => dispatch(getHero(hero)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
