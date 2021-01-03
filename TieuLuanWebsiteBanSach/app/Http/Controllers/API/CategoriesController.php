<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\CategoryRepository;
use Illuminate\Http\Request;
use App\Models\User;

class CategoriesController extends Controller
{
    public $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository) {
        $this->categoryRepository = $categoryRepository;
    }

    public function index()
    {
        $categories = $this->categoryRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Category List',
            'data'    => $categories
        ]);
    }

    public function show($id)
    {
        $categories = $this->categoryRepository->findById($id);
        if(is_null($categories))
        {
            return response()->json([
                'success' => false,
                'message' => 'Category Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Category Details',
            'data'    => $categories
        ]);
    }

    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required'
        ], [
            'name.required' => 'Please give category name',
            'description.required' => 'Please give category description',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        
        $categories = $this->categoryRepository->create($request);      

        return response()->json([
            'success' => true,
            'message' => 'Category Stored',
            'data'    => $categories
        ]);
    }

    public function update(Request $request, $id)
    {
        $categories = $this->categoryRepository->findById($id);
        if (is_null($categories)) {
            return response()->json([
                'success' => false,
                'message' => 'Category Not found',
                'data' => null,
            ]);
        }

        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required'
        ], [
            'name.required' => 'Please give category name',
            'description.required' => 'Please give category description',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $categories = $this->categoryRepository->edit($request, $id);
        return response()->json([
            'success' => true,
            'message' => 'Category Updated',
            'data'    => $categories
        ]);
    }

    public function destroy($id)
    {
        $categories = $this->categoryRepository->findById($id);
        if (is_null($categories)) {
            return response()->json([
                'success' => false,
                'message' => 'Category Not found',
                'data' => null,
            ]);
        }

        $categories = $this->categoryRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Category Deleted',
            'data'    => $categories
        ]);
    }
}
