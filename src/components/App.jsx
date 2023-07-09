import React, { Component } from 'react';
import { Notify } from 'notiflix';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { getImages, PER_PAGE } from 'services/getImages';

export class App extends Component {
  state = {
    imageList: null,
    query: '',
    page: 1,
    isModalShow: false,
    isLoaderShow: false,
    isLoadMoreShow: false,
  };

  onSubmit = event => {
    const query = event.target.elements.input.value;
    if (query === '') {
      Notify.info(
        `It seems you didn't write enything, please specify what exactly you are looking for`
      );
    } else {
      if (this.state.query === query) {
        Notify.info(
          `It seems your query duplicate previous, please write another one`
        );
      } else {
        this.setState({
          query: query.toLowerCase(),
          isLoadMoreShow: false,
          imageList: [],
          page: 1,
        });
      }
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  closeModal = () => {
    this.setState({ isModalShow: false });
  };

  onClick = (src, alt) => {
    this.setState({
      isModalShow: true,
      largeImage: {
        src,
        alt,
      },
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoaderShow: true });
      await getImages(this.state.query, this.state.page)
        .then(response => {
          const lastPage = Math.ceil(response.totalHits / PER_PAGE);
          console.log(lastPage);
          if (response.totalHits === 0) {
            Notify.warning(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            this.setState({ isLoadMoreShow: false });
          } else {
          }
          if (this.state.page === lastPage) {
            Notify.info(
              `We're sorry, but you've reached the end of search results.`
            );
            this.setState({ isLoadMoreShow: false });
          } else {
            if (this.state.page === 1) {
              Notify.success(
                `Hooray! We found some images for request "${this.state.query}".`
              );
            }
            this.setState(prevState => {
              return {
                imageList: [...prevState.imageList, ...response.hits],
                isLoadMoreShow: true,
              };
            });
          }
        })
        .catch(error => console.log(error));
      this.setState({ isLoaderShow: false });
    }
  }

  render() {
    const { imageList, isLoadMoreShow, isModalShow, largeImage } =
      this.state;

    const { onClick, loadMore, onSubmit, closeModal } = this;

    return (
      <>
        <div className="App">
          <Searchbar onSubmit={onSubmit} />
          {imageList && (
            <ImageGallery imageList={imageList} onClick={onClick} />
          )}
          {this.state.isLoaderShow && <Loader />}
          {imageList && isLoadMoreShow && <Button onClick={loadMore} />}
          {isModalShow && (
            <Modal
              src={largeImage.src}
              alt={largeImage.alt}
              isModalShow={isModalShow}
              closeModal={closeModal}
            />
          )}
        </div>
      </>
    );
  }
}
