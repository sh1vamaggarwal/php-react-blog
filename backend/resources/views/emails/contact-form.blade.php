<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4F46E5;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
        }
        .field {
            margin-bottom: 15px;
        }
        .field strong {
            display: inline-block;
            width: 120px;
            color: #555;
        }
        .message-box {
            background-color: white;
            padding: 15px;
            border-left: 4px solid #4F46E5;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
        <div class="field">
            <strong>Name:</strong> {{ $contact->name }}
        </div>
        <div class="field">
            <strong>Email:</strong> <a href="mailto:{{ $contact->email }}">{{ $contact->email }}</a>
        </div>
        @if($contact->subject)
        <div class="field">
            <strong>Subject:</strong> {{ $contact->subject }}
        </div>
        @endif
        <div class="field">
            <strong>Received:</strong> {{ $contact->created_at->format('F j, Y, g:i a') }}
        </div>
        <div class="field">
            <strong>Message:</strong>
            <div class="message-box">
                {{ $contact->message }}
            </div>
        </div>
    </div>
</body>
</html>
