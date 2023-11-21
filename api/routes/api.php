<?php

use App\Http\Controllers\AnchorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::name('auth.self.verify')->post('/auth/verify', [AuthController::class, 'verifyAccount']);
Route::name('auth.password.request')
    ->post('/auth/passwords/request', [AuthController::class, 'requestPasswordReset']);
Route::name('auth.password.reset')->post('/auth/passwords/reset', [AuthController::class, 'resetPassword']);
Route::name('auth.users.login')->post('/auth/users/login', [AuthController::class, 'logIn']);
Route::apiResource('blogs', BlogController::class)->only(['index', 'view']);
Route::name('blogs.published.all')->get('/blogs/published/all', [BlogController::class, 'getPublishedBlogs']);


//Route::apiResource('users', UserController::class);

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::name('users.self.update')->patch('/users/self/update', [UserController::class, 'updateSelf']);
    Route::name('users.active.all')->get('/users/active/all', [UserController::class, 'getActiveUsers']);

    Route::name('projects.images.caption.upsert')
        ->patch('/projects/{project}/images/{image}/caption/upsert', [ProjectController::class, 'upsertCaptionOnProjectImage']);

    Route::name('projects.images.update')
        ->patch('/projects/{project}/images/{image}/update', [ProjectController::class, 'updateProjectImage']);

    Route::name('projects.images.delete')
        ->patch('/projects/{project}/images/{image}/delete', [ProjectController::class, 'deleteProjectImage']);

    Route::name('projects.images.assign')
        ->patch('/projects/{project}/images/assign', [ProjectController::class, 'assignImagesToProject']);

    Route::name('auth.users.logout')->get('/auth/users/logout', [AuthController::class, 'logOut']);

    Route::name('blogs.comments.add')->post('/blogs/{blog}/comments/add', [BlogController::class, 'commentToBlog']);

    Route::apiResource('blogs', BlogController::class)->except(['index', 'view']);
    Route::name('comments.reply')->post('/comments/{comment}/reply', [CommentController::class, 'replyToAComment']);
    Route::name('comments.reply.all')->get('/comments/{comment}/reply/all', [CommentController::class, 'getCommentReplies']);

    Route::apiResources([
        'users' => UserController::class,
        'positions' => PositionController::class,
        'events' => EventController::class,
        'projects' => ProjectController::class,
        'anchors' => AnchorController::class
    ]);

});
