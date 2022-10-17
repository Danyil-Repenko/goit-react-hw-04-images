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
    <AppDiv
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <Searchbar onFormSubmit={acquireQuery} />
      <ImageGallery searchInput={query} />
    </AppDiv>
  );
}
