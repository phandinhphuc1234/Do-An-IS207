<?php


namespace app\Repositories\ProductRepository;

use App\Models;
use app\Repositories\IProductRepository\IProductRepository;
use Illuminate\Support\Facades\DB;

class ProductRepository implements IProductRepository
{

    public function getTitleRecomendedProducts(int $limit, int $last_id = 0)
    {
        $products = DB::select('SELECT p.product_name, p.product_id, pi.image_url, pi.alt_text
        FROM products p 
        JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
        WHERE p.is_featured = 1 and p.product_id > :last_id
        LIMIT :limit', ['limit' => $limit, 'last_id' => $last_id]);
        return $products;
    }
    public function getTitleProducts(int $limit, int $last_id = 0)
    {
        $products = DB::select('SELECT p.base_price, p.sale_price, p.product_name, p.product_id, pi.image_url, pi.alt_text
        FROM products p 
        join product_images pi on p.product_id = pi.product_id and pi.is_primary = 1
        where p.product_id > :last_id
        LIMIT :limit', ['limit' => $limit, 'last_id' => $last_id]);
        return $products;
    }
    public function getProductByID(int $product_id) 
    {
        $products = DB::select('
            select p.product_name, p.slug, p.product_id, p.sku, p.brand_id, p.specification,
            p.base_price, p.sale_price, p.stock_quantity, p.weight, p.dimensions, p.review_count,
            p.rating_avg, pv.additional_price, pv.stock_quantity, pv.attributes, pv.variant_id
            from products p 
            join product_variants pv on p.product_id = pv.product_id and pv.product_id = :product_id
        ', ['product_id' => $product_id]);
        if (empty($products)) {
            return null;
        }
        return $products[0];
    }
    public function calculatePriceForListProductVariants(array $products) 
    {
        $totalPrice = 0;
        foreach ($products as &$product) {
            $totalPrice += $product->sale_price + $product->additional_price;
        }
        return $totalPrice;
    }
}
