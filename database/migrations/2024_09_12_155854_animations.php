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
            $table->foreignId('parameter_id')->constrained('animation_parameters')->onDelete('cascade');
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
