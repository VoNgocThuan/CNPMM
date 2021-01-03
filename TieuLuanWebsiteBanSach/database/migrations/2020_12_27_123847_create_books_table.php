<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id('bookId');
            $table->string('name');
            $table->string('author');
            $table->text('description');
            $table->double('originalPrice');
            $table->double('price');
            $table->string('image1');
            $table->string('image2');
            $table->string('image3');
            $table->integer('quantity');
            $table->integer('sold')->default(0);
            $table->integer('ratings');
            $table->integer('status')->default(0)->comment('0=>hết hàng,  1=>hiện có, 2=>ngừng kinh doanh');
            $table->boolean('new');
            $table->boolean('bestsale');
            $table->boolean('toprating');
            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')
                ->references('id')
                ->on('categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
