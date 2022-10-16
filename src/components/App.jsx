import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppDiv } from './App.styled';

export class App extends Component {
  state = {
    query: '',
  };

  acquireQuery = query => {
    this.setState({ query });
  };

  render() {
    return (
      <AppDiv
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onFormSubmit={this.acquireQuery} />
        <ImageGallery searchInput={this.state.query} />
      </AppDiv>
    );
  }
}
