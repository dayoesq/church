<?php

namespace App\Http\Requests;

use App\Utils\Enums\Currencies;
use App\Utils\Enums\DonationRefundStatus;
use App\Utils\Enums\DonationSource;
use App\Utils\Enums\DonationStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateDonationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['optional', 'string', 'min:2', 'max:50'],
            'last_name' => ['optional', 'string', 'min:2', 'max:50'],
            'email' => ['optional', 'email:rfc,dns'],
            'payment_method' => ['optional', 'string'],
            'notes' => ['optional', 'string', 'max:200'],
            'acknowledge_sent' => ['optional', 'boolean'],
            'source' => ['optional', new Enum(DonationSource::class)],
            'currency' => ['optional', new Enum(Currencies::class)],
            'status' => ['optional', new Enum(DonationStatus::class)],
            'ip_address' => ['optional', 'string'],
            'amount' => ['optional', 'int'],
            'payment_date' => ['optional', 'date'],
            'refund_status' => ['optional', new Enum(DonationRefundStatus::class)],
            'is_refund_requested' => ['optional', 'boolean'],
            'is_anonymous' => ['optional', 'boolean'],
        ];
    }

}
