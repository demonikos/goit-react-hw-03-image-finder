import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imageList, onClick }) => {
  return (
    <>
      <ul className="ImageGallery">
        {imageList.map(elem => (
          <ImageGalleryItem
            key={elem.id}
            src={elem.webformatURL}
            alt={elem.tags}
            largeImageURL={elem.largeImageURL}
            onClick={onClick}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  imageList: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
