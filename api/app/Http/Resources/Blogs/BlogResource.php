<?php

namespace App\Http\Resources\Blogs;

use App\Http\Resources\Comments\CommentResource;
use App\Http\Resources\Users\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $content
 * @property string $status
 * @property mixed $author
 * @property mixed $comments
 * @property string $created_at
 * @property string $updated_at
 */
class BlogResource extends JsonResource
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
            'content' => $this->content,
            'status' => $this->status,
            'author' => new UserResource($this->whenLoaded('author')),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,

        ];
    }
}
