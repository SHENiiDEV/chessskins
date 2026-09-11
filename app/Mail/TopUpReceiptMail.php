<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TopUpReceiptMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @param  array<string, mixed>  $package
     */
    public function __construct(
        public User $user,
        public array $package,
        public string $reference
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(
                address: config('mail.from.address', config('company.email', 'info@chess-skins.com')),
                name: config('mail.from.name', config('company.name', 'Chess Skins'))
            ),
            subject: 'Payment Receipt: +'.number_format($this->package['coins']).' Coins Credited ['.$this->reference.']',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.topup_receipt',
            with: [
                'user' => $this->user,
                'package' => $this->package,
                'reference' => $this->reference,
                'company' => config('company'),
                'shopUrl' => url('/shop'),
                'profileUrl' => url('/profile'),
            ],
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
}
