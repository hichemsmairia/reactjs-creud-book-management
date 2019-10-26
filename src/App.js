import React from "react";
import idGenerator from "react-id-generator";
import { render } from 'react-dom';
 class App extends React.Component {
  state = {
    books: [],
    book_name: "",
    book_price: "",
    book_author: "",
    book_category: "",
    id: 0,
    create: true
  };
  componentDidMount() {
    //Intializing sample data
    const bks = [
      { book_name: "John", book_price: "Doe",book_author: "Doe",book_author: "Doe", id: 0 },
      
    ];
    this.setState({
      books: bks.map(e => {
        return {
    book_name: e.book_name,
    book_price: e.book_price,
    book_author: e.book_author,
    book_category: e.book_category,
          id: idGenerator()
        };
      })
    });
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleCreateEmployee = () => {
    if (this.state.books) {
      this.setState({
        books: [
          ...this.state.books,
          {
            book_name: this.state.book_name,
           book_price: this.state.book_price,
           book_author: this.state.book_author,
           book_category: this.state.book_category,
            id: idGenerator()
          }
        ]
      });
    } else {
      this.setState({
        books: [
          {
            book_name: this.state.book_name,
           book_price: this.state.book_price,
           book_author: this.state.book_author,
           book_category: this.state.book_category,
            id: idGenerator()
          }
        ]
      });
    }
    this.setState({ book_name: "", book_price: "" , book_author : "" , book_category : "" });
  };

  handleEdit = e => {
    const book = this.state.books.find(function(bks) {
      if (bks.id === e.target.id) {
        return bks;
      }
    });
    this.setState({
      book_name: this.state.book_name,
           book_price: this.state.book_price,
           book_author: this.state.book_author,
           book_category: this.state.book_category,
      id: book.id,
      create: false
    });
  };
  handleDelete = e => {
    this.setState({
      books: this.state.books.filter(function(bks) {
        if (bks.id !== e.target.id) return bks;
      })
    });
  };
  handleUpdateEmployee = () => {
    const book = {
      book_name: this.state.book_name,
           book_price: this.state.book_price,
           book_author: this.state.book_author,
           book_category: this.state.book_category,
      id: this.state.id
    };
    const employeesupdated = this.state.books.map(bks => {
      if (bks.id === this.state.id) {
        return book;
      } else return bks;
    });

    this.setState((prevStae, props) => ({
      books: employeesupdated,
      create: true,
      book_name: "",
           book_price: "",
           book_author: "",
           book_category: "",
    }));
  };

  render() {
    const create = this.state.create ? "Save" : "Update";
    const { books } = this.state;
    const inputIsEmpty =
      this.state.book_name === "" || this.state.book_price === "" || this.state.book_author === "" || this.state.book_category === "" ? true : false;
    return (
      <div>
        <input
          style={{ width: 120 }}
          type="text"
          placeholder="Enter Firstname"
          onChange={this.handleChange}
          name="book_name"
          value={this.state.book_name}
        />
        <input
          style={{ width: 120 }}
          type="text"
          placeholder="Enter Firstname"
          onChange={this.handleChange}
          id="book_name"
          name="book_price"
          value={this.state.book_price}
        />
        <input
          style={{ width: 120 }}
          type="text"
          placeholder="Enter Firstname"
          onChange={this.handleChange}
          name="book_author"
          value={this.state.book_author}
        />
        <input
          style={{ width: 120 }}
          type="text"
          placeholder="Enter Firstname"
          onChange={this.handleChange}
          name="book_category"
          value={this.state.book_category}
        />

        <button class="savebtn"
          style={{ width: 150 }}
          disabled={inputIsEmpty}
          onClick={
            this.state.create
              ? this.handleCreateEmployee
              : this.handleUpdateEmployee
          }
        >
          {create}
        </button>
        <br />
        <table border="1" style={{ width: 400, paddingTop: 5 }}>
          <thead>
            <tr>
              <th>book Name</th>
              <th>book price</th>
              <th>book author</th>
              <th>book category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((bks, i) => {
              return (
                <tr key={i}>
                  <td>{bks.book_name}</td>
                  <td>{bks.book_price}</td>
                  <td>{bks.book_author}</td>
                  <td>{bks.book_category}</td>
                  <td>
                    <button class="editbtn" onClick={this.handleEdit} id={bks.id}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button class="deletebtn" onClick={this.handleDelete} id={bks.id}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App ; 




