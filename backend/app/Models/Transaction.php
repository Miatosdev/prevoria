<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
    'type',
    'amount',
    'description',
    'merchant',
    'category',
    'status',
    'recipient_account_number',
    'routing_number',
];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
