<?php

namespace App\repositories;
use App\interfaces\CrudInterface;
use App\Models\Book;
use Illuminate\Http\Request;

class BookRepository implements CrudInterface{
    public function getAll(){
        $books = Book::orderBy('bookId','desc')->get();
        return $books;
    }
    public function findById($id){
        $books = Book::with('category')
            ->find($id);
        return $books;
    }
    public function create(Request $request){
        $books = new Book();
        $books->name=$request->name;
        $books->author=$request->author;
        $books->description=$request->description;
        $books->originalPrice=$request->originalPrice;
        $books->price=$request->price;
        $books->quantity=$request->quantity;
        $books->ratings=$request->ratings;
        $books->image1=$request->image1;
        $books->image2=$request->image2;
        $books->image3=$request->image3;
        $books->status=$request->status;
        $books->new=$request->new;
        $books->bestsale=$request->bestsale;
        $books->toprating=$request->toprating;
        $books->category_id=$request->category_id;
        $books->save();
        return $books;
    }
    public function edit(Request $request, $id){
        $books = $this->findById($id);
        $books->name=$request->name;
        $books->author=$request->author;
        $books->description=$request->description;
        $books->originalPrice=$request->originalPrice;
        $books->price=$request->price;
        $books->quantity=$request->quantity;
        $books->ratings=$request->ratings;
        $books->image1=$request->image1;
        $books->image2=$request->image2;
        $books->image3=$request->image3;
        $books->status=$request->status;
        $books->new=$request->new;
        $books->bestsale=$request->bestsale;
        $books->toprating=$request->toprating;
        $books->category_id=$request->category_id;
        $books->save();
        return $books;
    }
    public function delete($id){
        $books = $this->findById($id);
        $books->delete();
        return $books;
    }
}
