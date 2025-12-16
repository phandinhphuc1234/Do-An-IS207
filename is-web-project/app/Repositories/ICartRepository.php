<?php 
namespace App\Repositories;
use App\Models; 
interface ICartRepository
{
    public function getCartInfo($userId);
    public function calculateCartTotalPrice(array $cartItems);
}