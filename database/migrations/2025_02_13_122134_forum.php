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
        Schema::create('forum', function (Blueprint $table) {
            $table->id();
            $table->string('forum_name');
            $table->string('forum_description');
            $table->timestamps();
        });
        Schema::create('post', function (Blueprint $table){
            $table->id();
            $table->string('post_title');
            $table->string('post_content');
            $table->foreignId('forum_id')->constrained('forum');
            $table->timestamps();
        });
        Schema::create('comment', function (Blueprint $table){
            $table->id();
            $table->string('comment_content');
            $table->foreignId('post_id')->constrained('post');
            $table->timestamps();
        });
       }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forum');
    }
};
