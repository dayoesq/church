<?php

use App\Models\Position;
use App\Utils\Enums\Gender;
use App\Utils\Enums\Membership;
use App\Utils\Enums\Roles;
use App\Utils\Enums\UserStatus;
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
            $table->enum('gender', [
                Gender::Male->value,
                Gender::Female->value,
                Gender::Others->value
            ])->nullable();
            $table->string('address')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('city')->nullable();
            $table->string('country_of_origin')->nullable();
            $table->string('country_of_residence')->nullable();
            $table->timestamp('member_since')->nullable();
            $table->enum('membership', [
                Membership::Member->value,
                Membership::Guest->value
            ])->default(Membership::Guest->value);
            $table->enum('status', [
                UserStatus::Active->value,
                UserStatus::Banned->value,
                UserStatus::Suspended->value,
                UserStatus::Pending->value,
            ])->default(UserStatus::Pending->value);
            $table->enum('roles', [
                Roles::Admin->value,
                Roles::Super->value,
                Roles::User->value,
            ])->default(Roles::User->value);
            $table->timestamp('email_verified_at')->nullable();
            $table->foreignIdFor(Position::class)->nullable();
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
