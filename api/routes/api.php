<?php

use App\Http\Controllers\AuthController;
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
Route::apiResource('users', UserController::class);
Route::apiResource('positions', PositionController::class);
Route::apiResource('events', EventController::class);
Route::apiResource('projects', ProjectController::class);
Route::name('active-users')->get('/users/active/all', [UserController::class, 'getActiveUsers']);
Route::name('add-caption-to-image')->patch('/projects/{projectId}/images/{imageId}', [ProjectController::class, 'addCaptionToProjectImage']);
//Route::apiResource('positions', PositionController::class);


//Route::name('password-reset-request')->post('/password-reset-request', [AuthController::class, 'requestPasswordReset']);
//Route::name('password-reset')->post('/password-reset/{token}', [AuthController::class, 'resetPassword']);
//Route::name('login')->post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
//    Route::prefix('admin.')->group(function () {
//        Route::apiResource('users', UserController::class);
//    });
    Route::name('logout')->get('/logout', [AuthController::class, 'logOut']);

});
