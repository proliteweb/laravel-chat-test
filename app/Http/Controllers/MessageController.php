<?php

namespace App\Http\Controllers;

use App\Events\PrivateMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
	public function store(Request $request)
	{
		event(new PrivateMessage($request->get('body'), Auth::user()));
    }

}
