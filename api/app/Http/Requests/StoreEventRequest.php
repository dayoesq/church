<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
            'title' => ['required', 'string', 'min:2', 'max:150'],
            'organized_by' => ['required', 'string', 'min:2', 'max:150'],
            'description' => ['required', 'string', 'max:500'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['required', 'date'],

        ];
    }
}
