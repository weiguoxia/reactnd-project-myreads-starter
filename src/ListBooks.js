import React, { Component } from 'react'
import { getAll, update } from './BooksAPI';
import Book from './Book'
class ListBooks extends Component {
  state = {
    books: []
  }

  componentDidMount= () => {
    getAll().then((books) => this.setState({
      books: books
    }));
  }


updateBook = (book, shelf) => {
  update(book, shelf).then((res) => {
    this.setState((state => ({
      books: state.books.map((b) => {
        if (b.id !== book.id) {
          return b;
        } else {
          b.shelf = shelf;
          return b;
        }
      })
    }))
    )
  }
  )
}

  // update(book, shelf).then( (res) => {
  //   this.setState({
  //     books :books
  //  })})
  // }


  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
      this.state.books
        .filter(book => (
          book.shelf === "currentlyReading"
        ))
        .map(book => (
          <Book key={book.id} book={book} updateBook={this.updateBook}/>
        ))
      }
      </ol>

      </div>
        </div>
        <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
        {this.state.books
        .filter(book => (
          book.shelf === "wantToRead"
        ))
        .map(book => (
          <Book key={book.id} book={book} updateBook={this.updateBook} />
        ))
      }

      </ol>
        </div>
        </div>
        <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
        {
      this.state.books
        .filter(book => (
          book.shelf === "read"
        ))
        .map(book => (
          <Book key={book.id} book={book} updateBook={this.updateBook}/>
        ))
      }
      </ol>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
  }
}

export default ListBooks;
