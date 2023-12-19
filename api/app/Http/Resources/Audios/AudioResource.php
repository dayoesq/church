<?php

namespace App\Http\Resources\Audios;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $url
 * @property string $created_at
 * @property string $updated_at
 */
class AudioResource extends JsonResource
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
            'url' => $this->url,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}
