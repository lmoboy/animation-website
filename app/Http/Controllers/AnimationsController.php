<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Animations;
use App\Models\OwnedAnimations;
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

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'timeline' => 'array'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->has('timeline')) {
            $timeline = $this->processTimeline($request->timeline);
            $request->merge(['timeline' => $timeline]);
            $request->merge(['duration' => $this->calculateTotalDuration($timeline)]);
        }

        $animation->update($request->all());
        return $animation;
    }

    public function purchase($id)
    {
        $animation = Animations::findOrFail($id);
        if (Auth::user()->points >= $animation->points) {
            
            Auth::user()->points -= $animation->points;
            Auth::user()->save();
            OwnedAnimations::create([
                'user_id' => Auth::user()->id,
                'animation_id' => $id
            ]);
            return response()->json([
                'success' => true,
                'debug' => [
                    "user" => Auth::user(),
                    "animation" => $animation
                ]
            ]);
        } else {
            return response()->json(['errors' => 'Not enough points'], 422);
        }
    }

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
            $processedTimeline = $this->processTimeline($request->timeline);

            $animation = new Animations();
            $animation->name = $request->name;
            $animation->description = $request->description;
            $animation->timeline = $processedTimeline;
            $animation->price = $request->price;
            $animation->views = 0;
            $animation->user_id = Auth::id();
            $animation->duration = $this->calculateTotalDuration($processedTimeline);
            $animation->save();
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

    private function processTimeline(array $timeline): array
    {
        return array_map(function ($step) {
            return [
                'targets' => $step['targets'] ?? '#anim_cube',
                'duration' => $step['duration'] ?? 1000,
                'easing' => $step['easing'] ?? 'easeInOutQuad',
                'loop' => $step['loop'] ?? 1,
                'direction' => $step['direction'] ?? 'normal',
                'delay' => $step['delay'] ?? 0,
                'endDelay' => $step['endDelay'] ?? 0,
                'autoplay' => filter_var($step['autoplay'] ?? true, FILTER_VALIDATE_BOOLEAN),
                'properties' => array_diff_key($step, [
                    'targets' => null,
                    'duration' => null,
                    'easing' => null,
                    'loop' => null,
                    'direction' => null,
                    'delay' => null,
                    'endDelay' => null,
                    'autoplay' => null
                ])
            ];
        }, $timeline);
    }

    private function calculateTotalDuration(array $timeline): int
    {
        return array_reduce($timeline, function ($total, $step) {
            $loops = is_numeric($step['loop']) ? max(1, (int) $step['loop']) : 1;
            $duration = $step['duration'] ?? 1000;
            $delay = $step['delay'] ?? 0;
            $endDelay = $step['endDelay'] ?? 0;

            return $total + (($duration + $delay + $endDelay) * $loops);
        }, 0);
    }
}