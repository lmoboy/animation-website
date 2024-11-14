<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimationParameters extends Model
{
    use HasFactory;

    protected $fillable = [
        'targets',
        'duration',
        'delay',
        'endDelay',
        'easing',
        'direction',
        'loop',
        'autoplay',
        'translateX',
        'translateY',
        'translateZ',
        'rotate',
        'rotateX',
        'rotateY',
        'rotateZ',
        'scale',
        'scaleX',
        'scaleY',
        'scaleZ',
        'opacity',
        'backgroundColor',
        'borderRadius',
        'width',
        'height',
        'elasticity',
        'round',
        'keyframes',
    ];

    protected $casts = [
        'targets' => 'array',
        'translateX' => 'array',
        'translateY' => 'array',
        'translateZ' => 'array',
        'rotate' => 'array',
        'rotateX' => 'array',
        'rotateY' => 'array',
        'rotateZ' => 'array',
        'scale' => 'array',
        'scaleX' => 'array',
        'scaleY' => 'array',
        'scaleZ' => 'array',
        'opacity' => 'array',
        'backgroundColor' => 'array',
        'borderRadius' => 'array',
        'width' => 'array',
        'height' => 'array',
        'keyframes' => 'array',
        'loop' => 'boolean',
        'autoplay' => 'boolean',
        'round' => 'boolean',
    ];

    public function animations()
    {
        return $this->hasMany(Animations::class, 'parameter_id');
    }
}
