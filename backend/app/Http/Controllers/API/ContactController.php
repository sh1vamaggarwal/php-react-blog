<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\ContactFormSubmitted;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Store in database
        $contact = ContactMessage::create($request->only([
            'name', 'email', 'subject', 'message'
        ]));

        // Send email
        try {
            Mail::to(config('mail.from.address'))->send(new ContactFormSubmitted($contact));
        } catch (\Exception $e) {
            // Log error but don't fail the request
            logger()->error('Failed to send contact email: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Your message has been sent successfully. We will get back to you soon.'
        ], 201);
    }
}
