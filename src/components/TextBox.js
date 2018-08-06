import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
  TouchableHighlight,
  ScrollView,
  View,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
  },
  textBox: {
    height: 80,
  },
  text: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFF',
  },
  textOpacity: {
    width: '100%',
    height: 40,
    position: 'absolute',
    backgroundColor: '#303030',
    opacity: 0.6,
    bottom: 0,
  },
  iconBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 5,
    height: 40,
    opacity: 0.6,
    backgroundColor: '#303030',
    marginBottom: 5,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 30,
  },
});

class TextBox extends React.Component {
  state = {
    collapsed: true,
    minHeight: 80,
    maxHeight: 80,
    animation: new Animated.Value(),
    opacityAnimation: new Animated.Value(),
  }

  componentDidMount() {
    const { animation, minHeight, opacityAnimation } = this.state;

    animation.setValue(minHeight);
    opacityAnimation.setValue(40);
  }

  setMaxHeight(event) {
    this.setState({
      maxHeight: (event.nativeEvent.layout.height + 10),
    });
  }

  toggle = () => {
    const {
      collapsed,
      animation,
      minHeight,
      maxHeight,
      opacityAnimation,
    } = this.state;

    if (maxHeight > 80) {
      this.setState({
        collapsed: !collapsed,
      });

      const initialHeight = collapsed ? minHeight : maxHeight;
      const finalHeight = collapsed ? maxHeight : minHeight;

      const initialOpacity = collapsed ? 40 : 0;
      const finalOpacity = collapsed ? 0 : 40;

      animation.setValue(initialHeight);
      Animated.spring(
        animation,
        {
          toValue: finalHeight,
        },
      ).start();

      opacityAnimation.setValue(initialOpacity);
      Animated.spring(
        opacityAnimation,
        {
          toValue: finalOpacity,
        },
      ).start();
    }
  }

  render() {
    const {
      collapsed,
      animation,
      opacityAnimation,
      maxHeight,
    } = this.state;
    const icon = collapsed ? 'chevron-down' : 'chevron-up';
    const {
      text,
      iconColor,
      style,
    } = this.props;

    return (
      <View>
        <ScrollView style={{ position: 'relative' }}>
          <TouchableHighlight
            onPress={this.toggle}
          >
            <View style={styles.container}>
              <Animated.View
                style={[
                  styles.textBox,
                  {
                    height: animation,
                  },
                ]}
              >
                <View onLayout={this.setMaxHeight.bind(this)}>
                  <Text style={[
                    ...style,
                    styles.text,
                  ]}
                  >
                    {text}
                  </Text>
                  {maxHeight > 80
                    ? (<Animated.View
                      style={[
                        styles.textOpacity,
                        {
                          height: opacityAnimation,
                        },
                      ]}
                    />
                    )
                    : null
                  }
                </View>
              </Animated.View>
            </View>
          </TouchableHighlight>
          {maxHeight > 80 ? (
            <Animated.View style={styles.iconBox}>
              <TouchableHighlight
                style={styles.button}
                onPress={this.toggle}
              >
                <Icon name={icon} color={iconColor} style={styles.icon} />
              </TouchableHighlight>
            </Animated.View>
          ) : null
          }
        </ScrollView>
      </View>
    );
  }
}

TextBox.propTypes = {
  text: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

TextBox.defaultProps = {
  iconColor: '#F0141E',
  style: {},
};

export default TextBox;
