<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('thumbnail')->nullable();
            $table->string('project_url')->nullable();
            $table->string('github_url')->nullable();
            $table->json('technologies')->nullable(); // ['React', 'Laravel', 'MySQL']
            $table->boolean('featured')->default(false);
            $table->integer('order')->default(0);
            $table->enum('status', ['draft', 'published'])->default('published');
            $table->timestamps();

            $table->index('featured');
            $table->index('order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
