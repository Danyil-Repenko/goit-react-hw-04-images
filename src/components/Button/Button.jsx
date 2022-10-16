import { LoadMore, Container } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onButtonClick }) => {
  return (
    <Container>
      <LoadMore onClick={onButtonClick} type="button">
        Load more
      </LoadMore>
    </Container>
  );
};

Button.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};
