<?php

namespace Tests\Feature;

use App\Http\Controllers\PaymentController;
use App\Mail\TopUpReceiptMail;
use App\Models\Transaction;
use App\Models\User;
use App\Services\InvoiceService;
use Database\Seeders\SkinSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoiceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(SkinSeeder::class);
    }

    public function test_invoice_service_generates_valid_pdf(): void
    {
        $user = User::factory()->create([
            'name' => 'Hikaru',
            'surname' => 'Nakamura',
            'address_line_1' => 'Sunrise Blvd 10',
            'city' => 'Miami',
            'country' => 'United States',
            'post_code' => '33101',
        ]);

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'amount' => 1200,
            'type' => 'topup',
            'status' => 'completed',
            'payment_gateway_reference' => 'PG-STRIPE-TEST12345',
        ]);

        $service = app(InvoiceService::class);
        $output = $service->generatePdfOutput($transaction);

        $this->assertNotEmpty($output);
        $this->assertStringStartsWith('%PDF-', $output);
    }

    public function test_user_can_download_their_own_invoice(): void
    {
        $user = User::factory()->create();

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'amount' => 500,
            'type' => 'topup',
            'status' => 'completed',
            'payment_gateway_reference' => 'PG-STRIPE-USER1',
        ]);

        $response = $this->actingAs($user)->get("/invoices/{$transaction->id}/download");

        $response->assertOk();
        $response->assertHeader('content-type', 'application/pdf');
        $this->assertStringContainsString('invoice_PG-STRIPE-USER1.pdf', $response->headers->get('content-disposition'));
    }

    public function test_user_cannot_download_another_users_invoice(): void
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();

        $transaction = Transaction::create([
            'user_id' => $owner->id,
            'amount' => 3000,
            'type' => 'topup',
            'status' => 'completed',
            'payment_gateway_reference' => 'PG-STRIPE-OWNER',
        ]);

        $response = $this->actingAs($intruder)->get("/invoices/{$transaction->id}/download");

        $response->assertForbidden();
    }

    public function test_guest_cannot_download_invoice(): void
    {
        $user = User::factory()->create();

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'amount' => 500,
            'type' => 'topup',
            'status' => 'completed',
            'payment_gateway_reference' => 'PG-STRIPE-GUEST',
        ]);

        $response = $this->get("/invoices/{$transaction->id}/download");

        $response->assertRedirect('/login');
    }

    public function test_topup_receipt_mail_includes_pdf_attachment(): void
    {
        $user = User::factory()->create();
        $package = PaymentController::PACKAGES[0];

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'amount' => $package['coins'],
            'type' => 'topup',
            'status' => 'completed',
            'payment_gateway_reference' => 'PG-STRIPE-ATTACH',
        ]);

        $mail = new TopUpReceiptMail($user, $package, 'PG-STRIPE-ATTACH', $transaction);
        $attachments = $mail->attachments();

        $this->assertCount(1, $attachments);
        $attachment = $attachments[0];

        $this->assertStringContainsString('invoice_PG-STRIPE-ATTACH.pdf', $attachment->as);
    }
}
