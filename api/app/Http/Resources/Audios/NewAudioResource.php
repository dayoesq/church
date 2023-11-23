<?php

namespace App\Http\Resources\Audios;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $caption
 * @property string $genre
 * @property string $author
 * @property string $created_at
 * @property string $updated_at
 * @property string $url
 */
class NewAudioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'caption' => $this->caption,
            'url' => $this->url,
            'genre' => $this->genre,
            'author' => $this->author,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}
