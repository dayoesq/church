<?php

namespace App\Http\Requests;

use App\Utils\Enums\AudioGenre;
use App\Utils\Enums\PostStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\File;

class UpsertPodcastRequest extends FormRequest
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
            'title' => ['sometimes', 'min:4', 'max:100'],
            'status' => ['sometimes', new Enum(PostStatus::class)],
            'genre' => ['sometimes', new Enum(AudioGenre::class)],
            'summary' => ['sometimes', 'min:4', 'max:200'],
            'author' => ['sometimes', 'min:2', 'max:50'],
            'audios.*' => [
                'sometimes',
                File::types(['mp3', 'wav', 'ogg', 'm4a', 'flac'])
                    ->max('5mb')
            ],
        ];
    }
}
