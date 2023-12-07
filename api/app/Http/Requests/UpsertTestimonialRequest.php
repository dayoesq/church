<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rules\Enum;
use App\Utils\Enums\PostStatus;

class UpsertTestimonialRequest extends FormRequest
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
            'title' => ['sometimes', 'required', 'min:3', 'max:6'],
            'first_name' => ['sometimes', 'required', 'min:2', 'max:50'],
            'last_name' => ['sometimes', 'required', 'min:2', 'max:50'],
            'content' => ['sometimes', 'required', 'min:20', 'max:300'],
            'status' => ['sometimes', new Enum(PostStatus::class)],
            'photo' => ['sometimes',
                File::image()
                    ->max('500kb')
            ],
        ];
    }
}
