<?php

namespace Tests\Feature;

use Database\Seeders\SkinSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $this->seed(SkinSeeder::class);

        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /**
     * Test all informational and guide routes return 200 OK.
     */
    public function test_guide_and_information_pages_return_ok(): void
    {
        $this->seed(SkinSeeder::class);

        $this->get('/how-it-works')->assertStatus(200);
        $this->get('/fair-play')->assertStatus(200);
        $this->get('/security')->assertStatus(200);
        $this->get('/faq')->assertStatus(200);
        $this->get('/terms')->assertStatus(200);
        $this->get('/privacy')->assertStatus(200);
    }
}
