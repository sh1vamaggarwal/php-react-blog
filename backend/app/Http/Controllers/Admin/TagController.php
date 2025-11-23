<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::withCount('blogs')->orderBy('name')->get();
        return TagResource::collection($tags);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:tags,name',
            'slug' => 'nullable|string|unique:tags,slug',
            'color' => 'nullable|string|regex:/^#[0-9A-F]{6}$/i',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $tag = Tag::create($request->all());

        return new TagResource($tag);
    }

    public function update(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:tags,name,' . $id,
            'slug' => 'nullable|string|unique:tags,slug,' . $id,
            'color' => 'nullable|string|regex:/^#[0-9A-F]{6}$/i',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $tag->update($request->all());

        return new TagResource($tag);
    }

    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();

        return response()->json([
            'message' => 'Tag deleted successfully'
        ]);
    }
}
