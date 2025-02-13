<?php

namespace Database\Factories;

use App\Models\Animations;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnimationsFactory extends Factory
{
    protected $model = Animations::class;

    public function definition()
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(),
            'timeline' => $this->createTimeline(),
            'price' => $this->faker->randomFloat(2, 0, 100),
            'user_id' => User::factory(),
            'views' => $this->faker->numberBetween(0, 10000),
            'featured' => $this->faker->boolean(10),
            'duration' => $this->faker->numberBetween(5, 300),
        ];
    }

    protected function createTimeline()
    {
        return array_map(
            [$this, 'createAnimationStep'],
            range(1, $this->faker->numberBetween(1, 3))
        );
    }

    protected function createAnimationStep()
    {
        $properties = $this->animationProperties();

        return $this->filterNulls([
            'targets' => $this->getTargets(),
            'duration' => $this->faker->numberBetween(500, 3000),
            'delay' => $this->faker->optional(0.7)->numberBetween(0, 1000),
            'endDelay' => $this->faker->optional(0.5)->numberBetween(0, 500),
            'easing' => $this->faker->randomElement($this->easingFunctions()),
            'loop' => $this->faker->randomElement([1, 2, 3, true, false]),
            'direction' => $this->faker->randomElement([
                'normal',
                'reverse',
                'alternate',
                'alternateReverse'
            ]),
            'elasticity' => $this->faker->optional(0.4)->numberBetween(0, 1000),
            'round' => $this->faker->boolean(30),
            'autoplay' => $this->faker->boolean(90),
            'stagger' => $this->getStaggerConfig(),
            'keyframes' => $this->getKeyframes(),
            'begin' => $this->faker->optional(0.1)->passthrough(
                'function(anim) { console.log("Animation started", anim); }'
            ),
            'update' => $this->faker->optional(0.1)->passthrough(
                'function(anim) { console.log("Progress:", anim.progress + "%"); }'
            ),
            'complete' => $this->faker->optional(0.1)->passthrough(
                'function(anim) { console.log("Animation completed", anim); }'
            ),
            'css' => $this->faker->boolean(80), // Only for CSS transforms
            'properties' => $this->filterNulls(
                collect($this->faker->randomElements(
                    array_keys($properties),
                    $this->faker->numberBetween(2, 5)
                ))->mapWithKeys(function ($p) use ($properties) {
                    return [$p => $properties[$p]()];
                })->toArray()
            )
        ]);
    }

    protected function animationProperties()
    {
        return [
            // CSS Transforms
            'translateX' => fn() => $this->faker->randomElement([
                $this->faker->numberBetween(-200, 200) . 'px',
                $this->faker->numberBetween(-100, 100) . '%',
                '+=' . $this->faker->numberBetween(50, 200) . 'px'
            ]),
            'rotate' => fn() => $this->faker->randomElement([
                $this->faker->numberBetween(-360, 360) . 'deg',
                $this->faker->numberBetween(1, 4) . 'turn'
            ]),
            'scale' => fn() => $this->faker->randomFloat(1, 0.2, 3),

            // CSS Properties
            'opacity' => fn() => $this->faker->randomFloat(1, 0, 1),
            'backgroundColor' => fn() => $this->faker->hexColor(),
            'width' => fn() => $this->faker->randomElement([
                $this->faker->numberBetween(50, 300) . 'px',
                $this->faker->numberBetween(10, 100) . '%'
            ]),

            // SVG Attributes
            'points' => fn() => implode(' ', array_map(
                fn() =>
                $this->faker->numberBetween(0, 300) . ',' .
                $this->faker->numberBetween(0, 300),
                range(1, 3)
            )),
            'd' => fn() => "M" . $this->faker->numberBetween(0, 100) . " " .
                $this->faker->numberBetween(0, 100) . "L" .
                $this->faker->numberBetween(100, 200) . " " .
                $this->faker->numberBetween(100, 200),

            // DOM Attributes
            'value' => fn() => $this->faker->numberBetween(0, 100),

            // Transform Origins
            'transformOrigin' => fn() => $this->faker->randomElement([
                'center center',
                $this->faker->numberBetween(0, 100) . '% ' . $this->faker->numberBetween(0, 100) . '%'
            ])
        ];
    }

    protected function easingFunctions()
    {
        return [
            'linear',
            'easeInQuad',
            'easeOutQuad',
            'easeInOutQuad',
            'easeInCubic',
            'easeOutCubic',
            'easeInOutCubic',
            'easeInQuart',
            'easeOutQuart',
            'easeInOutQuart',
            'easeInQuint',
            'easeOutQuint',
            'easeInOutQuint',
            'easeInSine',
            'easeOutSine',
            'easeInOutSine',
            'easeInExpo',
            'easeOutExpo',
            'easeInOutExpo',
            'easeInCirc',
            'easeOutCirc',
            'easeInOutCirc',
            'easeInBack',
            'easeOutBack',
            'easeInOutBack',
            'easeInElastic',
            'easeOutElastic',
            'easeInOutElastic',
            'easeInBounce',
            'easeOutBounce',
            'easeInOutBounce',
            'steps(' . rand(2, 10) . ')',
            'cubicBezier(' . (rand(0, 10) / 10) . ',' . (rand(0, 10) / 10) . ',' . (rand(0, 10) / 10) . ',' . (rand(0, 10) / 10) . ')'
        ];
    }

    protected function getStaggerConfig()
    {
        return $this->faker->optional(0.3)->passthrough(
            $this->faker->randomElement([
                $this->faker->numberBetween(50, 200),
                [
                    'each' => $this->faker->numberBetween(50, 200),
                    'from' => $this->faker->randomElement(['center', 'first', 'last', 'rand']),
                    'grid' => [$this->faker->numberBetween(1, 5), $this->faker->numberBetween(1, 5)],
                    'axis' => $this->faker->randomElement(['x', 'y'])
                ]
            ])
        );
    }

    protected function getKeyframes()
    {
        return $this->faker->optional(0.2)->passthrough([
            array_filter([
                'duration' => $this->faker->numberBetween(200, 1000),
                'easing' => $this->faker->randomElement($this->easingFunctions()),
                'opacity' => $this->faker->randomFloat(1, 0, 1),
                'scale' => $this->faker->randomFloat(1, 0.5, 1.5)
            ]),
            array_filter([
                'duration' => $this->faker->numberBetween(200, 1000),
                'easing' => $this->faker->randomElement($this->easingFunctions()),
                'translateY' => $this->faker->numberBetween(-100, 100) . 'px',
                'rotate' => $this->faker->numberBetween(-180, 180) . 'deg'
            ])
        ]);
    }

    protected function getTargets()
    {
        return $this->faker->randomElement([
            '#anim_cube'
        ]);
    }

    protected function filterNulls(array $data)
    {
        return collect($data)
            ->reject(fn($value) => is_null($value))
            ->map(fn($value) => is_array($value) ? $this->filterNulls($value) : $value)
            ->toArray();
    }

    public function featured()
    {
        return $this->state(function () {
            return [
                'featured' => true,
                'views' => $this->faker->numberBetween(1000, 50000),
                'timeline' => array_map(fn($step) => array_merge($step, [
                    'stagger' => 100,
                    'elasticity' => 800,
                    'easing' => 'easeOutElastic'
                ]), $this->createTimeline())
            ];
        });
    }

    public function trending()
    {
        return $this->state(function () {
            return [
                'views' => $this->faker->numberBetween(5000, 100000),
                'duration' => $this->faker->numberBetween(10, 60),
                'timeline' => array_map(fn($step) => array_merge($step, [
                    'loop' => true,
                    'direction' => 'alternate',
                    'stagger' => function () {
                        return anime . random(50, 150); }
                ]), $this->createTimeline())
            ];
        });
    }
}