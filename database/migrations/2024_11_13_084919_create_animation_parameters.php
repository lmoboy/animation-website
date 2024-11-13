<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('animation_parameters', function (Blueprint $table) {
            $table->id();
            $table->string('direction');
            $table->integer('duration');
            $table->integer('translateX');
            $table->integer('translateY');
            $table->string('easing');
            $table->boolean('loop');
            $table->boolean('rotate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animation_parameters');
    }
};
