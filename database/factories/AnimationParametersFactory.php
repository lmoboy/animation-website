<?php

namespace Database\Factories;

use App\Models\AnimationParameters;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnimationParametersFactory extends Factory
{
    protected $model = AnimationParameters::class;

    public function definition()
    {
        $easings = ['linear', 'easeInOutQuad', 'easeInOutCubic', 'easeInOutExpo'];
        $directions = ['normal', 'reverse', 'alternate'];

        return [
            'targets' => ['.anime-' . fake()->word()],
            'duration' => fake()->numberBetween(500, 3000),
            'delay' => fake()->numberBetween(0, 1000),
            'endDelay' => fake()->numberBetween(0, 500),
            'easing' => fake()->randomElement($easings),
            'direction' => fake()->randomElement($directions),
            'loop' => fake()->boolean(20),
            'autoplay' => fake()->boolean(80),
            'translateX' => [fake()->numberBetween(-100, 100), 0],
            'translateY' => [fake()->numberBetween(-100, 100), 0],
            'translateZ' => null,
            'rotate' => [fake()->numberBetween(0, 360)],
            'rotateX' => null,
            'rotateY' => null,
            'rotateZ' => null,
            'scale' => [fake()->randomFloat(2, 0.5, 2)],
            'scaleX' => null,
            'scaleY' => null,
            'scaleZ' => null,
            'opacity' => [0, 1],
            'backgroundColor' => null,
            'borderRadius' => [fake()->numberBetween(0, 20) . 'px'],
            'width' => null,
            'height' => null,
            'elasticity' => fake()->numberBetween(300, 800),
            'round' => fake()->boolean(10),
            'keyframes' => null,
        ];
    }

    public function fadeIn()
    {
        return $this->state(function (array $attributes) {
            return [
                'opacity' => [0, 1],
                'duration' => 1000,
                'easing' => 'easeOutCubic'
            ];
        });
    }

    public function slideIn()
    {
        return $this->state(function (array $attributes) {
            return [
                'translateX' => [-100, 0],
                'opacity' => [0, 1],
                'duration' => 800,
                'easing' => 'easeOutExpo'
            ];
        });
    }

    public function pulse()
    {
        return $this->state(function (array $attributes) {
            return [
                'scale' => [1, 1.1, 1],
                'duration' => 1500,
                'loop' => true,
                'direction' => 'alternate',
                'easing' => 'easeInOutQuad'
            ];
        });
    }
}
