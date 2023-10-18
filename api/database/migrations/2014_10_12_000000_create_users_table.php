<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('telephone')->nullable();
            $table->enum('gender', ['male', 'female', 'others'])->nullable();
            $table->string('address_one')->nullable();
            $table->string('address_two')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('city')->nullable();
            $table->string('home_country')->nullable();
            $table->string('country_of_residence')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamp('member_since')->nullable();
            $table->string('avatar')->nullable();
            $table->enum('membership', ['member', 'guest'])->default('guest');
            $table->enum('status', ['banned', 'suspended', 'pending', 'active'])->default('pending');
            $table->enum('roles', ['admin', 'super', 'user'])->default('user');
            $table->timestamp('email_verified_at')->nullable();
            $table->foreignId('position_id')->nullable();
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
