import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = { inputText: '' };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onSubmit(event);
  };

  onInputChange = event => {
    this.setState({ inputText: event.target.value });
  };

  render() {
    return (
      <>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.onSubmitHandler}>
            <button type="submit" className="SearchFormButton">
              <span className="SearchFormButtonLabel">Search</span>
            </button>

            <input
              className="SearchFormInput"
              type="text"
              autoComplete="off"
              name="input"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.inputText}
              onInput={this.onInputChange}
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
