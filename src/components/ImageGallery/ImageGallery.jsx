import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { imageFetch } from 'components/imageFetch';
import { Button } from 'components/Button/Button';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    galleryData: null,
    nextPage: 2,
    status: 'idle',
    showModal: false,
    modalProps: null,
  };

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchInput;
    const currentQuery = this.props.searchInput;

    if (prevQuery !== currentQuery) {
      this.setState({ status: 'searching' });
      imageFetch(currentQuery)
        .then(response => {
          if (response.data.total !== 0) {
            return this.setState({
              galleryData: response.data.hits,
              nextPage: 2,
              status: 'loaded',
            });
          } else {
            this.setState({ galleryData: [] });
            return Promise.reject(new Error(`Couldn't find ${currentQuery}`));
          }
        })
        .catch(error => {
          Notify.failure(error.message);
          this.setState({ status: 'idle' });
        });
    }
  }

  handleLoadMore = () => {
    this.setState({ status: 'searching' });
    const currentQuery = this.props.searchInput;
    imageFetch(currentQuery, this.state.nextPage)
      .then(response => {
        this.setState(prevState => {
          return {
            galleryData: [...this.state.galleryData, ...response.data.hits],
            nextPage: prevState.nextPage + 1,
            status: 'loaded',
          };
        });
        const total = response.data.total;
        const imagesLoaded = this.state.galleryData.length + 12;
        if (imagesLoaded >= total) {
          return Promise.reject();
        }
      })
      .catch(() => this.setState({ status: 'idle' }));
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  getPropsForModal = (image, altText) => {
    this.setState({ modalProps: { image, altText } });
  };

  createListItems = () => {
    if (this.state.galleryData) {
      return this.state.galleryData.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              smallImage={webformatURL}
              largeImage={largeImageURL}
              tags={tags}
              toggleModal={this.toggleModal}
              propsForModal={this.getPropsForModal}
            />
          );
        }
      );
    }
  };

  render() {
    const status = this.state.status;
    const modalStatus = this.state.showModal;

    return (
      <>
        <Gallery>{this.createListItems()}</Gallery>
        {status === 'searching' && (
          <MagnifyingGlass
            visible={true}
            height="100"
            width="100"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{ marginRight: 'auto', marginLeft: 'auto' }}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#ffffff"
            color="#000000"
          />
        )}
        {status === 'loaded' && <Button onButtonClick={this.handleLoadMore} />}
        {modalStatus && (
          <Modal
            properties={this.state.modalProps}
            closeModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchInput: PropTypes.string.isRequired,
};
