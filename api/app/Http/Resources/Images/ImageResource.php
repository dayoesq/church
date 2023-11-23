<?php

namespace App\Http\Resources\Images;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $url
 * @property int $imageable_id
 * @property mixed $imageable_type
 */
class ImageResource extends JsonResource
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
            'imageRelationshipId' => $this->imageable_id,
            'imageRelationshipType' => $this->imageable_type,
        ];
    }
}
