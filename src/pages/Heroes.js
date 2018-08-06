import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  connect,
} from 'react-redux';
import Header from '../components/Header';
import HeroesList from '../components/HeroesList';
import {
  getHeroes,
  resetHeroes,
} from '../actions/Hero';
import {
  colors,
} from '../assets';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});

class Heroes extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header navigation={navigation} />
    ),
  });

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const { reset } = this.props;

    navigation.setParams({
      search: reset,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeroesList {...this.props} />
      </View>
    );
  }
}

Heroes.propTypes = {
  heroes: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  listHeroes: PropTypes.func,
  reset: PropTypes.func,
  navigation: PropTypes.object,
};

Heroes.defaultProps = {
  heroes: {},
  loading: true,
  error: null,
  listHeroes: {},
  reset: {},
  navigation: {},
};

const mapStateToProps = (state) => {
  const { heroes, loading, error } = state.heroes;

  return {
    heroes,
    loading,
    error,
  };
};

const mapDispatchToProps = dispatch => ({
  listHeroes: offset => dispatch(getHeroes(offset)),
  reset: text => dispatch(resetHeroes(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Heroes);
