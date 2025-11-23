<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Comment;
use App\Models\ContactMessage;
use App\Models\NewsletterSubscriber;
use App\Models\Project;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'blogs' => [
                'total' => Blog::count(),
                'published' => Blog::where('status', 'published')->count(),
                'draft' => Blog::where('status', 'draft')->count(),
            ],
            'projects' => [
                'total' => Project::count(),
                'published' => Project::where('status', 'published')->count(),
            ],
            'comments' => [
                'total' => Comment::count(),
                'pending' => Comment::where('status', 'pending')->count(),
                'approved' => Comment::where('status', 'approved')->count(),
            ],
            'contacts' => [
                'total' => ContactMessage::count(),
                'unread' => ContactMessage::whereNull('read_at')->count(),
            ],
            'newsletter' => [
                'total' => NewsletterSubscriber::count(),
                'active' => NewsletterSubscriber::where('is_active', true)->count(),
            ],
        ]);
    }

    public function recentActivity()
    {
        return response()->json([
            'recent_blogs' => Blog::with('author')->latest()->limit(5)->get(),
            'recent_comments' => Comment::with('blog')->latest()->limit(5)->get(),
            'recent_contacts' => ContactMessage::latest()->limit(5)->get(),
        ]);
    }
}
