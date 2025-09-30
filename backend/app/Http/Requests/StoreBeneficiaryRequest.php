<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBeneficiaryRequest extends FormRequest
{
    public function authorize(): bool
    {
        // only authenticated users can call (route will use auth:sanctum)
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'account_number' => 'required|string|max:100',
            'bank' => 'nullable|string|max:255',
            'note' => 'nullable|string|max:500',
        ];
    }
}
