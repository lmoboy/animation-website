<?php

namespace Database\Factories;

use App\Models\Animations;
use App\Models\AnimationParameters;
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
            'parameter_id' => AnimationParameters::factory(),
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

    public function withFadeInAnimation()
    {
        return $this->state(function (array $attributes) {
            return [
                'parameter_id' => AnimationParameters::factory()->fadeIn(),
            ];
        });
    }

    public function withSlideInAnimation()
    {
        return $this->state(function (array $attributes) {
            return [
                'parameter_id' => AnimationParameters::factory()->slideIn(),
            ];
        });
    }

    public function withPulseAnimation()
    {
        return $this->state(function (array $attributes) {
            return [
                'parameter_id' => AnimationParameters::factory()->pulse(),
            ];
        });
    }
}
