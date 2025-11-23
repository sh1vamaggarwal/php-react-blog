<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactMessage::query();

        if ($request->has('filter')) {
            if ($request->filter === 'unread') {
                $query->unread();
            } elseif ($request->filter === 'read') {
                $query->read();
            }
        }

        $messages = $query->latest()->paginate($request->get('per_page', 20));

        return response()->json($messages);
    }

    public function show($id)
    {
        $message = ContactMessage::findOrFail($id);

        if (!$message->read_at) {
            $message->markAsRead();
        }

        return response()->json($message);
    }

    public function markAsRead($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->markAsRead();

        return response()->json([
            'message' => 'Message marked as read'
        ]);
    }

    public function destroy($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();

        return response()->json([
            'message' => 'Contact message deleted successfully'
        ]);
    }
}
