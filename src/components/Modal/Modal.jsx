import { Overlay, ModalWindow } from './Modal.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function Modal({ closeModal, properties: { image, altText } }) {
  useEffect(() => {
    const handleEscClick = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscClick);
    document.querySelector('#root').classList.add('modal-open');

    return () => {
      window.removeEventListener('keydown', handleEscClick);
      document.querySelector('#root').classList.remove('modal-open');
    };
  }, [closeModal]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalWindow>
        <img src={image} alt={altText} />
      </ModalWindow>
    </Overlay>
  );
}

Modal.propTypes = {
  properties: PropTypes.objectOf(PropTypes.string).isRequired,
  closeModal: PropTypes.func.isRequired,
};
