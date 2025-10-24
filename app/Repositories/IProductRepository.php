<?php


namespace app\Repositories\IProductRepository;
use App\Models;
interface IProductRepository
{
    public function getTitleRecomendedProducts(int $limit, int $last_id = 0);
    public function getTitleProducts(int $limit, int $last_id = 0);
}