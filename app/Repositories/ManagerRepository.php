<?php
namespace App\Repositories\ManagerRepository;
use App\Models;
use App\Repositories\OrderRepository\OrderRepository;
use App\Repositories\CartRepository\CartRepository;         
use App\Repositories\ProductRepository\ProductRepository;
use App\Repositories\CategoryRepository\CategoryRepository;
class ManagerRepository
{
    public function __construct()
    {
        $this->orderrepository = new OrderRepository();
        $this->cartrepository = new CartRepository();
        $this->productrepository = new ProductRepository();
        $this->categoryrepository = new CategoryRepository();
    }
    public $orderrepository;
    public $cartrepository;
    public $productrepository;
    public $categoryrepository;
}