import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  colors,
} from '../assets';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    height: 60,
    borderBottomWidth: 5,
    borderBottomColor: '#303030',
    shadowColor: '#708090',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    elevation: 1,
  },
  items: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    lineHeight: 24,
    fontSize: 24,
    fontFamily: 'BarlowCondensed-Bold',
  },
  backButton: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  button: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  field: {
    color: '#FFFFFF',
  },
  icon: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

class Header extends React.Component {
  state = {
    show: false,
    text: null,
  }

  showField = () => {
    const { show } = this.state;

    this.setState({
      show: !show,
      text: null,
    });
  }

  render() {
    const { navigation } = this.props;
    let search;

    if ('params' in navigation.state) {
      search = navigation.state.params.search;
    }

    const { show, text } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.items}>
          {show
            ? (
              <TouchableOpacity
                onPress={() => {
                  this.showField();
                  search(null);
                }
                }
                style={styles.backButton}
              >
                <Icon name="arrow-left" color="#FFFFFF" style={styles.icon} />
              </TouchableOpacity>
            )
            : (
              <Text>
                {' '}
              </Text>
            )
          }
          <View style={{ flex: 0.7 }}>
            {show
              ? (
                <TextInput
                  placeholder="Characters"
                  style={{ color: '#FFFFFF' }}
                  placeholderTextColor="#FFFFFF"
                  underlineColorAndroid="#FFFFFF"
                  maxLength={40}
                  autoCapitalize="words"
                  value={text}
                  onChangeText={
                    (text) => {
                      this.setState({ text });
                      if (text.length >= 3) {
                        search(text);
                      }
                    }
                  }
                />
              )
              : (
                <Text style={styles.title}>
                  Characters
                </Text>
              )
            }
          </View>
          {show
            ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ text: null });
                  search(null);
                }
                }
                style={styles.button}
              >
                <Icon name="close" color="#FFFFFF" style={styles.icon} />
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity onPress={this.showField} style={styles.button}>
                <Icon name="magnify" color="#FFFFFF" style={styles.icon} />
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Header;
