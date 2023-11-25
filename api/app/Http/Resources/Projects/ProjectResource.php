<?php

namespace App\Http\Resources\Projects;

use App\Http\Resources\Images\ImageResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $starts_at
 * @property string $ends_at
 * @property string $status
 * @property mixed $target_amount
 * @property string $created_at
 * @property string $updated_at
 * @property string $requires_donation
 * @property string $duration
 */
class ProjectResource extends JsonResource
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
            'requiresDonation' => $this->requires_donation,
            'duration' => $this->duration,
            'startsAt' => $this->starts_at,
            'endsAt' => $this->ends_at,
            'status' => $this->status,
            'targetAmount' => $this->target_amount,
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
