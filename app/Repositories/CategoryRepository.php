<?php


namespace app\Repositories\CategoryRepository;
use App\Models;
use app\Repositories\ICategoryRepository\ICategoryRepository;
use Illuminate\Support\Facades\DB;
class CategoryRepository
{
    public function getCategoryInfoBySlug(string $slug) 
    {
        $result = DB::select('SELECT category_name, image_url FROM products WHERE slug = :slug', ['slug',$slug]);
        return $result;
    }
}