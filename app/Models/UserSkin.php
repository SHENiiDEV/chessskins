<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSkin extends Model
{
    use HasFactory;

    protected $table = 'user_skins';

    protected $fillable = [
        'user_id',
        'skin_id',
        'purchased_at',
    ];

    protected function casts(): array
    {
        return [
            'purchased_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function skin(): BelongsTo
    {
        return $this->belongsTo(Skin::class);
    }
}
