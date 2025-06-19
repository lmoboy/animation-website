<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Animations;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function deleteAnimation($id)
    {
        $animation = Animations::findOrFail($id);
        $animation->delete();

        return response()->json(['message' => 'Animation deleted successfully']);
    }
}
