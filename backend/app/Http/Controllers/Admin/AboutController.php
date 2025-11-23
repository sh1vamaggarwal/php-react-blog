<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutMe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AboutController extends Controller
{
    public function show()
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

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'profile_image' => 'nullable|image|max:2048',
            'resume_url' => 'nullable|url',
            'social_links' => 'nullable|array',
            'skills' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $about = AboutMe::first();

        if (!$about) {
            $about = new AboutMe();
        }

        $data = $request->except('profile_image');

        if ($request->hasFile('profile_image')) {
            if ($about->profile_image) {
                Storage::delete('public/images/about/' . $about->profile_image);
            }

            $image = $request->file('profile_image');
            $filename = time() . '_' . Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $image->getClientOriginalExtension();
            $image->move(storage_path('app/public/images/about'), $filename);
            $data['profile_image'] = $filename;
        }

        if ($about->exists) {
            $about->update($data);
        } else {
            $about->fill($data);
            $about->save();
        }

        return response()->json([
            'message' => 'About me updated successfully',
            'data' => [
                'id' => $about->id,
                'title' => $about->title,
                'content' => $about->content,
                'profile_image' => $about->profile_image ? url('storage/images/about/' . $about->profile_image) : null,
                'resume_url' => $about->resume_url,
                'social_links' => $about->social_links,
                'skills' => $about->skills,
            ]
        ]);
    }
}
