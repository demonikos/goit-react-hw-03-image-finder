import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  onClose = () => {
    this.props.closeModal();
  };

  EscapeClick = event => {
    if (event.code === 'Escape') this.onClose();
  };

  BackdropClick = event => {
    if (event.target === event.currentTarget) this.onClose();
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onClose);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onClose);
  }

  render() {
    return (
      <div className="Overlay" onClick={this.BackdropClick}>
        <div className="Modal">
          <img
            className="ImageGalleryItemImage"
            src={this.props.src}
            alt={this.props.alt}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalShow: PropTypes.bool.isRequired,
};
