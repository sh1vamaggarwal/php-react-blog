<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'name' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if already subscribed
        $existing = NewsletterSubscriber::where('email', $request->email)->first();

        if ($existing) {
            if ($existing->is_active) {
                return response()->json([
                    'message' => 'You are already subscribed to our newsletter.'
                ], 200);
            } else {
                // Reactivate subscription
                $existing->update([
                    'is_active' => true,
                    'subscribed_at' => now(),
                    'unsubscribed_at' => null,
                ]);

                return response()->json([
                    'message' => 'Your subscription has been reactivated!'
                ], 200);
            }
        }

        NewsletterSubscriber::create([
            'email' => $request->email,
            'name' => $request->name,
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'Thank you for subscribing to our newsletter!'
        ], 201);
    }

    public function unsubscribe($token)
    {
        $subscriber = NewsletterSubscriber::where('token', $token)->firstOrFail();

        if (!$subscriber->is_active) {
            return response()->json([
                'message' => 'You are already unsubscribed.'
            ], 200);
        }

        $subscriber->unsubscribe();

        return response()->json([
            'message' => 'You have been successfully unsubscribed from our newsletter.'
        ], 200);
    }
}
