<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BotCombination extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'description',
        'moves_sequence',
        'bot_responses',
    ];

    protected function casts(): array
    {
        return [
            'moves_sequence' => 'array',
            'bot_responses' => 'array',
        ];
    }
}
