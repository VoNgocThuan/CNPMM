<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\BookRepository;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    public $bookRepository;

    public function __construct(BookRepository $bookRepository) {
        $this->bookRepository = $bookRepository;
    }

    public function index()
    {
        $books = $this->bookRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Book List',
            'data'    => $books
        ]);
    }

    public function show($id)
    {
        $books = $this->bookRepository->findById($id);
        if(is_null($books))
        {
            return response()->json([
                'success' => false,
                'message' => 'Book Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Book Details',
            'data'    => $books
        ]);
    }

    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'author' => 'required',
            'description' => 'required',
            'originalPrice' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'ratings' => 'required',
            'image1' => 'required',
            'image2' => 'required',
            'image3' => 'required',
            'status' => 'required',
            'new' => 'required',
            'bestsale' => 'required',
            'toprating' => 'required',
            'category_id' => 'required'
        ], [
            'name.required' => 'Please give book name',
            'author.required' => 'Please give book author',
            'description.required' => 'Please give book description',
            'originalPrice.required' => 'Please give book originalPrice',
            'price.required' => 'Please give book price',
            'quantity.required' => 'Please give book quantity',
            'ratings.required' => 'Please give book ratings',
            'image1.required' => 'Please give book image1',
            'image2.required' => 'Please give book image2',
            'image3.required' => 'Please give book image3',
            'status.required' => 'Please give book status',
            'new.required' => 'Please give new book',
            'bestsale.required' => 'Please give bestsale book',
            'toprating.required' => 'Please give toprating book',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $books = $this->bookRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Book Stored',
            'data'    => $books
        ]);
    }

    public function update(Request $request, $id)
    {
        $books = $this->bookRepository->findById($id);
        if (is_null($books)) {
            return response()->json([
                'success' => false,
                'message' => 'Book Not found',
                'data' => null,
            ]);
        }

        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'author' => 'required',
            'description' => 'required',
            'originalPrice' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'ratings' => 'required',
            'image1' => 'required',
            'image2' => 'required',
            'image3' => 'required',
            'status' => 'required',
            'new' => 'required',
            'bestsale' => 'required',
            'toprating' => 'required',
            'category_id' => 'required'
        ], [
            'name.required' => 'Please give book name',
            'description.required' => 'Please give book description',
            'originalPrice.required' => 'Please give book originalPrice',
            'price.required' => 'Please give book price',
            'quantity.required' => 'Please give book quantity',
            'ratings.required' => 'Please give book ratings',
            'image1.required' => 'Please give book image1',
            'image2.required' => 'Please give book image2',
            'image3.required' => 'Please give book image3',
            'status.required' => 'Please give book status',
            'new.required' => 'Please give new book',
            'bestsale.required' => 'Please give bestsale book',
            'toprating.required' => 'Please give toprating book',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $books = $this->bookRepository->edit($request, $id);
        return response()->json([
            'success' => true,
            'message' => 'Book Updated',
            'data'    => $books
        ]);
    }

    public function updateQuantity(Request $request, $id)
    {
        $books = $this->bookRepository->findById($id);
        if (is_null($books)) {
            return response()->json([
                'success' => false,
                'message' => 'Book Not found',
                'data' => null,
            ]);
        }

        
    }

    public function destroy($id)
    {
        $books = $this->bookRepository->findById($id);
        if (is_null($books)) {
            return response()->json([
                'success' => false,
                'message' => 'Book Not found',
                'data' => null,
            ]);
        }

        $books = $this->bookRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Book Deleted',
            'data'    => $books
        ]);
    }
}
