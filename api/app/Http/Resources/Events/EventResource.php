<?php

namespace App\Http\Resources\Events;

use App\Http\Resources\Images\ImageResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property int $fee
 * @property string $location
 * @property string $status
 * @property string $organizer
 * @property string $starts_at
 * @property string $ends_at
 * @property string $created_at
 * @property string $updated_at
 */
class EventResource extends JsonResource
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
            'description' => $this->description,
            'fee' => $this->fee,
            'location' => $this->location,
            'status' => $this->status,
            'organizer' => $this->organizer,
            'startsAt' => $this->starts_at,
            'endsAt' => $this->ends_at,
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
