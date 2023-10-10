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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->enum('type', [
                'daily',
                'weekly',
                'monthly',
                'quarterly',
                'annually',
                'bi_weekly',
                'bi_monthly',
                'bi_annual',
                'miscellaneous'
                ]
            );
            $table->unsignedBigInteger('created_by');
            $table->string('organised_by');
            $table->foreign('created_by')->references('id')->on('users');
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
