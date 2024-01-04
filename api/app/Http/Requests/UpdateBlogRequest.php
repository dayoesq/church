<?php

namespace App\Http\Requests;

use App\Utils\Enums\PostStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\File;

class UpdateBlogRequest extends FormRequest
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
            'title' => ['sometimes', 'string', 'min:4', 'max:60'],
            'content' => ['sometimes'],
            'author' => ['sometimes', 'exists:App\Models\User,id'],
            'status' => ['sometimes', new Enum(PostStatus::class)],
            'cover_image' => ['sometimes',
                File::image()
                    ->min('20kb')
                    ->max('1mb')
                    ->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(500)),
            ],
        ];
    }
}
