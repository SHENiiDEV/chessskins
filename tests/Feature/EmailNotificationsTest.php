<?php

namespace Tests\Feature;

use App\Http\Controllers\PaymentController;
use App\Mail\TopUpReceiptMail;
use App\Mail\WelcomeMail;
use App\Models\User;
use Database\Seeders\SkinSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class EmailNotificationsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(SkinSeeder::class);
    }

    public function test_registration_sends_welcome_email(): void
    {
        Mail::fake();

        $response = $this->post('/register', [
            'name' => 'Alexander',
            'surname' => 'Alekhine',
            'email' => 'alekhine@example.com',
            'password' => 'SecurePass123!',
            'password_confirmation' => 'SecurePass123!',
            'phone' => '+33 1 42 68 55 00',
            'dob' => '1892-10-31',
            'address_line_1' => 'Rue de Rivoli 42',
            'city' => 'Paris',
            'country' => 'France',
            'post_code' => '75001',
            'terms' => 'on',
        ]);

        $response->assertRedirect('/play');

        Mail::assertSent(WelcomeMail::class, function (WelcomeMail $mail) {
            return $mail->hasTo('alekhine@example.com')
                && $mail->user->name === 'Alexander';
        });
    }

    public function test_topup_checkout_sends_topup_receipt_email(): void
    {
        Mail::fake();

        $user = User::factory()->create([
            'wallet_balance' => 100,
            'email' => 'player@example.com',
        ]);

        $response = $this->actingAs($user)->post('/topup/checkout', [
            'package_id' => 'pack_1200',
            'card_number' => '4111 2222 3333 4444',
            'card_exp' => '12/28',
            'card_cvc' => '888',
        ]);

        $response->assertRedirect('/shop');

        Mail::assertSent(TopUpReceiptMail::class, function (TopUpReceiptMail $mail) use ($user) {
            return $mail->hasTo($user->email)
                && $mail->package['coins'] === 1200
                && str_starts_with($mail->reference, 'PG-STRIPE-');
        });
    }

    public function test_welcome_mailable_renders_company_info_and_bonus(): void
    {
        $user = User::factory()->create([
            'name' => 'Magnus',
            'wallet_balance' => 200,
        ]);

        $mailable = new WelcomeMail($user);
        $rendered = $mailable->render();

        $this->assertStringContainsString('Magnus', $rendered);
        $this->assertStringContainsString('+200', $rendered);
        $this->assertStringContainsString(config('company.name'), $rendered);
        $this->assertStringContainsString(config('company.email'), $rendered);
        $this->assertStringContainsString(config('company.number'), $rendered);
    }

    public function test_topup_receipt_mailable_renders_transaction_details(): void
    {
        $user = User::factory()->create([
            'name' => 'Garry',
            'wallet_balance' => 1400,
        ]);

        $package = PaymentController::PACKAGES[1]; // pack_1200
        $reference = 'PG-STRIPE-TESTREF99';

        $mailable = new TopUpReceiptMail($user, $package, $reference);
        $rendered = $mailable->render();

        $this->assertStringContainsString('Garry', $rendered);
        $this->assertStringContainsString('+1,200 Coins', $rendered);
        $this->assertStringContainsString('$10.00 USD', $rendered);
        $this->assertStringContainsString('PG-STRIPE-TESTREF99', $rendered);
        $this->assertStringContainsString(config('company.name'), $rendered);
        $this->assertStringContainsString(config('company.email'), $rendered);
    }
}
