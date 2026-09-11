<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'surname',
        'email',
        'password',
        'phone',
        'dob',
        'address_line_1',
        'city',
        'country',
        'post_code',
        'wallet_balance',
        'active_skin_id',
        'active_board_id',
        'terms_accepted_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'dob' => 'date',
            'wallet_balance' => 'integer',
            'terms_accepted_at' => 'datetime',
        ];
    }

    public function activeSkin(): BelongsTo
    {
        return $this->belongsTo(Skin::class, 'active_skin_id');
    }

    public function activeBoard(): BelongsTo
    {
        return $this->belongsTo(Skin::class, 'active_board_id');
    }

    public function skins(): BelongsToMany
    {
        return $this->belongsToMany(Skin::class, 'user_skins')
            ->withPivot('purchased_at')
            ->withTimestamps();
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class)->latest();
    }

    public function ownsSkin(int|Skin $skin): bool
    {
        $skinId = $skin instanceof Skin ? $skin->id : $skin;

        return $this->skins()->where('skin_id', $skinId)->exists();
    }
}
