<?php


namespace app\Repositories\CartRepository;

use App\Models;
use app\Repositories\ICartRepository\ICartRepository;
use Illuminate\Support\Facades\DB;
class CartRepository implements ICartRepository
{
    public function getCartInfo($userId) {
        $cart = DB::select('
            select p.base_price, p.sale_price, ci.quantity, ci.*, pv.additionnal_price from carts c 
            join cart_items ci on c.cart_id = ci.cart_id
            join products p on ci.product_id = p.product_id
            join product_variants pv on p.variant_id = ci.variant_id
            where c.user_id = :userId
        ', ['userId' => $userId]);
    }
}