import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { BiSearchAlt } from 'react-icons/bi';
import {
  Search,
  Form,
  SubmitButton,
  Input,
} from 'components/Searchbar/Searchbar.styled';

export function Searchbar({ onFormSubmit }) {
  const [query, setQuery] = useState('');

  const handleInput = event => {
    const input = event.target.value;
    setQuery(input);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!query.trim()) {
      Notify.warning("Make sure you've enterd the search query");
      return;
    }

    onFormSubmit(query);
  };

  return (
    <Search>
      <Form onSubmit={handleSubmit}>
        <SubmitButton type="submit">
          <BiSearchAlt size="25px" />
        </SubmitButton>

        <Input
          onChange={handleInput}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Search>
  );
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
