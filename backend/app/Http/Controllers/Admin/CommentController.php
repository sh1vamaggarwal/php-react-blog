<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Request $request)
    {
        $query = Comment::with(['blog']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $comments = $query->latest()->paginate($request->get('per_page', 20));

        return CommentResource::collection($comments);
    }

    public function updateStatus(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        $request->validate([
            'status' => 'required|in:pending,approved,spam',
        ]);

        $comment->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Comment status updated successfully',
            'comment' => new CommentResource($comment)
        ]);
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted successfully'
        ]);
    }
}
