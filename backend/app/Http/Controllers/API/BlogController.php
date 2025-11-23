<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::with(['author', 'tags'])
            ->withCount('comments')
            ->published();

        // Search
        if ($request->has('search')) {
            $query->search($request->search);
        }

        // Filter by tags
        if ($request->has('tags')) {
            $tagIds = explode(',', $request->tags);
            $query->withTags($tagIds);
        }

        // Sort
        $sortBy = $request->get('sort_by', 'published_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $blogs = $query->paginate($request->get('per_page', 12));

        return BlogResource::collection($blogs);
    }

    public function show($slug)
    {
        $blog = Blog::with(['author', 'tags', 'approvedComments.replies'])
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment views
        $blog->incrementViews();

        return new BlogResource($blog);
    }

    public function related($slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();

        $relatedBlogs = Blog::with(['author', 'tags'])
            ->published()
            ->where('id', '!=', $blog->id)
            ->whereHas('tags', function ($query) use ($blog) {
                $query->whereIn('tags.id', $blog->tags->pluck('id'));
            })
            ->limit(3)
            ->get();

        return BlogResource::collection($relatedBlogs);
    }
}
