<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class animationsFactory extends Factory
{

    


    public function anime(): array
    {
            $anime[] = $this->faker->randomElements([
                'delay' => $this->faker->numberBetween(0, 100),
                'endDelay' => $this->faker->numberBetween(0, 100),
                'direction' => $this->faker->randomElement(['forwards', 'reverse', 'alternate']),
                'duration' => $this->faker->numberBetween(0, 1000),
                'translateX' => $this->faker->numberBetween(0, 100),
                'translateY' => $this->faker->numberBetween(0, 100),
                'easing' => $this->faker->randomElement(['easeInQuad','easeOutQuad','easeInOutQuad','easeOutInQuad','easeInCubic','easeOutCubic','easeInOutCubic','easeOutInCubic','easeInQuart','easeOutQuart','easeInOutQuart','easeOutInQuart','easeInQuint','easeOutQuint','easeInOutQuint','easeOutInQuint','easeInSine','easeOutSine','easeInOutSine','easeOutInSine','easeInExpo','easeOutExpo','easeInOutExpo','easeOutInExpo','easeInCirc','easeOutCirc','easeInOutCirc','easeOutInCirc','easeInBack','easeOutBack','easeInOutBack','easeOutInBack','easeInBounce','easeOutBounce','easeInOutBounce','easeOutInBounce']),
                'loop' => $this->faker->randomElement([
                    true,
                    false,
                    1,
                    2,
                    3,
                ]),
                'rotate' => $this->faker->numberBetween(0, 360),
                'timelineOffset' => $this->faker->numberBetween(0, 1000),
                'speed' => $this->faker->numberBetween(0.1, 10),
                'begin' => $this->faker->randomElement([
                    '+=0',
                    '-=0',
                    '+=100',
                    '-=100',
                ]),
            ], 5);

        return $anime;
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->sentence(),
            'owner_id' => 1,
            'params' => json_encode($this->anime()),
        ];
    }

}
