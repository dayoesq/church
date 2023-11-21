<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Utils\Strings\Helper;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => config('auth.seeders.first_name'),
            'last_name' => config('auth.seeders.last_name'),
            'email' => config('auth.seeders.email'),
            'status' => 'active',
            'roles' => config('auth.seeders.roles'),
            'membership' => 'member',
            'email_verified_at' => now(),
            'password' => Helper::hashPassword(config('auth.seeders.password'))

        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    // public function unverified(): static
    // {
    //     return $this->state(fn (array $attributes) => [
    //         'email_verified_at' => null,
    //     ]);
    // }
}
