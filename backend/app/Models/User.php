<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'balance',
        'account_number',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'balance' => 'decimal:2',
    ];

    protected $attributes = [
        'balance' => 0.00, // default balance is always 0
    ];

    /**
     * Relationships
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Automatically hash password when set
     */
    public function setPasswordAttribute($value)
    {
        if (!empty($value)) {
            $this->attributes['password'] = Hash::make($value);
        }
    }
public function beneficiaries()
{
    return $this->hasMany(\App\Models\Beneficiary::class);
}

public function accounts()
{
    return $this->hasMany(Account::class);
}

    /**
     * Auto-generate account number when creating a new user
     */
    protected static function booted()
    {
        static::creating(function ($user) {
            if (empty($user->account_number)) {
                $user->account_number = 'AC' . mt_rand(10000000, 99999999);
            }
        });
    }
}
