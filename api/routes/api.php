<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TestimonialController;
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
Route::name('auth.users.login')->post('/auth/users/login', [AuthController::class, 'login']);
Route::apiResource('blogs', BlogController::class)->only(['index', 'view']);
Route::name('blogs.published.all')->get('/blogs/published/all', [BlogController::class, 'getPublishedBlogs']);
//Route::name('sermons.published.all')->get('/sermons/published/all', [AudioMessageController::class, 'getPublishedSermons']);
Route::name('projects.donations.all')->get('/projects/donations/all', [ProjectController::class, 'getProjectsThatRequireDonations']);

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::name('users.self.update')->patch('/users/self/update', [UserController::class, 'updateSelf']);
    Route::name('users.active.all')->get('/users/active/all', [UserController::class, 'getActiveUsers']);

    Route::name('projects.images.delete')
        ->delete('/projects/{project}/images/{image}/delete', [ProjectController::class, 'deleteProjectImage']);

    Route::name('auth.users.logout')->get('/auth/users/logout', [AuthController::class, 'logout']);

    Route::name('blogs.comments.add')->post('/blogs/{blog}/comments/add', [BlogController::class, 'commentToBlog']);

    Route::apiResource('blogs', BlogController::class)->except(['index', 'view']);
    Route::name('comments.reply')->post('/comments/{comment}/reply', [CommentController::class, 'replyToAComment']);
    Route::name('comments.reply.all')->get('/comments/{comment}/reply/all', [CommentController::class, 'getCommentReplies']);

    // Delete operation on assets
    Route::name('events.images.delete')
        ->delete('/events/{event}/images/{image}/delete', [EventController::class, 'deleteEventImage']);

    Route::name('podcasts.audios.delete')
        ->delete('/podcasts/{podcast}/audios/{audio}/delete', [PodcastController::class, 'deletePodcastAudio']);

    Route::name('users.images.delete')
        ->delete('/users/{user}/images/{image}/delete', [UserController::class, 'deleteUserAvatar']);

    Route::name('testimonials.images.delete')
        ->delete('/testimonials/{testimonial}/images/{image}/delete', [TestimonialController::class, 'deleteTestimonialAvatar']);

    Route::name('galleries.images.delete')
        ->delete('/galleries/{gallery}/images/{image}/delete', [GalleryController::class, 'deleteGalleryImage']);

    Route::name('assets.images.delete')
        ->delete('/assets/{asset}/images/{image}/delete', [AssetController::class, 'deleteAssetImage']);

    // Maintenance mode.
    Route::name('operations.maintenance.up')
        ->post('/operations/maintenance/up', [MaintenanceController::class, 'disable']);
    Route::name('operations.maintenance.down')
        ->post('/operations/maintenance/down', [MaintenanceController::class, 'enable']);

    // API Resources endpoints such as index, store, update, delete, and show.
    Route::apiResources([
        'users' => UserController::class,
        'positions' => PositionController::class,
        'events' => EventController::class,
        'projects' => ProjectController::class,
        'galleries' => GalleryController::class,
        'testimonials' => TestimonialController::class,
        'podcasts' => PodcastController::class,
        'blogs' => BlogController::class,
        'assets' => AssetController::class,
    ]);

});
