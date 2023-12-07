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
            'first_name' => ['sometimes', 'min:2', 'max:50'],
            'last_name' => ['nullable', 'string', 'min:2', 'max:50'],
            'email' => ['nullable', 'email:rfc,dns'],
            'payment_method' => ['nullable', 'string'],
            'notes' => ['nullable', 'string', 'max:200'],
            'acknowledge_sent' => ['nullable', 'boolean'],
            'source' => ['nullable', new Enum(DonationSource::class)],
            'currency' => ['nullable', new Enum(Currencies::class)],
            'status' => ['nullable', new Enum(DonationStatus::class)],
            'ip_address' => ['nullable', 'string'],
            'amount' => ['nullable', 'int'],
            'payment_date' => ['nullable', 'date'],
            'refund_status' => ['nullable', new Enum(DonationRefundStatus::class)],
            'is_refund_requested' => ['nullable', 'boolean'],
            'is_anonymous' => ['nullable', 'boolean'],
        ];
    }

}
