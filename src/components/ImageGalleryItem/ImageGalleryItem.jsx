import { GalleryItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  smallImage,
  largeImage,
  tags,
  toggleModal,
  propsForModal,
}) => {
  const handleImageClick = () => {
    toggleModal();
    propsForModal(largeImage, tags);
  };

  return (
    <GalleryItem>
      <Image onClick={handleImageClick} src={smallImage} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
  propsForModal: PropTypes.func.isRequired,
};
