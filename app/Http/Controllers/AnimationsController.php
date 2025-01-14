<?php

namespace App\Http\Controllers;

use App\Models\Animations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AnimationsController extends Controller
{
    public function featured()
    {
        return Animations::orderBy('id', 'asc')
            ->take(10)
            ->get();
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
        
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'timeline' => 'array'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // If timeline is updated, recalculate duration
        if ($request->has('timeline')) {
            $totalDuration = collect($request->timeline)->sum(function($animation) {
                $loops = $animation['loop'] ?? 1;
                $duration = $animation['duration'] ?? 1000;
                $delay = $animation['delay'] ?? 0;
                $endDelay = $animation['endDelay'] ?? 0;
                return ($duration + $delay + $endDelay) * $loops;
            });
            $request->merge(['duration' => $totalDuration]);
        }

        $animation->update($request->all());
        return $animation;
    }

    /**
     * Create a new animation
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'timeline' => 'required|array',
            'price' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $totalDuration = 0;
            foreach ($request->timeline as $animation) {
                if (isset($animation['duration'])) {
                    $totalDuration += $animation['duration'];
                }
            }

            $animation = new Animations();
            $animation->name = $request->name;
            $animation->description = $request->description;
            $animation->timeline = $request->timeline; // Laravel will automatically JSON encode this
            $animation->price = $request->price;
            $animation->views = 0;
            $animation->user_id = Auth::id();
            $animation->duration = $totalDuration;
            $animation->save();

            return response()->json([
                'message' => 'Animation created successfully',
                'animation' => $animation
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating animation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $animation = Animations::findOrFail($id);
        $animation->delete();
        return response()->json(['message' => 'Animation deleted successfully']);
    }

    /**
     * Increment the view count for an animation
     */
    public function incrementViews($id)
    {
        try {
            $animation = Animations::findOrFail($id);
            $animation->increment('views');
            return response()->json(['views' => $animation->views]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error incrementing views'], 500);
        }
    }
}
