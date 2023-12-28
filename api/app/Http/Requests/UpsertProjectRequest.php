<?php

namespace App\Http\Requests;

use App\Utils\Enums\ProjectStatus;
use App\Utils\Enums\YesOrNo;
use App\Utils\Enums\ProjectDuration;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\File;

/**
 * @method images()
 * @method fill(mixed $data)
 */
class UpsertProjectRequest extends FormRequest
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
            'title' => ['sometimes', 'min:2', 'max:150'],
            'description' => ['sometimes', 'min:20', 'max:1000'],
            'target_amount' => ['sometimes', 'required'],
            'requires_donation' => ['sometimes', new Enum(YesOrNo::class)],
            'duration' => ['sometimes', new Enum(ProjectDuration::class)],
            'status' => ['sometimes', new Enum(ProjectStatus::class)],
            'starts_at' => ['sometimes', 'date'],
            'ends_at' =>['sometimes', 'date'],
            'images.*' => ['sometimes',
                File::image()
                    ->min('20kb')
                    ->max('1mb')
                    ->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(500)),
            ],
        ];
    }
}
