<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Animations extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'param_ref',
        'owner_id',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function parameters(): HasOne
    {
        return $this->hasOne(AnimationParameters::class, 'id', 'param_ref');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function searchAnimations($searchTerm, $filters)
    {
        $query = self::query()
            ->with('parameters')
            ->when($searchTerm, function($q) use ($searchTerm) {
                return $q->where('name', 'like', "%{$searchTerm}%")
                        ->orWhere('description', 'like', "%{$searchTerm}%");
            });

        // Apply filters if they exist
        if (isset($filters['category']) && $filters['category'] !== 'all') {
            $query->where('category', $filters['category']);
        }

        if (isset($filters['complexity']) && $filters['complexity'] !== 'all') {
            $query->where('complexity', $filters['complexity']);
        }

        // Apply timeframe filter
        if (isset($filters['timeframe']) && $filters['timeframe'] !== 'all') {
            $date = now();
            switch ($filters['timeframe']) {
                case 'day':
                    $date->subDay();
                    break;
                case 'week':
                    $date->subWeek();
                    break;
                case 'month':
                    $date->subMonth();
                    break;
                case 'year':
                    $date->subYear();
                    break;
            }
            $query->where('created_at', '>=', $date);
        }

        // Apply sorting
        if (isset($filters['sortBy'])) {
            switch ($filters['sortBy']) {
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'popular':
                    $query->orderBy('likes', 'desc');
                    break;
                case 'trending':
                    $query->where('created_at', '>=', now()->subWeek())
                          ->orderBy('likes', 'desc');
                    break;
                default: // relevance
                    $query->orderByRaw("CASE 
                        WHEN name LIKE ? THEN 1
                        WHEN name LIKE ? THEN 2
                        WHEN name LIKE ? THEN 3
                        ELSE 4
                    END", [
                        $searchTerm, // Exact match
                        $searchTerm . '%', // Starts with
                        '%' . $searchTerm . '%', // Contains
                    ]);
            }
        }

        return $query->paginate(12);
    }

    public static function getFeatured()
    {
        try {
            return self::query()
                ->orderBy('likes', 'desc')
                ->where('created_at', '>=', now()->subWeek())
                ->with(['parameters' => function ($q) {
                    $q->select('id', 'animation_id', 'param_ref', 'parameters');
                }])
                ->limit(12)
                ->get();
        } catch (\Exception $e) {
            Log::error('Error fetching featured animations: ' . $e->getMessage());
            throw $e;
        }
    }
}
