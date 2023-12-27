<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use App\Utils\Enums\PostStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\File;

class UpsertGalleryRequest extends FormRequest
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
            'title' => ['sometimes', 'required', 'min:4', 'max:100'],
            'description' => ['sometimes', 'required', 'max:200'],
            'status' => ['sometimes', new Enum(PostStatus::class)],
            'images.*' => ['sometimes',
                File::image()
                    ->min('20kb')
                    ->max('1mb')
                    ->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(500)),
            ],
        ];
    }
}
