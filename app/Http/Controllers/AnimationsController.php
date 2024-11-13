<?php



namespace App\Http\Controllers;

use App\Models\Animations;
use Illuminate\Http\Request;

class AnimationsController extends Controller
{
    
    public function featured()
    {
        
        return Animations::orderBy('id', 'asc')->take(10)->get();
        
    }

    public function index()
    {
        return Animations::all();
    }
    
    public function show($id)
    {
        return Animations::findOrFail($id);
    }
    public function update(Request $request, $id)
    {
        $animation = Animations::findOrFail($id);
        $animation->update($request->all());
        return $animation;
    }

    public function create(Request $request)
    {
        $animation = new Animations();
        $animation->fill($request->all());
        $animation->save();
        return $animation;
    }
}
