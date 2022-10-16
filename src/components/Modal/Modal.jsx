import { Overlay, ModalWindow } from './Modal.styled';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClick);
    document.querySelector('#root').classList.add('modal-open');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscClick);
    document.querySelector('#root').classList.remove('modal-open');
  }

  handleEscClick = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { image, altText } = this.props.properties;

    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalWindow>
          <img src={image} alt={altText} />
        </ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  properties: PropTypes.objectOf(PropTypes.string).isRequired,
  closeModal: PropTypes.func.isRequired,
};
