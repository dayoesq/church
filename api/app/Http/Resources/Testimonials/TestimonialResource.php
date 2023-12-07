<?php

namespace App\Http\Resources\Testimonials;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $title
 * @property string $last_name
 * @property string $last_name
 * @property string $content
 * @property string $avatar
 * @property string $status
 * @property mixed $created_at
 * @property mixed $updated_at
 */
class TestimonialResource extends JsonResource
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
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'fullName' => $this->first_name . ' ' . $this->last_name,
            'content' => $this->content,
            'avatar' => $this->avatar,
            'status' => $this->status,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
