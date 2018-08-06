import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'BarlowCondensed-Bold',
    color: '#FFF',
    fontSize: 24,
    lineHeight: 24,
  },
});

const Label = (props) => {
  const { text } = props;

  return (
    <View>
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  );
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Label;
