<?php
namespace App\Repositories;
use App\Models;
use Illuminate\Support\Facades\DB;
use App\Models\Promotion;
interface IPromotionRepository
{
    public function calculateDiscount(Promotion $promotion, float $amount);
}