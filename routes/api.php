<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

Route::middleware('check.refresh.token')->group(function () {
    Route::post('/register', [AuthController::class, 'post_register']);
    Route::get('/register', [AuthController::class, 'get_register']);
    Route::post('/login', [AuthController::class, 'post_login']);
    Route::get('/login', [AuthController::class, 'get_login']);
});
Route::post('/send-code', [AuthController::class, 'sendCode']);
Route::post('/verify-code', [AuthController::class, 'verifyCode']);
Route::middleware('auth:api')->prefix('auth')->group(function () {
    route::get('/user', [\App\Http\Controllers\UserController::class, 'user']);
});
