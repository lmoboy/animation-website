<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AnimationParametersFactory extends Factory
{

    public function correctFaker($type)
    {
        $final = null;
        switch ($type) {
            case 'delay':
                $final = $this->faker->numberBetween(0, 100);
                break;

            case 'endDelay':
                $final = $this->faker->numberBetween(0, 100);
                break;

            case 'direction':
                $final = $this->faker->randomElement(['forwards', 'reverse', 'alternate']);
                break;

            case 'duration':
                $final = $this->faker->numberBetween(500, 3000);
                break;

            case 'translateX':
                $final = $this->faker->numberBetween(0, 100);
                break;

            case 'translateY':
                $final = $this->faker->numberBetween(0, 100);
                break;

            case 'easing':
                $final = $this->faker->randomElement([
                    'easeInQuad',
                    'easeInCubic',
                    'easeInQuart',
                    'easeInQuint',
                    'easeInSine',
                    'easeInExpo',
                    'easeInCirc',
                    'easeInBack',
                    'easeOutQuad',
                    'easeOutCubic',
                    'easeOutQuart',
                    'easeOutQuint',
                    'easeOutSine',
                    'easeOutExpo',
                    'easeOutCirc',
                    'easeOutBack',
                    'easeInBounce',
                    'easeInOutQuad',
                    'easeInOutCubic',
                    'easeInOutQuart',
                    'easeInOutQuint',
                    'easeInOutSine',
                    'easeInOutExpo',
                    'easeInOutCirc',
                    'easeInOutBack',
                    'easeInOutBounce',
                    'easeOutBounce',
                    'easeOutInQuad',
                    'easeOutInCubic',
                    'easeOutInQuart',
                    'easeOutInQuint',
                    'easeOutInSine',
                    'easeOutInExpo',
                    'easeOutInCirc',
                    'easeOutInBack',
                    'easeOutInBounce',
                ]);
                break;

            case 'loop':
                $final = $this->faker->randomElement([
                    true,
                ]);
                break;

            case 'rotate':
                $final = $this->faker->numberBetween(0, 360);
                break;

            case 'timelineOffset':
                $final = $this->faker->numberBetween(0, 100);
                break;

            case 'speed':
                $final = $this->faker->numberBetween(0, 100);
                break;

            case 'begin':
                $final = $this->faker->randomElement([
                    '+=0',
                    '-=0',
                    '+=100',
                    '-=100',
                ]);
                break;

            default:
                $final = $this->faker->numberBetween(0, 1);
                break;
        }
        return $final;
    }
    public function anime()
    {
        $params = [
            'direction',
            'duration',
            'translateX',
            'translateY',
            'easing',
            'loop',
            'rotate'
        ];

        $return = [];
        foreach ($params as $param) {
            $return[$param] = $this->correctFaker($param);
        }

        return $return;

    }


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return $this->anime();
    }
}

