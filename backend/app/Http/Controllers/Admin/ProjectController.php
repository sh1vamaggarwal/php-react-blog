<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $projects = $query->ordered()->paginate($request->get('per_page', 15));

        return ProjectResource::collection($projects);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:projects,slug',
            'description' => 'required|string',
            'thumbnail' => 'nullable|image|max:2048',
            'project_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'technologies' => 'nullable|array',
            'featured' => 'boolean',
            'order' => 'integer',
            'status' => 'required|in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except('thumbnail');
        $data['slug'] = $request->slug ?? Str::slug($request->title);

        if ($request->hasFile('thumbnail')) {
            $image = $request->file('thumbnail');
            $filename = time() . '_' . Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $image->getClientOriginalExtension();
            $image->move(storage_path('app/public/images/projects'), $filename);
            $data['thumbnail'] = $filename;
        }

        $project = Project::create($data);

        return new ProjectResource($project);
    }

    public function show($id)
    {
        $project = Project::findOrFail($id);
        return new ProjectResource($project);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:projects,slug,' . $id,
            'description' => 'required|string',
            'thumbnail' => 'nullable|image|max:2048',
            'project_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'technologies' => 'nullable|array',
            'featured' => 'boolean',
            'order' => 'integer',
            'status' => 'required|in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except('thumbnail');

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail) {
                Storage::delete('public/images/projects/' . $project->thumbnail);
            }

            $image = $request->file('thumbnail');
            $filename = time() . '_' . Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $image->getClientOriginalExtension();
            $image->move(storage_path('app/public/images/projects'), $filename);
            $data['thumbnail'] = $filename;
        }

        $project->update($data);

        return new ProjectResource($project);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);

        if ($project->thumbnail) {
            Storage::delete('public/images/projects/' . $project->thumbnail);
        }

        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully'
        ]);
    }
}
