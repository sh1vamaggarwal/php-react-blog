<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TagResource;
use App\Models\Tag;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::withCount(['publishedBlogs as blogs_count'])
            ->having('blogs_count', '>', 0)
            ->orderBy('name')
            ->get();

        return TagResource::collection($tags);
    }

    public function popular()
    {
        $tags = Tag::withCount(['publishedBlogs as blogs_count'])
            ->having('blogs_count', '>', 0)
            ->orderByDesc('blogs_count')
            ->limit(10)
            ->get();

        return TagResource::collection($tags);
    }
}
