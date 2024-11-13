<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimationParameters extends Model
{
    use HasFactory;

    protected $fillable = [
        'direction',
        'duration',
        'translateX',
        'translateY',
        'easing',
        'loop',
        'rotate',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function animation()
    {
        return $this->belongsTo(Animations::class, 'id', 'param_ref');
    }

    public function toAnimeJs()
    {
        return json_encode([
            'direction' => $this->direction,
            'duration' => $this->duration,
            'translateX' => $this->translateX,
            'translateY' => $this->translateY,
            'easing' => $this->easing,
            'loop' => $this->loop,
            'rotate' => $this->rotate,
        ]);
    }
}
