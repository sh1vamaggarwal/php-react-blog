<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'featured_image' => $this->featured_image ? url('storage/images/blogs/' . $this->featured_image) : null,
            'author' => [
                'id' => $this->author->id,
                'name' => $this->author->name,
            ],
            'status' => $this->status,
            'published_at' => $this->published_at?->toIso8601String(),
            'views' => $this->views,
            'reading_time' => $this->reading_time,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'comments_count' => $this->whenCounted('comments'),
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
