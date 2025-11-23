<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function index($blogSlug)
    {
        $blog = Blog::where('slug', $blogSlug)->firstOrFail();

        $comments = Comment::with('replies')
            ->where('blog_id', $blog->id)
            ->approved()
            ->topLevel()
            ->orderByDesc('created_at')
            ->get();

        return CommentResource::collection($comments);
    }

    public function store(Request $request, $blogSlug)
    {
        $blog = Blog::where('slug', $blogSlug)->published()->firstOrFail();

        $validator = Validator::make($request->all(), [
            'author_name' => 'required|string|max:255',
            'author_email' => 'required|email|max:255',
            'content' => 'required|string|max:2000',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $comment = Comment::create([
            'blog_id' => $blog->id,
            'author_name' => $request->author_name,
            'author_email' => $request->author_email,
            'content' => $request->content,
            'parent_id' => $request->parent_id,
            'status' => 'pending', // Requires admin approval
        ]);

        return response()->json([
            'message' => 'Your comment has been submitted and is awaiting approval.',
            'comment' => new CommentResource($comment)
        ], 201);
    }
}
