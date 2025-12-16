<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Promotion;

class UserController extends Controller
{
    public function user(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user(),
        ]);
    }
    public function redeemPoints(Request $request) {
        $validated = $request->validate([
            'points' => 'required|integer|min:100',
        ]);

        $user = $request->user();
        if ($user->reward_points < $validated['points']) {
            return response()->json ([
                'success' => false,
                'message' => 'Insufficient reward points.'
            ], 400);
        }
        
        $user->reward_points -= $validated['points'];
        
        $promotion = Promotion::create([
            'promotion_code' => 'RD' . strtoupper(bin2hex(random_bytes(4))),
            'description' => 'Redeemed promotion',
            'discount_type' => 'fixed_amount',
            'discount_value' => $validated['points'] / 100, 
            'start_date' => now(),
            'end_date' => now()->addMonth(),
            
            'usage_limit' => 1,
        ]);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Points redeemed successfully.',
            'remaining_points' => $user->reward_points,
            'promotion_code' => $promotion->promotion_code,
            'discount_value' => $promotion->discount_value,
        ]);
    }
    public function buyVip(Request $request) {
        $user = $request->user();
        $vipCost = 144; 

        if ($user->reward_points < $vipCost * 100) {
            return response()->json ([
                'success' => false,
                'message' => 'Insufficient reward points to buy VIP status.'
            ], 400);
        }

        $user->reward_points -= $vipCost * 100;
        $user->member_tier_id = 4;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'VIP status purchased successfully.',
            'remaining_points' => $user->reward_points,
            'vip_expiration' => $user->vip_expiration
        ]);
    }
}
