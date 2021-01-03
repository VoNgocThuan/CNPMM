import Axios from "axios";
import React from "react";
import { Button, Badge, Spinner, InputGroup, Alert, FormControl } from 'react-bootstrap';
import BookCreate from "../books/BookCreate";
import BookList from "../books/BookList";
import CategoryEdit from "./CategoryEdit";
class CategoryView extends React.Component {
  state = {
    category: {},
    bookList: [],
    searchBookList: [],
    isloading: false,

    toggleAddBook: false,
    toggleEditCategory: false,

    searchText: "",
  };

  componentDidMount() {
    this.getCategoryDetails();
  }

  getCategoryDetails = () => {
    this.setState({ isloading: true });
    Axios.get(`http://127.0.0.1:8000/api/categories/${this.props.match.params.id}`
    ).then((res) => {
      this.setState({
        bookList: res.data.data.books,
        searchBookList: res.data.data.books,
        category: res.data.data,
        isloading: false,
      });
    });
  }

  toggleAddBook = () => {
    this.setState({
      toggleEditCategory: false,
      toggleAddBook: !this.state.toggleAddBook,
    });
  };

  toggleEditCategory = () => {
    this.setState({
      toggleAddBook: false,
      toggleEditCategory: !this.state.toggleEditCategory,
    });
  };

  onCompleteBookCreate = (book) => {
    this.toggleAddBook();
    let books = this.state.bookList;
    books.unshift(book);
    this.setState({
      bookList: books,
      searchBookList: books,
    });
  }

  onCompleteCategoryEdit = () => {
    this.getCategoryDetails();
    this.toggleEditCategory();
  }

  onEditBook = () => {
    this.getCategoryDetails();
  }

  onSearchBooks = (e) => {
    const searchText = e.target.value;
    this.setState({
      isloading: true,
    });
    if (searchText.length > 0) {
      const searchData = this.state.bookList.filter(function (item) {
        const itemData = item.name + " " + item.price;
        const textData = searchText.trim().toLowerCase();
        return itemData.trim().toLowerCase().indexOf(textData) !== -1;
      })
      this.setState({
        searchBookList: searchData,
        searchText: searchText,
        isloading: false,
      });
    } else {
      this.setState({
        searchText,
      });
      this.getCategoryDetails();
    }
  }

  render() {
    return (
      <>
        <div className="container my-4">
          <div className="header-part">
            <div className="float-left">
              {!this.state.toggleEditCategory && (
                <>
                  <h2>
                    {this.state.category.name}:{" "}
                    <Badge variant="primary">{
                      this.state.searchBookList.length} quyển sách
                    </Badge>
                  </h2>
                </>
              )}
              {this.state.toggleEditCategory && (
                <>
                  <CategoryEdit
                    category={this.state.category}
                    onCompleteCategoryEdit={this.onCompleteCategoryEdit}
                  />
                </>
              )}
            </div>
            <div className="float-left ml-5">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Gõ để tìm kiếm..."
                  aria-label="Gõ để tìm kiếm..."
                  aria-describedby="basic-addon2"
                  onChange={(e) => this.onSearchBooks(e)}
                />
              </InputGroup>
            </div>
            <div className="float-right">
              <Button
                className="btn btn-success mr-2"
                onClick={() => this.toggleEditCategory()}
              >
                {!this.state.toggleEditCategory && <span>Cập nhật thể loại sách</span>}
                {this.state.toggleEditCategory && <span>Hủy bỏ</span>}
              </Button>
              <Button
                className="btn btn-info mr-2"
                onClick={() => this.toggleAddBook()}
              >
                {!this.state.toggleAddBook && <span>+ Thêm sách</span>}
                {this.state.toggleAddBook && <span>Hủy bỏ</span>}
              </Button>
            </div>
            <div className="clearfix"></div>
          </div>


          {this.state.toggleAddBook && (
            <BookCreate
              category_id={this.props.match.params.id}
              onCompleteBookCreate={this.onCompleteBookCreate}
            />
          )}

          {this.state.isloading && (
            <div className="text-center mt-5">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}

          {this.state.searchBookList.length === 0 && (
            <Alert variant={"warning"}>
              Không tìm thấy sách! Hãy tạo mới sách...
            </Alert>
          )}

          <BookList
            bookList={this.state.searchBookList}
            toggleEditBook={this.state.toggleEditBook}
            isDetailsView={true}
            onEditBook={this.onEditBook}
            category_id={this.props.match.params.id}
          />
        </div>
      </>
    );
  }
}

export default CategoryView;

