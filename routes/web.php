<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AnimationsController;
use App\Http\Controllers\Api\AnimationSearchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/forum', function () {
        return Inertia::render('Forum/Featured');
    })->name('forum');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/search', function () {
        return Inertia::render('Animation/Search');
    })->name('search');

    Route::get('/explore', function () {
        return Inertia::render('Animation/Explore');
    })->name('explore');

    Route::get('/welcome', function () {
        return Inertia::render('Welcome');
    })->name('welcome');

    Route::get('/create', function () {
        return Inertia::render('Animation/Create');
    })->name('create');

    Route::get('/about', function () {
        return Inertia::render('About');
    })->name('about');


    Route::get('/forum', function (){
        return Inertia::render('Animation/Forum');
    })->name('forum');



    Route::get('/api/featured', [AnimationsController::class, 'featured'])->name('featured');

    Route::get('/api/animations/search', [AnimationSearchController::class, 'index'])->name('animations.search');

    Route::post('/animations', [AnimationsController::class, 'create'])->name('animations.create');
    Route::get('/animations', [AnimationsController::class, 'index'])->name('animations.index');
    Route::get('/animations/{id}', [AnimationsController::class, 'show'])->name('animations.show');
    Route::put('/animations/{id}', [AnimationsController::class, 'update'])->name('animations.update');
    Route::delete('/animations/{id}', [AnimationsController::class, 'destroy'])->name('animations.destroy');
    Route::post('/animations/{id}/views', [AnimationsController::class, 'incrementViews'])->name('animations.increment-views');
});

require __DIR__.'/auth.php';
