<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutMe extends Model
{
    use HasFactory;

    protected $table = 'about_me';

    protected $fillable = [
        'title',
        'content',
        'profile_image',
        'resume_url',
        'social_links',
        'skills',
    ];

    protected $casts = [
        'social_links' => 'array',
        'skills' => 'array',
    ];
}
