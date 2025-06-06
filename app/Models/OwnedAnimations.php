<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OwnedAnimations extends Model
{
    protected $fillable = [
        'user_id',
        'animation_id'
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function animation()
    {
        return $this->belongsTo('App\Models\Animation');
    }
}
