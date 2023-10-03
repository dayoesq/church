<?php

namespace App\Mail;

use App\Models\PasswordResetToken;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class Welcome extends Mailable
{
    use Queueable, SerializesModels;

    public User $user;
    public string $passwordResetToken;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
        $this->getPasswordResetToken();
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome!',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'users.welcome',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    /**
     * Get the password reset token.
     *
     * @return string
     */
    private function getPasswordResetToken(): string
    {
        $passwordResetToken = PasswordResetToken::where('email', $this->user->email)->first();
        return $this->passwordResetToken = $passwordResetToken->token;

    }
}
