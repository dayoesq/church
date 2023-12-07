<?php

namespace App\Http\Requests;

use App\Utils\Enums\ProjectStatus;
use App\Utils\Enums\YesOrNo;
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
            'description' => ['sometimes', 'min:20', 'max:500'],
            'target_amount' => ['sometimes', 'required'],
            'donation_required' => ['sometimes', new Enum(YesOrNo::class)],
            'continuous' => ['sometimes', 'boolean'],
            'acknowledgement_sent' => ['sometimes', 'boolean'],
            'status' => ['sometimes', new Enum(ProjectStatus::class)],
            'starts_at' => ['sometimes', 'date'],
            'ends_at' =>['sometimes', 'date'],
            'photo.*' => ['sometimes',
                File::image()
                    ->min('500kb')
                    ->max('5mb')
                    ->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(500)),
            ],
        ];
    }
}
