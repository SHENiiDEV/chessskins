<?php

namespace Tests\Feature;

use App\Models\Skin;
use App\Models\User;
use Database\Seeders\SkinSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthAndKycTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(SkinSeeder::class);
    }

    public function test_user_can_register_with_valid_kyc_and_allowed_country(): void
    {
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
        $this->assertAuthenticated();

        $user = User::where('email', 'alekhine@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals('Alexander', $user->name);
        $this->assertEquals('Alekhine', $user->surname);
        $this->assertEquals('France', $user->country);
        $this->assertEquals(200, $user->wallet_balance);
        $this->assertNotNull($user->terms_accepted_at);
        $this->assertNotNull($user->active_skin_id);

        $defaultSkin = Skin::where('slug', 'default')->first();
        $this->assertTrue($user->ownsSkin($defaultSkin));
    }

    public function test_registration_fails_for_restricted_country(): void
    {
        $excludedCountries = ['Russia', 'Iran', 'Sudan', 'North Korea', 'Belarus'];

        foreach ($excludedCountries as $country) {
            $response = $this->post('/register', [
                'name' => 'Sanctioned',
                'surname' => 'User',
                'email' => "user_{$country}@example.com",
                'password' => 'Password123!',
                'password_confirmation' => 'Password123!',
                'phone' => '+1 555 123456',
                'dob' => '1995-05-15',
                'address_line_1' => 'Main St 1',
                'city' => 'Metropolis',
                'country' => $country,
                'post_code' => '10001',
                'terms' => 'on',
            ]);

            $response->assertSessionHasErrors('country');
            $this->assertDatabaseMissing('users', ['email' => "user_{$country}@example.com"]);
        }
    }

    public function test_registration_fails_without_terms_agreement(): void
    {
        $response = $this->post('/register', [
            'name' => 'John',
            'surname' => 'Doe',
            'email' => 'john.doe@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'phone' => '+1 555 123456',
            'dob' => '1995-05-15',
            'address_line_1' => 'Main St 1',
            'city' => 'Metropolis',
            'country' => 'United States',
            'post_code' => '10001',
            // terms missing
        ]);

        $response->assertSessionHasErrors('terms');
        $this->assertDatabaseMissing('users', ['email' => 'john.doe@example.com']);
    }

    public function test_user_can_login_and_logout(): void
    {
        $user = User::factory()->create([
            'email' => 'grandmaster@test.com',
            'password' => bcrypt('testpassword'),
        ]);

        $response = $this->post('/login', [
            'email' => 'grandmaster@test.com',
            'password' => 'testpassword',
        ]);

        $response->assertRedirect('/play');
        $this->assertAuthenticatedAs($user);

        $logoutResponse = $this->post('/logout');
        $logoutResponse->assertRedirect('/');
        $this->assertGuest();
    }
}
