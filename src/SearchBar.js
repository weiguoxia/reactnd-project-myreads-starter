import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search, update } from "./BooksAPI";
import Book from "./Book";

class SearchBar extends Component {
  state = {
    query: "",
    books: []
  };

  changeHandle = event => {
    this.setState(
      {
        query: event.target.value
      },
      () => {
        this.state.query &&
          search(this.state.query).then(books => {

            this.setState({
              books: books
            });



          });
        !this.state.query &&
          this.setState({
            books: []
          });
      }
    );
  };

  updateBook = (book, shelf) => {
    update(book, shelf).then(res => {});
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            {" "}
            Close{" "}
          </Link>
          <div className="search-books-input-wrapper">
            <form>
              <input
                type="text"
                value={this.state.query}
                placeholder="Search by title or author"
                onChange={this.changeHandle}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {Array.isArray(this.state.books) &&
              this.state.books.map(
              book => (
                <Book key={book.id} book={book} updateBook={this.updateBook} shelf={this.props.myBooks.hasOwnProperty(book.id)?this.props.myBooks[book.id]:undefined} />
              )
              )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBar;
