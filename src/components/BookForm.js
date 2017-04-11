import React, { Component } from 'react';

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getBookData(this.state.value)
    this.setState({value: ''})

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <br/>
        <label tabIndex="0">
          <p>
            Add a book by isbn
          </p>
          <input className="book-form" type="name" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default BookForm;