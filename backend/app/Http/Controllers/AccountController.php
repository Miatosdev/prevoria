<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    // Get all accounts for logged-in user
    public function index(Request $request)
    {
        $accounts = $request->user()->accounts()->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $accounts
        ]);
    }

   // Create new account
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:100',
        'type' => 'required|in:checking,savings,business,wallet',
        'currency' => 'required|string|max:10',
    ]);

    $user = $request->user();

    // check if user has any accounts
    $isPrimary = $user->accounts()->count() === 0;

    $account = $user->accounts()->create([
        'name' => $validated['name'],
        'type' => $validated['type'],
        'currency' => $validated['currency'],
        'balance' => 0,
        'account_number' => 'ACCT-' . strtoupper(uniqid()),
        'status' => 'active',
        'is_primary' => $isPrimary, // first account = primary
    ]);

    return response()->json([
        'success' => true,
        'message' => $isPrimary 
            ? 'Primary account created successfully'
            : 'Account created successfully',
        'data' => $account
    ], 201);
}


    // Show single account
    public function show(Request $request, $id)
    {
        $account = $request->user()->accounts()->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $account
        ]);
    }

    // Update account (e.g., rename or set primary)
    public function update(Request $request, $id)
    {
        $account = $request->user()->accounts()->findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'status' => 'sometimes|in:active,closed,frozen',
            'is_primary' => 'sometimes|boolean',
        ]);

        if (isset($validated['is_primary']) && $validated['is_primary'] == true) {
            // unset other primary accounts
            $request->user()->accounts()->update(['is_primary' => false]);
        }

        $account->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Account updated successfully',
            'data' => $account
        ]);
    }

   // Close account instead of deleting
public function destroy(Request $request, $id)
{
    $account = $request->user()->accounts()->findOrFail($id);

    // If it's the only account, prevent deletion
    if ($request->user()->accounts()->count() === 1) {
        return response()->json([
            'success' => false,
            'message' => 'You cannot close your only account.'
        ], 422);
    }

    // If it's primary, reassign another account as primary
    if ($account->is_primary) {
        $nextAccount = $request->user()->accounts()
            ->where('id', '!=', $account->id)
            ->first();

        if ($nextAccount) {
            $nextAccount->is_primary = true;
            $nextAccount->save();
        }
    }

    // Mark this account as closed (soft-delete)
    $account->status = 'closed';
    $account->is_primary = false;
    $account->save();

    return response()->json([
        'success' => true,
        'message' => 'Account closed successfully',
        'data' => $account
    ]);
}


    public function setPrimary(Request $request, $id)
{
    $user = $request->user();

    // Make sure the account belongs to the user
    $account = $user->accounts()->findOrFail($id);

    // Reset all accounts
    $user->accounts()->update(['is_primary' => false]);

    // Set this account as primary
    $account->is_primary = true;
    $account->save();

    return response()->json([
        'success' => true,
        'message' => 'Primary account updated successfully',
        'data' => $account,
    ]);
}

}
