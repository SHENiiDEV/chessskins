<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Skin extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'price_coins',
        'is_active',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'price_coins' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function scopePiece($query)
    {
        return $query->where('type', 'piece');
    }

    public function scopeBoard($query)
    {
        return $query->where('type', 'board');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_skins')
            ->withPivot('purchased_at')
            ->withTimestamps();
    }
}
