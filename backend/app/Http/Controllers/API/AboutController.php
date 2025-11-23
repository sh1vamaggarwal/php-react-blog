<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AboutMe;

class AboutController extends Controller
{
    public function index()
    {
        $about = AboutMe::first();

        if (!$about) {
            return response()->json([
                'message' => 'About me content not found'
            ], 404);
        }

        return response()->json([
            'id' => $about->id,
            'title' => $about->title,
            'content' => $about->content,
            'profile_image' => $about->profile_image ? url('storage/images/about/' . $about->profile_image) : null,
            'resume_url' => $about->resume_url,
            'social_links' => $about->social_links,
            'skills' => $about->skills,
        ]);
    }
}
