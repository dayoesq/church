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
            $table->foreignId('project_id')->constrained('projects');
            $table->foreignId('payment_method')->constrained('payment_methods');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->timestamp('payment_date')->nullable();
            $table->longText('notes')->nullable();
            $table->boolean('acknowledgement_sent')->default(false);
            $table->boolean('anonymous')->default(false);
            $table->boolean('refund_requested')->default(false);
            $table->enum('currency', ['EUR', 'USD', 'GBP', 'JPY', 'CAD'])->default('EUR');
            $table->enum('status', ['pending', 'successful', 'failed'])->nullable();
            $table->enum('refund_status', ['pending', 'processed', 'rejected'])->default('pending');
            $table->ipAddress();
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
