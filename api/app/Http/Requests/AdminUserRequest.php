<?php

namespace App\Http\Requests;

use App\Utils\Enums\Countries;
use App\Utils\Enums\Gender;
use App\Utils\Enums\Roles;
use App\Utils\Enums\UserStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

/**
 * @property mixed $client_current_time
 */
class AdminUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
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
            'last_name' => ['sometimes', 'min:2', 'max:50'],
            'email' => ['sometimes', 'email:rfc,dns', 'unique:users'],
            'gender' => ['sometimes', new Enum(Gender::class)],
            'country_of_residence' => ['sometimes', new Enum(Countries::class)],
            'country_of_origin' => ['sometimes', new Enum(Countries::class)],
            'postal_code' => ['sometimes', 'max:20'],
            'city' => ['sometimes', 'max:20'],
            'telephone' => ['sometimes', 'max:20'],
            'address' => ['sometimes', 'max:255'],
            'member_since' => ['sometimes', 'date'],
            'status' => ['sometimes', new Enum(UserStatus::class)],
            'roles' => ['sometimes', new Enum(Roles::class)],
            'position_id' => ['sometimes', 'exists:App\Models\Position,id'],

        ];
    }
}
