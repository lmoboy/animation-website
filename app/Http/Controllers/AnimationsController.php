<?php



namespace App\Http\Controllers;

use App\Models\Animations;
use App\Models\AnimationParameters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AnimationsController extends Controller
{
    
    public function featured()
    {
        try {
            return Animations::with('parameters')
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get();
        } catch (\Exception $e) {
            Log::error('Error fetching featured animations: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch featured animations'], 500);
        }
        
    }

    public function index()
    {
        try {
            return Animations::with('parameters')->get();
        } catch (\Exception $e) {
            Log::error('Error fetching animations: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch animations'], 500);
        }
    }

    public function getParams($id){
        try {
            $params = AnimationParameters::findOrFail($id);
            return response()->json([$params->toAnimeJs()]);
        } catch (\Exception $e) {
            Log::error('Error fetching animation parameters: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch animation parameters ', "stack" => $e->getMessage()], 500);
        }
    }
    
    public function show($id)
    {
        try {
            $animation = Animations::with('parameters')->findOrFail($id);
            return Inertia::render('Animation/Show', [
                'animation' => $animation
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching animation: ' . $e->getMessage());
            return redirect()->route('animation.featured')->with('error', 'Animation not found');
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $animation = Animations::findOrFail($id);
            $animation->update($request->all());
            return $animation->load('parameters');
        } catch (\Exception $e) {
            Log::error('Error updating animation: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update animation'], 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $animation = new Animations();
            $animation->fill($request->all());
            $animation->save();

            if ($request->has('parameters')) {
                $params = new AnimationParameters($request->parameters);
                $animation->parameters()->save($params);
            }

            return $animation->load('parameters');
        } catch (\Exception $e) {
            Log::error('Error creating animation: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create animation'], 500);
        }
    }

    public function search(Request $request)
    {
        try {
            $searchTerm = $request->get('q', '');
            $filters = [
                'category' => $request->get('category', 'all'),
                'sortBy' => $request->get('sortBy', 'relevance'),
                'timeframe' => $request->get('timeframe', 'all'),
                'complexity' => $request->get('complexity', 'all')
            ];

            $results = Animations::searchAnimations($searchTerm, $filters);
            return response()->json($results);
        } catch (\Exception $e) {
            Log::error('Search error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to perform search', 'stack' => $e->getMessage()], 500);
        }
    }
}
