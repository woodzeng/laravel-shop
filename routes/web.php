<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/', 'PagesController@root')->name('root');

Auth::routes(['verify' => true]);

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('user/addresses', 'UserAddressesController@index')->name('user.addresses.index');
    Route::get('user/address/create', 'UserAddressesController@create')->name('user.address.create');
    Route::post('user/address', 'UserAddressesController@store')->name('user.address.store');
});