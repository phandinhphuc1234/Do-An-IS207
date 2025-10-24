<?php 
namespace app\Repositories\ICartRepository;
use App\Models; 
interface ICartRepository
{
    public function getCartInfo($userId);
}