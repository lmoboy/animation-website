<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AnimationsController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/forum', function () {
    return Inertia::render('Forum/Featured');
})->middleware(['auth', 'verified'])->name('forum');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Animation Routes
    Route::get('/animation/create', function () {
        return Inertia::render('Animation/Create');
    })->name('animation.create');

    Route::get('/animation/search', function () {
        return Inertia::render('Animation/Search');
    })->name('animation.search');

    Route::get('/animation/explore', function () {
        return Inertia::render('Animation/Explore');
    })->name('animation.explore');

    Route::get('/about', function () {
        return Inertia::render('About');
    })->name('about');

    Route::get('/api/featured' , [AnimationsController::class, 'featured'])->name('featured');

});

require __DIR__.'/auth.php';
