import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import { search, update } from './BooksAPI';
import Book from './Book'


class SearchBar extends Component {
  state ={
    query: "",
    books: []
  }

  changeHandle= (event) => {
    this.setState({
      query: event.target.value
    });
    this.state.query && search(this.state.query).then(books => {
    this.setState({
      books: books
    });
    }

    )
  }

  updateBook = (book, shelf) => {
    update(book, shelf).then((res) => {
    }
    )
  }
  render() {

    return (
      <div className="search-books">
      <div className="search-books-bar">
      <Link className="close-search" to='/'> Close </Link>
      <div className="search-books-input-wrapper">
      { /*
         NOTES: The search from BooksAPI is limited to a particular set of search terms.
         You can find these search terms here:
         https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

         However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
         you don't find a specific author or title. Every search is limited by search terms.
       */ }
       <form>
      <input type="text" value={this.state.query} placeholder="Search by title or author" onChange={this.changeHandle} />
      </form>
    </div>
      </div>
      <div className="search-books-results">
      <ol className="books-grid">
      {this.state.books
        .map(book => (
          <Book key={book.id} book={book} updateBook={this.updateBook} />
        ))
      }      
      </ol>
      </div>
      </div>
      );
  }
}

export default SearchBar;
