<?php

namespace Database\Factories;

use App\Models\Animations;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AnimationsFactory extends Factory
{
    protected $model = Animations::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'timeline' => [
                [
                    'type' => fake()->randomElement(['fade', 'slide', 'rotate', 'scale']),
                    'duration' => fake()->numberBetween(500, 2000),
                    'delay' => fake()->numberBetween(0, 500),
                    'endDelay' => fake()->numberBetween(0, 500),
                    'loop' => fake()->numberBetween(1, 3),
                    'direction' => fake()->randomElement(['normal', 'reverse', 'alternate']),
                    'easing' => fake()->randomElement(['linear', 'ease-in', 'ease-out', 'ease-in-out']),
                ]
            ],
            'price' => fake()->randomFloat(2, 0, 100),
            'user_id' => User::factory(),
            'views' => fake()->numberBetween(0, 10000),
            'featured' => fake()->boolean(10),
            'duration' => fake()->numberBetween(5, 300),
        ];
    }

    public function featured()
    {
        return $this->state(function (array $attributes) {
            return [
                'featured' => true,
                'views' => fake()->numberBetween(1000, 50000),
            ];
        });
    }

    public function trending()
    {
        return $this->state(function (array $attributes) {
            return [
                'views' => fake()->numberBetween(5000, 100000),
                'duration' => fake()->numberBetween(10, 60),
            ];
        });
    }
}
