<?php

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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('slug')->nullable();
            $table->string('cover_image');
            $table->longText('content');
            $table->foreignId('author')->constrained('users');
            $table->enum('status', [
                PostStatus::Published->value,
                PostStatus::Draft->value,
                PostStatus::Archived->value])->default(PostStatus::Draft->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
