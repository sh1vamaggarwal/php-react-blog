<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\TagController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\AboutController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\NewsletterController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public API Routes
Route::prefix('v1')->group(function () {

    // Blogs
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/{slug}', [BlogController::class, 'show']);
    Route::get('/blogs/{slug}/related', [BlogController::class, 'related']);

    // Tags
    Route::get('/tags', [TagController::class, 'index']);
    Route::get('/tags/popular', [TagController::class, 'popular']);

    // Projects
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/featured', [ProjectController::class, 'featured']);
    Route::get('/projects/{slug}', [ProjectController::class, 'show']);

    // About
    Route::get('/about', [AboutController::class, 'index']);

    // Contact
    Route::post('/contact', [ContactController::class, 'store']);

    // Comments
    Route::get('/blogs/{slug}/comments', [CommentController::class, 'index']);
    Route::post('/blogs/{slug}/comments', [CommentController::class, 'store']);

    // Newsletter
    Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
    Route::get('/newsletter/unsubscribe/{token}', [NewsletterController::class, 'unsubscribe']);
});

// Admin Authentication Routes
Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    // Protected Admin Routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        // Dashboard
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
        Route::get('/dashboard/recent', [DashboardController::class, 'recentActivity']);

        // Blogs Management
        Route::apiResource('blogs', \App\Http\Controllers\Admin\BlogController::class);

        // Projects Management
        Route::apiResource('projects', \App\Http\Controllers\Admin\ProjectController::class);

        // Tags Management
        Route::apiResource('tags', \App\Http\Controllers\Admin\TagController::class);

        // About Management
        Route::get('about', [\App\Http\Controllers\Admin\AboutController::class, 'show']);
        Route::put('about', [\App\Http\Controllers\Admin\AboutController::class, 'update']);

        // Contact Messages
        Route::get('contacts', [\App\Http\Controllers\Admin\ContactMessageController::class, 'index']);
        Route::get('contacts/{id}', [\App\Http\Controllers\Admin\ContactMessageController::class, 'show']);
        Route::patch('contacts/{id}/read', [\App\Http\Controllers\Admin\ContactMessageController::class, 'markAsRead']);
        Route::delete('contacts/{id}', [\App\Http\Controllers\Admin\ContactMessageController::class, 'destroy']);

        // Comments Management
        Route::get('comments', [\App\Http\Controllers\Admin\CommentController::class, 'index']);
        Route::patch('comments/{id}/status', [\App\Http\Controllers\Admin\CommentController::class, 'updateStatus']);
        Route::delete('comments/{id}', [\App\Http\Controllers\Admin\CommentController::class, 'destroy']);

        // Newsletter Subscribers
        Route::get('newsletter', [\App\Http\Controllers\Admin\NewsletterController::class, 'index']);
        Route::delete('newsletter/{id}', [\App\Http\Controllers\Admin\NewsletterController::class, 'destroy']);
    });
});
