<?php

namespace App\Http\Controllers;

use App\Models\UserAddress;
use Illuminate\Http\Request;
use App\Http\Requests\UserAddressRequest;

class UserAddressesController extends Controller
{
    public function index(Request $request)
    {
        return view('user.addresses.index', [
            'addresses' => $request->user()->addresses,
        ]);
    }

    public function create()
    {
        return view('user.address.edit', ['address' => new UserAddress()]);
    }

    public function store(UserAddressRequest $request)
    {
        $request->user()->addresses()->create($request->only(
            [
                'province',
                'city',
                'district',
                'address',
                'zip',
                'contact_name',
                'contact_phone',
            ]
        ));
        return redirect()->route('user.addresses.index');
    }
}
