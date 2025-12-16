<?php
namespace App\Repositories;
use App\Models;
use App\Repositories\OrderRepository\OrderRepository;
use App\Repositories\CartRepository;         
use App\Repositories\ProductRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\PromotionRepository;
class ManagerRepository
{
    public function __construct()
    {
        $this->cartrepository = new CartRepository();
        $this->productrepository = new ProductRepository();
        $this->categoryrepository = new CategoryRepository();
        $this->promotionrepository = new PromotionRepository();
    }
    public $cartrepository;
    public $productrepository;
    public $categoryrepository;
    public $promotionrepository;
}