<?php

use App\Models\PaymentMethod;
use App\Models\Project;
use App\Utils\Enums\Currencies;
use App\Utils\Enums\PaymentStatus;
use App\Utils\Enums\RefundStatus;
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
            $table->foreignIdFor(Project::class);
            $table->foreignIdFor(PaymentMethod::class);
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->timestamp('payment_date')->nullable();
            $table->longText('notes')->nullable();
            $table->boolean('acknowledgement_sent')->default(false);
            $table->boolean('anonymous')->default(false);
            $table->boolean('refund_requested')->default(false);
            $table->enum('currency', [
                Currencies::EUR->value,
                Currencies::CAD->value,
                Currencies::GBP->value,
                Currencies::USD->value,
                Currencies::JPY->value
            ])->default(Currencies::EUR->value);
            $table->enum('status', [
                PaymentStatus::Pending->value,
                PaymentStatus::Successful->value,
                PaymentStatus::Failed->value,
            ])->nullable();
            $table->enum('refund_status', [
                RefundStatus::Pending->value,
                RefundStatus::Processed->value,
                RefundStatus::Rejected->value,
            ])->nullable();
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
