<?php

namespace Database\Seeders;

use App\Models\Skin;
use Illuminate\Database\Seeder;

class SkinSeeder extends Seeder
{
    public function run(): void
    {
        $pieceSkins = [
            [
                'name' => 'Classic (Default)',
                'slug' => 'default',
                'type' => 'piece',
                'price_coins' => 0,
                'is_active' => true,
                'description' => 'Academic tournament Staunton piece design with clean traditional contours.',
            ],
            [
                'name' => 'Neon Pulse',
                'slug' => 'neon',
                'type' => 'piece',
                'price_coins' => 600,
                'is_active' => true,
                'description' => 'Electroluminescent neon glow in vivid cyan and magenta cyber tones.',
            ],
            [
                'name' => 'Obsidian & Pearl',
                'slug' => 'obsidian',
                'type' => 'piece',
                'price_coins' => 750,
                'is_active' => true,
                'description' => 'Ultra-luxurious frosted pearl white alongside glossy midnight obsidian and platinum accents.',
            ],
            [
                'name' => 'Medieval Heraldry',
                'slug' => 'medieval',
                'type' => 'piece',
                'price_coins' => 850,
                'is_active' => true,
                'description' => 'Noble feudal royal style featuring crowns, turrets, and heraldic silhouettes.',
            ],
            [
                'name' => 'Steampunk Automaton',
                'slug' => 'steampunk',
                'type' => 'piece',
                'price_coins' => 950,
                'is_active' => true,
                'description' => 'Victorian clockwork machinery with polished brass cogs, rivets, and dark cast-iron bodies.',
            ],
            [
                'name' => '8-Bit Retro Arcade',
                'slug' => 'arcade',
                'type' => 'piece',
                'price_coins' => 1100,
                'is_active' => true,
                'description' => 'Chunky nostalgic pixel-art styling from the golden era of arcade coin-op machines.',
            ],
            [
                'name' => 'Cyberpunk 2099',
                'slug' => 'cyberpunk',
                'type' => 'piece',
                'price_coins' => 1200,
                'is_active' => true,
                'description' => 'Futuristic microcircuit synthwave styling with laser-etched geometry.',
            ],
            [
                'name' => 'Cosmic Galaxy',
                'slug' => 'cosmic',
                'type' => 'piece',
                'price_coins' => 1500,
                'is_active' => true,
                'description' => 'Deep interstellar nebula glow embedded with stardust, glowing constellations, and astral auras.',
            ],
        ];

        $boardSkins = [
            [
                'name' => 'Classic Staunton Wood',
                'slug' => 'board-classic',
                'type' => 'board',
                'price_coins' => 0,
                'is_active' => true,
                'description' => 'Rich natural walnut and ivory tournament wood board.',
            ],
            [
                'name' => 'Cyber Neon Slate',
                'slug' => 'board-neon',
                'type' => 'board',
                'price_coins' => 400,
                'is_active' => true,
                'description' => 'Ultra-dark graphite tiles with radiant cyan electroluminescent square lines.',
            ],
            [
                'name' => 'Obsidian Glass',
                'slug' => 'board-obsidian',
                'type' => 'board',
                'price_coins' => 500,
                'is_active' => true,
                'description' => 'Deep reflective obsidian and frosted pearl crystal glass board.',
            ],
            [
                'name' => 'Royal Heraldry Forest',
                'slug' => 'board-medieval',
                'type' => 'board',
                'price_coins' => 550,
                'is_active' => true,
                'description' => 'Ancient feudal manor board with forest velvet green and ivory marble.',
            ],
            [
                'name' => 'Victorian Brass Parchment',
                'slug' => 'board-steampunk',
                'type' => 'board',
                'price_coins' => 600,
                'is_active' => true,
                'description' => 'Vintage engraved aged parchment with riveted copper edges.',
            ],
            [
                'name' => '8-Bit Arcade Terminal',
                'slug' => 'board-arcade',
                'type' => 'board',
                'price_coins' => 700,
                'is_active' => true,
                'description' => 'Retro CRT scanline palette with neon phosphor highlights.',
            ],
            [
                'name' => 'Cyberpunk Synthwave',
                'slug' => 'board-cyberpunk',
                'type' => 'board',
                'price_coins' => 800,
                'is_active' => true,
                'description' => 'Futuristic laser-lit grid bathed in hot magenta and deep purple haze.',
            ],
            [
                'name' => 'Cosmic Galaxy Stardust',
                'slug' => 'board-cosmic',
                'type' => 'board',
                'price_coins' => 900,
                'is_active' => true,
                'description' => 'Interstellar nebula board with glowing starlight constellations and deep astral violet.',
            ],
        ];

        foreach (array_merge($pieceSkins, $boardSkins) as $skin) {
            Skin::updateOrCreate(['slug' => $skin['slug']], $skin);
        }
    }
}
