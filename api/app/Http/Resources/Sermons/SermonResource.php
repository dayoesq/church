<?php

namespace App\Http\Resources\Sermons;

use App\Http\Resources\Audios\AudioResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $id
 * @property string $title
 * @property string $slug
 * @property string $summary
 * @property string $status
 * @property string $author
 * @property string $created_at
 * @property string $updated_at
 */
class SermonResource extends JsonResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            'summary' => $this->summary,
            'status' => $this->status,
            'author' => $this->author,
            'audios' => AudioResource::collection($this->whenLoaded('audios')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}
