<?php

use App\Utils\Enums\AudioGenre;
use App\Utils\Enums\PostStatus;
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
        Schema::create('podcasts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('summary')->nullable();
            $table->enum('genre', [
                AudioGenre::Sermon->value,
                AudioGenre::Worship->value,
                AudioGenre::Praise->value,
                AudioGenre::PraiseWorship->value,
                AudioGenre::Message->value
            ])->nullable();
            $table->enum('status', [
                PostStatus::Published->value,
                PostStatus::Draft->value,
                PostStatus::Archived->value,
            ])->default(PostStatus::Draft->value);
            $table->string('author');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('podcasts');
    }
};
