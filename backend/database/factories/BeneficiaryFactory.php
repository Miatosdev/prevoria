<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BeneficiaryFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'account_number' => $this->faker->bankAccountNumber(),
            'bank' => $this->faker->randomElement(['Chase','BoA','Wells Fargo']),
        ];
    }
}
