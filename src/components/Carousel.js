import React, { Component } from 'react';
import Slider from 'react-slick';
import _ from 'lodash'
import '../css/Carousel.css'


class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookStatus: null
    }
    this.checkoutBook = this.checkoutBook.bind(this);
    this.returnBook = this.returnBook.bind(this);
  }

  componentDidMount() {
    this.setState({
      bookStatus: ''
    })
  }
  checkoutBook = (book) => {
    this.props.checkout(book.title)
    this.props.changeBookStatus(book)
  }

  returnBook = (book) => {
    this.props.return(book.title)
    this.props.changeBookStatus(book)
  }

  checkoutButton(book) {
    if (book.status === false) {
      return <button value={book.title} onClick={() => this.returnBook(book)}> Return </button>
    } else if (book.status === true) {
      return <button value={book.title} onClick={() => this.checkoutBook(book)}> Checkout </button> 
    } else {
      null
    }
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      accessibility: true
    };



    const slideShow = this.props.books.map((book) =>
      <div
        className="book-slide"
        key={book.id}
        >
        {this.checkoutButton(book)}
        <h3 tabIndex="0">{book.title}</h3>
            isbn: {book.id} <br/>
        <em> by: {book.author} </em>
        <div className="container">
          <div className="col">
            <img tabIndex="0" src={book.img_url} alt="Not Found"/><br/>
          </div>
          <div className="col">
            {_.take(book.desc, 500)}...
          </div>
        </div>
      </div>
    )
    return (
      <Slider {...settings}>
        {slideShow}
      </Slider>
    );
  }
}

export default Carousel;
