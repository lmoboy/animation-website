<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('animation_parameters', function (Blueprint $table) {
            $table->id();
            $table->json('targets')->nullable();
            $table->integer('duration')->nullable();
            $table->integer('delay')->nullable();
            $table->integer('endDelay')->nullable();
            $table->string('easing')->nullable();
            $table->string('direction')->nullable();
            $table->boolean('loop')->default(false);
            $table->boolean('autoplay')->default(true);
            $table->json('translateX')->nullable();
            $table->json('translateY')->nullable();
            $table->json('translateZ')->nullable();
            $table->json('rotate')->nullable();
            $table->json('rotateX')->nullable();
            $table->json('rotateY')->nullable();
            $table->json('rotateZ')->nullable();
            $table->json('scale')->nullable();
            $table->json('scaleX')->nullable();
            $table->json('scaleY')->nullable();
            $table->json('scaleZ')->nullable();
            $table->json('opacity')->nullable();
            $table->json('backgroundColor')->nullable();
            $table->json('borderRadius')->nullable();
            $table->json('width')->nullable();
            $table->json('height')->nullable();
            $table->integer('elasticity')->nullable();
            $table->boolean('round')->default(false);
            $table->json('keyframes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('animation_parameters');
    }
};
