<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
            $this->app['request']->server->set('HTTPS', 'on');
            
            if ($host = config('app.asset_url')) {
                Vite::useScriptTagAttributes([
                    'crossorigin' => 'anonymous'
                ]);
                
                Vite::useBuildDirectory('build');
            }
        }
    }
}
