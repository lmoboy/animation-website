<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AnimationsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

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

Route::middleware('auth')->group(function () {
    // API Routes
    Route::prefix('api')->group(function () {
        Route::get('/animations/featured', [AnimationsController::class, 'featured'])->name('api.animation.featured');
        Route::get('/animations/search', [AnimationsController::class, 'search'])->name('api.animation.search');
        Route::get('/animations/{id}', [AnimationsController::class, 'getParams'])->name('api.animation.params');
    });

    // Page Routes
    Route::get('/animation/tool', function () {
        return Inertia::render('Forum/Tool');
    })->name('animation.tool');

    Route::get('/animation/featured', function () {
        return Inertia::render('Forum/Featured');
    })->name('animation.featured');

    Route::get('/animation/search', function () {
        return Inertia::render('Forum/Search');
    })->name('animation.search');

    Route::get('/animation/about', function () {
        return Inertia::render('Forum/About');
    })->name('animation.about');

    // This wildcard route should be last
    Route::get('/animation/{id}', [AnimationsController::class, 'show'])->name('animation.show');

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
