import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppDiv } from './App.styled';

export function App() {
  const [query, setQuery] = useState('');

  const acquireQuery = query => {
    setQuery(query);
  };

  return (
    <AppDiv>
      <Searchbar onFormSubmit={acquireQuery} />
      <ImageGallery searchInput={query} />
    </AppDiv>
  );
}
