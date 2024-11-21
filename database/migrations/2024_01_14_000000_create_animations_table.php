<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('animations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->default('Untitled Animation');
            $table->text('description')->nullable();
            $table->json('timeline')->nullable();
            $table->decimal('price', 8, 2)->default(0);
            $table->text('user_id');
            $table->integer('views')->default(0);
            $table->boolean('featured')->default(false);
            $table->integer('duration')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('animations');
    }
};
