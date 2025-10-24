<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Cart;
use App\Models\Order;
use app\Repositories\ICartRepository\ICartRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\OrderItem;
class OrderController extends Controller
{
    protected $cartRepository;
    public function __construct(ICartRepository $cartRepository) {
        $this->cartRepository = $cartRepository;
    }   
    public function createOrder(Request $request) {
        $data = $request->validate([
            'city' => 'required|string',
            'district' => 'required|string',
            'ward' => 'required|string',
            'address_type' => 'required|string',
            'address_line1' => 'required|string',
            'address_line2' => 'nullable|string',
            'receiver_name' => 'string',
            'receiver_phone' => 'required|string',
            'notes' => 'nullable|string',
            'promotion_codes' => 'nullable|array',
        ]);
        $promotionCodes = $data['promotion_codes'] ?? [];
        $address = Address::create([
            'user_id' => $request->user()->id,
            'city' => $data['city'],
            'district' => $data['district'],
            'ward' => $data['ward'],
            'address_type' => $data['address_type'],
            'address_line1' => $data['address_line1'],
            'address_line2' => $data['address_line2'] ?? null,
            'receiver_name' => $data['receiver_name'] ?? null,
            'receiver_phone' => $data['receiver_phone'],
            'created_at' => now(),
        ]);
        $cartItems = $this->cartRepository->getCartInfo($request->user()->id);
        Order::create([
            'user_id' => $request->user()->id,
            'status' => 'pending',
            'total_amount' => 0,
            'shipping_address' => $address->address_id,
            'payment_status' => 'pending',
            'created_at' => now(),
            'shipping_fee' => 10,
            'customer_note' => $data['notes'] ?? null,
        ]);
        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id' => $item->order_id,
                'product_id' => $item->product_id,
                'variant_id' => $item->variant_id,
                'quantity' => $item->quantity,
                'created_at' => now(),
                'unit_price' => $item->sale_price + $item->additionnal_price,
                'total_price' => ($item->sale_price + $item->additionnal_price) * $item->quantity,
            ]);
        }
    }
}
