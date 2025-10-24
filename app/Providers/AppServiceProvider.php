<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use app\Repositories\CartRepository\CartRepository;
use app\Repositories\OrderRepository\OrderRepository;
use app\Repositories\ProductRepository\ProductRepository;
use app\Repositories\CategoryRepository\CategoryRepository;             
use app\Repositories\ManagerRepository\ManagerRepository;   
use app\Repositories\IOrderRepository\IOrderRepository;
use app\Repositories\ICartRepository\ICartRepository;   
use app\Repositories\IProductRepository\IProductRepository;
use app\Repositories\ICategoryRepository\ICategoryRepository;
use app\Repositories\IManagerRepository\IManagerRepository;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IOrderRepository::class, OrderRepository::class);
        $this->app->bind(ICartRepository::class, CartRepository::class);
        $this->app->bind(IProductRepository::class, ProductRepository::class);
        $this->app->bind(ICategoryRepository::class, CategoryRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
