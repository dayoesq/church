<?php

namespace App\Http\Resources\Events;

use App\Http\Resources\Coordinators\CoordinatorResource;
use App\Http\Resources\Images\ImageResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $slug
 * @property string $fee
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
            'slug' => $this->slug,
            'fee' => $this->fee,
            'location' => $this->location,
            'status' => $this->status,
            'organizer' => $this->organizer,
            'startsAt' => $this->starts_at,
            'endsAt' => $this->ends_at,
            'coordinators' => new CoordinatorResource($this->whenLoaded('coordinators')),
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
