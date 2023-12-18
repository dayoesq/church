<?php

use App\Utils\Enums\EventStatus;
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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->unsignedInteger('fee')->nullable();
            $table->string('location')->nullable();
            $table->enum('status', [
                EventStatus::Ongoing->value,
                EventStatus::Upcoming->value,
                EventStatus::Concluded->value,
                EventStatus::Cancelled->value,
                EventStatus::Postponed->value,
                ])->default(EventStatus::Upcoming->value);
            $table->string('organizer');
            $table->timestamp('starts_at');
            $table->timestamp('ends_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
