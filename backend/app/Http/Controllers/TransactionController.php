<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    // List all transactions for the logged-in user
    public function index(Request $request)
    {
        $transactions = $request->user()->transactions()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $transactions,
        ]);
    }

    // Create a new transaction (credit or debit)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type'        => 'required|in:credit,debit',
            'amount'      => 'required|numeric|min:0.01',
            'description' => 'required|string|max:255',
            'merchant'    => 'nullable|string|max:255',
            'category'    => 'nullable|string|max:100',
            'recipient_account_number' => 'nullable|string|max:50',
            'routing_number'           => 'nullable|string|max:50',
        ]);

        $user = $request->user();

        return DB::transaction(function () use ($validated, $user) {
            // Lock the user row to prevent race conditions
            $user = User::where('id', $user->id)->lockForUpdate()->first();

            // Handle debit (withdrawal)
            if ($validated['type'] === 'debit') {
                if ($user->balance < $validated['amount']) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Insufficient balance',
                    ], 422);
                }

                $user->balance -= $validated['amount'];
            }

            // Handle credit (deposit)
            if ($validated['type'] === 'credit') {
                $user->balance += $validated['amount'];
            }

            $user->save();

            $transaction = $user->transactions()->create([
                'type'        => $validated['type'],
                'amount'      => $validated['amount'],
                'description' => $validated['description'],
                'merchant'    => $validated['merchant'] ?? null,
                'category'    => $validated['category'] ?? null,
                'recipient_account_number' => $validated['recipient_account_number'] ?? null,
                'routing_number'           => $validated['routing_number'] ?? null,
                'status'      => 'completed',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Transaction successful',
                'data'    => [
                    'transaction' => $transaction,
                    'balance'     => $user->balance,
                ]
            ], 201);
        });
    }

    // Show a single transaction
    public function show(Request $request, $id)
    {
        $transaction = $request->user()->transactions()->findOrFail($id);

        return response()->json([
            'success' => true,
            'data'    => $transaction,
        ]);
    }

    // Reverse a transaction (instead of hard delete)
    public function destroy(Request $request, $id)
    {
        $transaction = $request->user()->transactions()->findOrFail($id);

        // Instead of delete, mark as reversed
        $transaction->status = 'reversed';
        $transaction->save();

        return response()->json([
            'success' => true,
            'message' => 'Transaction reversed successfully',
        ]);
    }
}
