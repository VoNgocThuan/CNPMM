<?php

namespace App\repositories;
use App\interfaces\CrudInterface;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryRepository implements CrudInterface{
    public function getAll(){
        $categories = Category::withCount('books')->with('books')->orderBy('id','desc')->get();
        return $categories;
    }
    public function findById($id){
        $categories = Category::with('books')
            ->find($id);
        return $categories;
    }
    public function create(Request $request){
        $categories = new Category();
        $categories->name=$request->name;
        $categories->description=$request->description;
        $categories->user_id=$request->user_id;
        $categories->save();
        return $categories;
    }
    public function edit(Request $request, $id){
        $categories = $this->findById($id);
        $categories->name=$request->name;
        $categories->description=$request->description;
        $categories->user_id=$request->user_id;
        $categories->save();
        return $categories;
    }
    public function delete($id){
        $categories = $this->findById($id);
        $categories->books()->delete();
        $categories->delete();
        return $categories;
    }
}
