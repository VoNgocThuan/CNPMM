import React from 'react'
import { Card, Badge } from 'react-bootstrap';
import { updateBook, deleteBook } from "../../../services/BookService";

import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
class BookList extends React.Component {
    state = {
        book: {},
        isloading: false,
        category_id: this.props.category_id,
        toggleEditBook: false,
    };

    toggleCompleteStatus = async (item) => {
        if (item.status === 0) {
            item.status = 1;
        } else {
            item.status = 0;
        }
        await updateBook(item.bookId, item);
        this.props.onEditBook();
    };

    updateBook = async (id) => {
        const response = await updateBook(id);
        if (response.success) {
            this.props.onEditBook();
        } else {
            alert("Sorry !! Something went wrong !!");
        }
    };

    deleteBook = async (id) => {
        const response = await deleteBook(id);
        if (response.success) {
            this.props.onEditBook();
        } else {
            alert("Sorry !! Something went wrong !!");
        }
    };

    getBookDetails = () => {
        this.setState({ isloading: true });
        Axios.get(`http://127.0.0.1:8000/api/books/${this.props.match.params.id}`
        ).then((res) => {
            this.setState({
                book: res.data.data,
                isloading: false,
            });
        });
    }

    toggleEditBook = () => {
        this.setState({
            toggleEditBook: !this.state.toggleEditBook,
        });
    };

    onCompleteBookEdit = () => {
        this.getBookDetails();
        this.toggleEditBook();
    }

    render() {
        return (
            <>
                {this.props.bookList.map((book, index) => (
                    <Card key={index} className="mt-1 mb-1">
                        <Card.Body>
                            <div>
                                <div className="float-left">
                                    <p>
                                        {book.status === 0 && (
                                            <del className="text-success">
                                                <strong>
                                                    {book.name}{" "}
                                                    <Badge variant="primary">{book.books_count}</Badge>
                                                </strong>
                                            </del>
                                        )}
                                    </p>
                                    <p>
                                        {book.status === 1 && (
                                            <span>
                                                <strong>Tên sách: {book.name}</strong>{" "}
                                                <Badge variant="primary">{book.books_count}</Badge>
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <div className="float-right">
                                    {book.quantity !== 0 && (
                                        <>
                                            <button
                                                className={`btn btn-outline-info btn-sm`}
                                            >
                                                <span> ✓ Hiện có</span>
                                            </button>
                                        </>
                                    )}

                                    {book.quantity === 0 && (
                                        <>
                                            <button
                                                className={`btn btn-outline-danger btn-sm`}
                                            >
                                                <span> Hết hàng</span>
                                            </button>
                                        </>
                                    )}

                                    <Link
                                        to={`${PUBLIC_URL}books/view/${book.bookId}`}
                                        className="btn btn-outline-success btn-sm ml-2"
                                    >
                                        Chi tiết
                                    </Link>

                                    <Link
                                        to={`${PUBLIC_URL}books/update/${book.bookId}`}
                                        className="btn btn-outline-primary btn-sm ml-2"
                                    >
                                        Cập nhật
                                    </Link>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            {this.props.isDetailsView && (
                                <Card.Text>
                                    Tác giả: {book.author} <br />
                                    Giá tiền: {book.price} VNĐ <br />
                                    Số lượng sách trong kho: {book.quantity} quyển sách <br />
                                    Số lượng sách bán được: {book.sold} quyển sách
                                </Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                ))}
            </>
        );
    }
}

export default BookList;