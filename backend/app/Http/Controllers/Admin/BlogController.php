<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::with(['author', 'tags'])->withCount('comments');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $query->search($request->search);
        }

        $blogs = $query->latest()->paginate($request->get('per_page', 15));

        return BlogResource::collection($blogs);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:blogs,slug',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except(['featured_image', 'tags']);
        $data['author_id'] = $request->user()->id;
        $data['slug'] = $request->slug ?? Str::slug($request->title);

        if ($request->hasFile('featured_image')) {
            $image = $request->file('featured_image');
            $filename = time() . '_' . Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $image->getClientOriginalExtension();
            $image->move(storage_path('app/public/images/blogs'), $filename);
            $data['featured_image'] = $filename;
        }

        if ($data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $blog = Blog::create($data);

        if ($request->has('tags')) {
            $blog->tags()->sync($request->tags);
        }

        return new BlogResource($blog->load('tags', 'author'));
    }

    public function show($id)
    {
        $blog = Blog::with(['author', 'tags'])->withCount('comments')->findOrFail($id);
        return new BlogResource($blog);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:blogs,slug,' . $id,
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except(['featured_image', 'tags']);

        if ($request->hasFile('featured_image')) {
            // Delete old image
            if ($blog->featured_image) {
                Storage::delete('public/images/blogs/' . $blog->featured_image);
            }

            $image = $request->file('featured_image');
            $filename = time() . '_' . Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $image->getClientOriginalExtension();
            $image->move(storage_path('app/public/images/blogs'), $filename);
            $data['featured_image'] = $filename;
        }

        if ($data['status'] === 'published' && empty($blog->published_at) && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $blog->update($data);

        if ($request->has('tags')) {
            $blog->tags()->sync($request->tags);
        }

        return new BlogResource($blog->load('tags', 'author'));
    }

    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);

        if ($blog->featured_image) {
            Storage::delete('public/images/blogs/' . $blog->featured_image);
        }

        $blog->delete();

        return response()->json([
            'message' => 'Blog deleted successfully'
        ]);
    }
}
