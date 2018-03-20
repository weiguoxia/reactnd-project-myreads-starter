import React from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import ListBooks from "./ListBooks";
import { Link, Route } from "react-router-dom";
class BooksApp extends React.Component {
  state = {
     myBooks:{}
  };

  updateMyBooks = (books) =>{
    this.setState((myBooks) => {
      let temp = {}
      books.forEach(function(book) {
        temp[book.id] = book.shelf
      });
      console.log(temp);
     return {myBooks:temp};
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <SearchBar myBooks={this.state.myBooks} />} />
        <Route
      exact
      path="/"
      render={() => (
        <div>
              <ListBooks updateMyBooks={this.updateMyBooks} />
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
      )}
      />
      </div>
      );
  }
}

export default BooksApp;
