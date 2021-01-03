import React from "react";
import { Card, Button, Badge, Spinner, Form, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import {
  deleteCategory,
  getCategoryList,
} from "../../../services/CategoryService";

class CategoryList extends React.Component {
  state = {
    categorylist: [],
    searchCategoryList: [],
    isloading: false,
    searchText: "",
  };

  componentDidMount() {
    this.getCategoryLists();
  }

  getCategoryLists = async () => {
    this.setState({ isLoading: true });
    const response = await getCategoryList();
    if (response.success) {
      this.setState({
        categorylist: response.data,
        searchCategoryList: response.data,
        isloading: false,
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  deleteCategory = async (id) => {
    const response = await deleteCategory(id);
    if (response.success) {
      this.getCategoryLists();
    } else {
      alert("Sorry !! Something went wrong !!");
    }
  };

  onSearchCategories = (e) => {
    const searchText = e.target.value;
    this.setState({
      isloading: true,
    });
    if (searchText.length > 0) {
      const searchData = this.state.categorylist.filter(function (item) {
        const itemData = item.name + " " + item.description;
        const textData = searchText.trim().toLowerCase();
        return itemData.trim().toLowerCase().indexOf(textData) !== -1;
      })
      this.setState({
        searchCategoryList: searchData,
        searchText: searchText,
        isloading: false,
      });
    } else {
      this.setState({
        searchText,
      });
      this.getCategoryLists();
    }
  }

  render() {
    return (
      <div className="container my-4">
        <div className="header-part">
          <div className="float-left">
            <h2>
              Danh sách thể loại sách:{" "}
              <Badge variant="primary">{this.state.searchCategoryList.length} thể loại sách</Badge>
            </h2>
          </div>
          <div className="float-left text-center ml-5">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Gõ để tìm kiếm..."
                aria-label="Gõ để tìm kiếm..."
                aria-describedby="basic-addon2"
                onChange={(e) => this.onSearchCategories(e)}
              />
            </InputGroup>
          </div>
          <div className="float-right">
            <Link to={`${PUBLIC_URL}categories/create`} className="btn btn-info">
              + Tạo mới thể loại sách
            </Link>
          </div>
          <div className="clearfix"></div>
        </div>
        {this.state.isloading && (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}

        {this.state.searchCategoryList.length === 0 && (
          <Alert variant={"warning"}>
            Không tìm thấy thể loại sách! Hãy tạo mới thể loại sách...
          </Alert>
        )}

        {this.state.searchCategoryList.map((category, index) => (
          <Card key={index} className="mt-3">
            <Card.Header>
              {category.name} <Badge variant="primary">{category.books_count} quyển sách</Badge></Card.Header>
            <Card.Body>
              <Card.Text>
                {category.description}
              </Card.Text>
              {/* <BookList bookList={category.books} isDetailsView={false} /> */}
              <Link to={`${PUBLIC_URL}categories/view/${category.id}`} className="btn btn-primary mr-2">
                Chi tiết & Cập nhật
              </Link>
              <Button
                variant="danger"
                className="mr-2"
                onClick={() => this.deleteCategory(category.id)}
              >
                Xóa
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default CategoryList;

