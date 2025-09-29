<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    /**
     * List all authenticated user's transactions
     */
    public function index(Request $request)
    {
        return $request->user()
            ->transactions()
            ->latest()
            ->get();
    }

    /**
     * Fund wallet (credit)
     */
    public function fundWallet(Request $request)
    {
        $data = $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        $user = $request->user();

        $transaction = $user->transactions()->create([
            'type' => 'credit',
            'description' => 'Wallet Funding',
            'merchant' => 'Bank Transfer',
            'amount' => $data['amount'],
            'status' => 'completed',
        ]);

        $user->balance += $data['amount'];
        $user->save();

        return response()->json([
            'success' => true,
            'user' => $user,
            'transaction' => $transaction
        ]);
    }

    /**
     * Send money (debit)
     */
    public function sendMoney(Request $request)
    {
        $data = $request->validate([
            'amount' => 'required|numeric|min:1',
            'recipient_account' => 'required|string',
        ]);

        $user = $request->user();

        if ($user->balance < $data['amount']) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient balance'
            ], 400);
        }

        $transaction = $user->transactions()->create([
            'type' => 'debit',
            'description' => 'Transfer to ' . $data['recipient_account'],
            'merchant' => 'P2P Transfer',
            'amount' => $data['amount'],
            'status' => 'completed',
        ]);

        $user->balance -= $data['amount'];
        $user->save();

        return response()->json([
            'success' => true,
            'user' => $user,
            'transaction' => $transaction
        ]);
    }
}
