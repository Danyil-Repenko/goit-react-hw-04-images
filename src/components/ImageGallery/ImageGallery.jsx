import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { imageFetch } from 'components/imageFetch';
import { Button } from 'components/Button/Button';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Modal } from 'components/Modal/Modal';

const statuses = {
  IDLE: 'idle',
  SEARCHING: 'searching',
  LOADED: 'loaded',
};

export function ImageGallery({ searchInput }) {
  const [galleryData, setGalleryData] = useState(null);
  const [nextPage, setNextPage] = useState(2);
  const [status, setStatus] = useState(statuses.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState(null);

  useEffect(() => {
    if (searchInput === '') {
      return;
    }
    setStatus(statuses.SEARCHING);
    imageFetch(searchInput)
      .then(response => {
        if (response.data.total !== 0) {
          setGalleryData(response.data.hits);
          setNextPage(2);
          setStatus(statuses.LOADED);
        } else {
          setGalleryData([]);
          return Promise.reject(new Error(`Couldn't find ${searchInput}`));
        }
      })
      .catch(error => {
        Notify.failure(error.message);
        setStatus(statuses.IDLE);
      });
  }, [searchInput]);

  const handleLoadMore = () => {
    setStatus(statuses.SEARCHING);

    imageFetch(searchInput, nextPage)
      .then(response => {
        setGalleryData([...galleryData, ...response.data.hits]);
        setNextPage(page => page + 1);
        setStatus(statuses.LOADED);
        const total = response.data.total;
        const imagesLoaded = galleryData.length + 12;
        if (imagesLoaded >= total) {
          return Promise.reject();
        }
      })
      .catch(() => setStatus(statuses.IDLE));
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const getPropsForModal = (image, altText) => {
    setModalProps({ image, altText });
  };

  const createListItems = () => {
    if (galleryData) {
      return galleryData.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            smallImage={webformatURL}
            largeImage={largeImageURL}
            tags={tags}
            toggleModal={toggleModal}
            propsForModal={getPropsForModal}
          />
        );
      });
    }
  };

  return (
    <>
      <Gallery>{createListItems()}</Gallery>
      {status === statuses.SEARCHING && (
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
      {status === statuses.LOADED && <Button onButtonClick={handleLoadMore} />}
      {showModal && <Modal properties={modalProps} closeModal={toggleModal} />}
    </>
  );
}

ImageGallery.propTypes = {
  searchInput: PropTypes.string.isRequired,
};
