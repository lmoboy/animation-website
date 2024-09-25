<?php

namespace Database\Seeders;


use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\animations;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        User::factory()->create([
            'name' => 'admin@admin.admin',
            'email' => 'admin@admin.admin',
            'password' => Hash::make('admin@admin.admin'),
            'remember_token' => Str::random(10),
            'email_verified_at' => now(),
        ]);
        User::factory(10)->create();
        animations::factory(10)->create();
    }
}
