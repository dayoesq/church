<?php

namespace App\Http\Resources\Galleries;

use App\Http\Resources\Images\ImageResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $category
 * @property string $description
 * @property string $title
 * @property string $status
 * @property string $created_at
 * @property string $updated_at
 */
class GalleryResource extends JsonResource
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
            'description' => $this->description,
            'title' => $this->title,
            'status' => $this->status,
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
