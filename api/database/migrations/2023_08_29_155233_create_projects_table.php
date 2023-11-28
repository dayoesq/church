<?php

use App\Utils\Enums\ProjectDuration;
use App\Utils\Enums\ProjectStatus;
use App\Utils\Enums\YesOrNo;
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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('description');
            $table->enum('requires_donation', [YesOrNo::Yes->value, YesOrNo::No->value])->default(YesOrNo::No->value);
            $table->enum('duration', [
                ProjectDuration::Continuous->value,
                ProjectDuration::Fixed->value
            ])->default(ProjectDuration::Fixed->value);
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->enum('status', [
                ProjectStatus::OnGoing->value,
                ProjectStatus::Completed->value,
                ProjectStatus::Abandoned->value,
                ProjectStatus::Proposed->value
            ])->default(ProjectStatus::Proposed->value);
            $table->unsignedBigInteger('target_amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
