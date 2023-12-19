<?php

namespace App\Http\Resources\Podcasts;

use App\Http\Resources\Audios\AudioResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $id
 * @property string $title
 * @property string $summary
 * @property string $status
 * @property string $genre
 * @property string $author
 * @property string $created_at
 * @property string $updated_at
 */
class PodcastResource extends JsonResource
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
            'genre' => $this->genre,
            'summary' => $this->summary,
            'status' => $this->status,
            'author' => $this->author,
            'audios' => AudioResource::collection($this->whenLoaded('audios')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}
