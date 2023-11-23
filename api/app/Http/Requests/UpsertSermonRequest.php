<?php

namespace App\Http\Requests;

use App\Utils\Enums\PostStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\File;

class UpsertSermonRequest extends FormRequest
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
            'title' => ['sometimes', 'string', 'min:4', 'max:100'],
            'status' => ['sometimes', new Enum(PostStatus::class)],
            'summary' => ['sometimes', 'string', 'min:4', 'max:200'],
            'author' => ['sometimes', 'string', 'min:2', 'max:50'],
            'audio.*' => [
                'sometimes',
                File::types(['mp3','wav'])
                    ->max('5mb')
            ],
        ];
    }
}
