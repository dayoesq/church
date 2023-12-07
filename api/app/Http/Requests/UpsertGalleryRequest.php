<?php

namespace App\Http\Requests;

use App\Utils\Enums\GalleryCategories;
use Illuminate\Contracts\Validation\ValidationRule;
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
            'category' => ['sometimes', 'required', new Enum(GalleryCategories::class)],
            'photo.*' => ['sometimes',
                File::image()
                    ->min('500kb')
                    ->max('5mb')
                    ->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(500)),
            ],
        ];
    }
}
