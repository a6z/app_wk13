import React, { Component } from 'react';
import {
    LayoutAnimation,
    UIManager,
    Animated,
    Dimensions,
    PanResponder
   } from 'react-native';

import { List, ListItem } from 'react-native-elements';
import albums from '../json/albums.json';

const { width, height } = Dimensions.get('window');

// Make a component
class Touches extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    this.state = { position }
}
//  state = { albums: [] };

componentWillMount() {
    this.panResponder = PanResponder.create({
        //onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: (this.onShouldDrag),
        onPanResponderMove: (event, gesture) => {
            this.state.position.setValue({ x: gesture.dx });
        },
        onPanResponderRelease: this.onReleaseItem,
        onPanResponderTerminate: this.onReleaseItem,
    });
}

  onShouldDrag = (event, gesture) => {
    const { dx } = gesture;
    return Math.abs(dx) > 2;
}

onReleaseItem = (event, gesture) => {
    let config = {
        toValue: { x: 0, y: 0 },
        duration: 500,
    };

    Animated.spring(
        this.state.position,
        config,
    ).start();
}

  goToPageTwo = (album) => {
    this.props.navigation.navigate('Details', { ...album });
  };


  render() {
    return (
      <Animated.View
          style={this.state.position.getLayout()}
          {...this.panResponder.panHandlers}
      >
                <ListItem
                  key={this.props.album.title}
                  roundAvatar
                  avatar={{ uri: this.props.album.image }}
                  title={this.props.album.title}
                  subtitle={this.props.album.artist}
                  onPress={() => this.goToPageTwo(this.props.album)}
                  // hideChevron
                  // rightTitle='More...'
                />
              </Animated.View>
    );
  }
}

export default Touches;
