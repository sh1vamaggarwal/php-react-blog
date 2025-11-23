<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::published()
            ->ordered()
            ->get();

        return ProjectResource::collection($projects);
    }

    public function show($slug)
    {
        $project = Project::published()
            ->where('slug', $slug)
            ->firstOrFail();

        return new ProjectResource($project);
    }

    public function featured()
    {
        $projects = Project::published()
            ->featured()
            ->ordered()
            ->limit(6)
            ->get();

        return ProjectResource::collection($projects);
    }
}
