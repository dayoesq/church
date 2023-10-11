<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @method images()
 * @method fill(mixed $data)
 */
class UpsertProjectRequest extends FormRequest
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
            'title' => ['string', 'min:2', 'max:150'],
            'description' => ['string', 'min:20', 'max:500'],
            'target_amount' => ['required'],
            'project' => [
                'sometimes', 'required', 'file', 'mimes:jpeg,png,jpg,svg',
                'max:5000', 'dimensions:min_width=300,min_height=300,max_width=800,max_height=800'
            ]

        ];
    }
}