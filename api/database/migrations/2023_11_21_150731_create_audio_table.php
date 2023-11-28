<?php

use App\Utils\Enums\AudioGenre;
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
        Schema::create('audio', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->string('caption');
            $table->enum('genre', [
                AudioGenre::Sermon->value,
                AudioGenre::Worship->value,
                AudioGenre::Other->value
            ])->nullable();
            $table->string('author')->nullable();
            $table->unsignedBigInteger('audioable_id');
            $table->string('audioable_type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audio');
    }
};
