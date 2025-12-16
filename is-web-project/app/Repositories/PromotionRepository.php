<?php 
namespace App\Repositories;

use App\Models;
use App\Models\Promotion;
use App\Repositories\IPromotionRepository;
use Illuminate\Support\Facades\DB;
class PromotionRepository implements IPromotionRepository {
    public function calculateDiscount(Promotion $promotion, float $amount) {
        $max_discount = $promotion->max_discount_amount ?? PHP_FLOAT_MAX;
        if ($promotion->type === 'percentage') {
            return min($max_discount, $amount * ($promotion->value / 100));
        } elseif ($promotion->type === 'fixed') {
            return min($max_discount, $promotion->value);
        }
        return 0;
    }
}