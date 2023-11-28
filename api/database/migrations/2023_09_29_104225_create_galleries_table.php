<?php

use App\Utils\Enums\GalleryCategories;
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
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('category', [
                GalleryCategories::Adults->value,
                GalleryCategories::Anniversary->value,
                GalleryCategories::Baptism->value,
                GalleryCategories::Birthday->value,
                GalleryCategories::Children->value,
                GalleryCategories::ChildDedication->value,
                GalleryCategories::Revival->value,
                GalleryCategories::SummerCamp->value,
                GalleryCategories::Evangelism->value,
                GalleryCategories::SundaySchool->value,
                GalleryCategories::SpecialEvent->value
            ]);
            $table->longText('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galleries');
    }
};
