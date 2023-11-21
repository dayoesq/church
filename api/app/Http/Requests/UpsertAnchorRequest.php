<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpsertAnchorRequest extends FormRequest
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
            'first_name' => ['sometimes', 'required', 'min:2', 'max:50'],
            'last_name' => ['sometimes', 'required', 'min:2', 'max:50'],
            'email' => ['sometimes', 'required', 'email:rfc,dns', 'unique:anchors'],
            'title' => ['sometimes', 'required', 'max:15'],
        ];
    }
}
