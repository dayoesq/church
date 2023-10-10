<?php

namespace App\Http\Requests;

use App\Utils\Enums\Events;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

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
            'type' => [new Enum(Events::class)],
            'organised_by' => ['required', 'string', 'min:2', 'max:150'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['required', 'date']
        ];
    }
}
