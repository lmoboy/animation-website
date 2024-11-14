<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\AnimationParameters;

class Animations extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'parameter_id',
        'user_id',
        'views',
        'featured',
        'duration',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'views' => 'integer',
        'duration' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function parameters()
    {
        return $this->belongsTo(AnimationParameters::class, 'parameter_id');
    }
}
