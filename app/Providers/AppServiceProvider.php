<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Log;

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

            // Log configuration for debugging
            Log::debug('App URL: ' . config('app.url'));
            Log::debug('Asset URL: ' . config('app.asset_url'));
            
            if ($host = config('app.asset_url')) {
                Log::debug('Setting up Vite with host: ' . $host);
                
                Vite::useScriptTagAttributes([
                    'crossorigin' => 'anonymous'
                ]);
                
                Vite::useBuildDirectory('build');
            }
        }
    }
}
