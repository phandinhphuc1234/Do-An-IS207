<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class AdminController extends Controller
{
    public function is_pay(Request $request)
    {
        $user = $request->user();
        if ($user->email !== 'remembermyname2k5@gmail.com') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access.'
            ], 403);
        }
        $request->merge($request->route()->parameters());
        $request->validate([
            'order_id' => 'required|integer',
        ]);
        $order = Order::where('order_id', $request->input('order_id'))->firstOrFail();

        $order->update([
            'payment_status' => 'paid',
        ]);
        $user = $order->user;
        $point_per_dollar = $user->membershipTier->point_per_dollar ?? 1;
        $received_points = round($order->total_amount * $point_per_dollar / 100);
        $user->update([
            'reward_points' => $order->user->reward_points + $received_points,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Order marked as paid successfully.',
            'received_points' => $received_points,
        ]);
    }
}
