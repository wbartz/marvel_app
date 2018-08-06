import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  colors,
} from '../assets';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
});

const Loading = (props) => {
  const { transparent } = props;

  if (transparent) {
    return (
      <View style={[style.container, { backgroundColor: 'transparent' }]}>
        <ActivityIndicator size={50} color={colors.light_red} />
      </View>
    );
  }
  return (
    <View style={style.container}>
      <ActivityIndicator size={90} color={colors.light_red} />
    </View>
  );
};

Loading.propTypes = {
  transparent: PropTypes.bool,
};

Loading.defaultProps = {
  transparent: false,
};

export default Loading;
