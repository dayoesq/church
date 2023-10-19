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
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->string('payment_method')->nullable();
            $table->timestamp('payment_date')->nullable();
            $table->string('notes')->nullable();
            $table->boolean('acknowledge_sent')->default(false);
            $table->boolean('is_anonymous')->default(false);
            $table->boolean('is_refund_requested')->default(false);
            $table->enum('source', ['website', 'mobile_app', 'in_person'])->default('website');
            $table->enum('currency', ['EUR', 'USD', 'GBP', 'JPY', 'CAD'])->default('EUR');
            $table->enum('status', ['pending', 'successful', 'failed'])->nullable();
            $table->enum('refund_status', ['pending', 'processed', 'rejected'])->default('pending');
            $table->ipAddress()->nullable();
            $table->unsignedBigInteger('amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
