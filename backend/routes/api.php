<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\BeneficiaryController;
use App\Http\Controllers\AccountController;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
});



Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('beneficiaries', BeneficiaryController::class);
});


Route::middleware('auth:sanctum')->group(function () {
     Route::put('/accounts/{id}/primary', [AccountController::class, 'setPrimary']); 
});