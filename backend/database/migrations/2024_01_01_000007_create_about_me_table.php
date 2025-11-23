<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_me', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default('About Me');
            $table->longText('content'); // Markdown content
            $table->string('profile_image')->nullable();
            $table->string('resume_url')->nullable();
            $table->json('social_links')->nullable(); // {github, linkedin, twitter, etc}
            $table->json('skills')->nullable(); // ['PHP', 'React', 'Laravel', etc]
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_me');
    }
};
