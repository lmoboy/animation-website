<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Animations extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'timeline',
        'duration',
        'user_id',
        'views',
        'featured'
    ];

    protected $casts = [
        'timeline' => 'array',
        'featured' => 'boolean',
        'views' => 'integer',
        'duration' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
