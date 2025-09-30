<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Beneficiary extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'account_number',
        'bank',
        'note',
    ];

    // optional cast example
    protected $casts = [
        // add casts if needed
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
