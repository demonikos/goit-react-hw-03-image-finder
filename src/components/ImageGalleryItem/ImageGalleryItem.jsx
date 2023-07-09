import React from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt, largeImageURL, onClick }) => {
  return (
    <>
      <li
        className="ImageGalleryItem"
        onClick={() => onClick(largeImageURL, alt)}
      >
        <img src={src} alt={alt} className="ImageGalleryItemImage" />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
