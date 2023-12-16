<?php

namespace App\Http\Requests;

use App\Utils\Enums\EventStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UpsertEventRequest extends FormRequest
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
            'title' => ['sometimes', 'required', 'min:2', 'max:150'],
            'organizer' => ['sometimes', 'required', 'min:2', 'max:150'],
            'description' => ['sometimes', 'required', 'max:500'],
            'fee' => ['sometimes', 'numeric'],
            'location' => ['sometimes', 'required'],
            'status' => ['sometimes', new Enum(EventStatus::class)],
            'starts_at' => ['sometimes', 'date'],
            'ends_at' => ['sometimes', 'date'],
            'images.*' => ['sometimes',
                File::image()
                    // ->min('500kb')
                    ->max('5mb')
                    ->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(500)),
            ],

        ];
    }
}
