<?php

namespace Database\Seeders;

use App\Models\AboutMe;
use App\Models\Blog;
use App\Models\Project;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => env('ADMIN_EMAIL', 'admin@example.com'),
            'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
        ]);

        // Create tags
        $tags = [
            ['name' => 'Laravel', 'slug' => 'laravel', 'color' => '#FF2D20'],
            ['name' => 'React', 'slug' => 'react', 'color' => '#61DAFB'],
            ['name' => 'JavaScript', 'slug' => 'javascript', 'color' => '#F7DF1E'],
            ['name' => 'PHP', 'slug' => 'php', 'color' => '#777BB4'],
            ['name' => 'Web Development', 'slug' => 'web-development', 'color' => '#3B82F6'],
            ['name' => 'Tutorial', 'slug' => 'tutorial', 'color' => '#10B981'],
            ['name' => 'Best Practices', 'slug' => 'best-practices', 'color' => '#8B5CF6'],
            ['name' => 'DevOps', 'slug' => 'devops', 'color' => '#EF4444'],
        ];

        foreach ($tags as $tagData) {
            Tag::create($tagData);
        }

        // Create sample blogs
        $blog1 = Blog::create([
            'title' => 'Getting Started with Laravel 11',
            'slug' => 'getting-started-with-laravel-11',
            'excerpt' => 'Learn the basics of Laravel 11 and build your first application.',
            'content' => "# Getting Started with Laravel 11\n\nLaravel 11 is the latest version of the popular PHP framework. In this tutorial, we'll explore the new features and improvements.\n\n## Installation\n\nTo install Laravel 11, you need PHP 8.2 or higher:\n\n```bash\ncomposer create-project laravel/laravel my-app\n```\n\n## New Features\n\nLaravel 11 introduces several exciting features:\n\n- Improved performance\n- Streamlined application structure\n- Enhanced routing capabilities\n- Better developer experience\n\n## Conclusion\n\nLaravel 11 is a powerful framework that makes web development enjoyable and efficient.",
            'author_id' => $admin->id,
            'status' => 'published',
            'published_at' => now(),
        ]);
        $blog1->tags()->attach([1, 4, 6]);

        $blog2 = Blog::create([
            'title' => 'Building Modern UIs with React',
            'slug' => 'building-modern-uis-with-react',
            'excerpt' => 'Discover how to create beautiful and responsive user interfaces using React.',
            'content' => "# Building Modern UIs with React\n\nReact has revolutionized the way we build user interfaces. Let's explore how to create modern, responsive UIs.\n\n## Component-Based Architecture\n\nReact uses a component-based architecture that promotes reusability:\n\n```jsx\nfunction Button({ children, onClick }) {\n  return (\n    <button onClick={onClick}>\n      {children}\n    </button>\n  );\n}\n```\n\n## State Management\n\nManaging state effectively is crucial for building scalable applications.\n\n## Conclusion\n\nReact provides the tools you need to build amazing user experiences.",
            'author_id' => $admin->id,
            'status' => 'published',
            'published_at' => now()->subDays(2),
        ]);
        $blog2->tags()->attach([2, 3, 5]);

        // Create sample projects
        Project::create([
            'title' => 'E-commerce Platform',
            'slug' => 'ecommerce-platform',
            'description' => 'A full-featured e-commerce platform built with Laravel and React, featuring product management, shopping cart, and payment integration.',
            'project_url' => 'https://example.com',
            'github_url' => 'https://github.com/example/ecommerce',
            'technologies' => ['Laravel', 'React', 'MySQL', 'Stripe'],
            'featured' => true,
            'order' => 1,
            'status' => 'published',
        ]);

        Project::create([
            'title' => 'Task Management System',
            'slug' => 'task-management-system',
            'description' => 'A collaborative task management system with real-time updates, team collaboration features, and advanced filtering.',
            'project_url' => 'https://example.com',
            'github_url' => 'https://github.com/example/tasks',
            'technologies' => ['React', 'Node.js', 'MongoDB', 'Socket.io'],
            'featured' => true,
            'order' => 2,
            'status' => 'published',
        ]);

        // Create About Me
        AboutMe::create([
            'title' => 'About Me',
            'content' => "# Hi, I'm a Full Stack Developer\n\nI'm passionate about building web applications that solve real-world problems. With expertise in both frontend and backend technologies, I create scalable and maintainable solutions.\n\n## My Journey\n\nI started my journey in web development 5 years ago and have been continuously learning and growing since then.\n\n## What I Do\n\n- Full Stack Web Development\n- API Design and Development\n- Database Architecture\n- DevOps and Deployment\n\n## Let's Connect\n\nI'm always interested in hearing about new projects and opportunities.",
            'social_links' => [
                'github' => 'https://github.com/yourusername',
                'linkedin' => 'https://linkedin.com/in/yourusername',
                'twitter' => 'https://twitter.com/yourusername',
            ],
            'skills' => [
                'PHP', 'Laravel', 'JavaScript', 'React', 'Vue.js',
                'Node.js', 'MySQL', 'PostgreSQL', 'Docker', 'AWS'
            ],
        ]);
    }
}
