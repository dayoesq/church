<?php

namespace App\Http\Requests;

use App\Utils\Enums\ProjectStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

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
            'title' => ['string', 'min:2', 'max:150'],
            'description' => ['string', 'min:20', 'max:500'],
            'target_amount' => ['required'],
            'status' => ['nullable', new Enum(ProjectStatus::class)],
            'start_date' => ['nullable', 'date'],
            'end_date' =>['nullable', 'date']
        ];
    }
}
