<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = "books";
    protected $primaryKey = "bookId";

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
