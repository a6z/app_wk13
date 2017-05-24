import React, { Component } from 'react';
import {
    ScrollView,
   } from 'react-native';

import { List, ListItem } from 'react-native-elements';
import Touches from './Touches';
import albums from '../json/albums.json';

// Make a component
class PageOne extends Component {
  state = { albums: [] };

  componentWillMount() {
    this.setState({ albums });
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.state.albums.map((album) => (
                <Touches
                    album = {{ ...album }}
                    navigation = {this.props.navigation}
                  // hideChevron
                  // rightTitle='More...'
                />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default PageOne;
