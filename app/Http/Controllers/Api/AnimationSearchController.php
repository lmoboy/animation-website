<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Animations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnimationSearchController extends Controller
{
    public function index(Request $request)
    {
        $query = Animations::with('user')
            ->orderBy('created_at', 'desc');

        // Apply filters
        switch ($request->filter) {
            case 'featured':
                $query->where('featured', true);
                break;
            case 'trending':
                $query->where('views', '>', 1000)
                    ->orderBy('views', 'desc');
                break;
            case 'new':
                $query->where('created_at', '>', now()->subDays(7));
                break;
            case 'most-viewed':
                $query->orderBy('views', 'desc');
                break;
        }

        // Apply search if provided
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('user', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $animations = $query->paginate(12);

        return response()->json([
            'data' => $animations->items(),
            'meta' => [
                'current_page' => $animations->currentPage(),
                'last_page' => $animations->lastPage(),
                'per_page' => $animations->perPage(),
                'total' => $animations->total()
            ]
        ]);
    }
}
