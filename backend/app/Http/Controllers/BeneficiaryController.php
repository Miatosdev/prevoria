<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBeneficiaryRequest;

class BeneficiaryController extends Controller
{
    // GET /api/beneficiaries
    public function index(Request $request)
    {
        $beneficiaries = $request->user()
            ->beneficiaries()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $beneficiaries,
        ]);
    }

    // POST /api/beneficiaries
    public function store(StoreBeneficiaryRequest $request)
    {
        $data = $request->validated();
        $beneficiary = $request->user()->beneficiaries()->create($data);

        return response()->json([
            'success' => true,
            'data' => $beneficiary,
        ], 201);
    }

    // GET /api/beneficiaries/{id}
    public function show(Request $request, $id)
    {
        $beneficiary = $request->user()->beneficiaries()->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $beneficiary,
        ]);
    }

    // PUT/PATCH /api/beneficiaries/{id}
    public function update(StoreBeneficiaryRequest $request, $id)
    {
        $beneficiary = $request->user()->beneficiaries()->findOrFail($id);
        $beneficiary->update($request->validated());

        return response()->json([
            'success' => true,
            'data' => $beneficiary,
        ]);
    }

    // DELETE /api/beneficiaries/{id}
    public function destroy(Request $request, $id)
    {
        $beneficiary = $request->user()->beneficiaries()->findOrFail($id);
        $beneficiary->delete();

        return response()->json([
            'success' => true,
            'message' => 'Beneficiary deleted',
        ]);
    }
}
