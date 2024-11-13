<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Animation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category',
        'complexity',
        'likes',
        'user_id',
    ];

    protected $casts = [
        'likes' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function parameters(): HasMany
    {
        return $this->hasMany(AnimationParameters::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
