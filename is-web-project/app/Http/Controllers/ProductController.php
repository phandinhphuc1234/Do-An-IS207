<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Enums\ProductType;
use Illuminate\Support\Facades\DB;
use App\Repositories\IProductRepository;
use App\Repositories\ProductRepository;
use App\Enums\CategoryMap;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    private readonly IProductRepository $productRepository;
    public function __construct(IProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }
    public function getRecommendedProducts(Request $request)
    {
        $request->merge($request->route()->parameters());
        $request->validate([
            'limit' => 'nullable|integer|min:0',
            'last_id' => 'integer|min:0',
        ]);
        if ($request->input('last_id') === null) {
            $request->merge(['last_id' => 0]);
        }
        return $this->productRepository->getTitleRecomendedProducts(
            $request->input('limit'),
            $request->input('last_id')
        );
    }
    public function getAllMobiles() {
    try {
        // 1. Lấy các slug thuộc nhóm 'mobile' từ CategoryMap
        $mobileSlugs = array_keys(array_filter(
            \App\Enums\CategoryMap::$childToParent,
            fn($parent) => $parent === 'mobile'
        ));

        // 2. Tìm các sản phẩm thông qua quan hệ 'categories'
        // Cách này sẽ tự động tìm trong bảng product_categories mà không cần cột category_id ở bảng products
        $products = \App\Models\Product::whereHas('categories', function($query) use ($mobileSlugs) {
            $query->whereIn('slug', $mobileSlugs);
        })->get();

        return response()->json($products);

    } catch (\Throwable $e) {
        return response()->json([
            'error' => 'Lỗi truy vấn SQL',
            'details' => $e->getMessage()
        ], 500);
    }
}
public function getProductDetails(Request $request, $product_id) 
{
    // Sử dụng trực tiếp Model Product và dùng first() để chắc chắn trả về 1 Object {}
    // Không dùng Repository ở đây vì nó đang trả về mảng [] gây lỗi React
    $product = \App\Models\Product::with('images')->where('product_id', $product_id)->first();

    if (!$product) {
        return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
    }

    return response()->json($product);
}   

    public function searchAll(Request $request)
    {
        $request->validate([
            'keyword' => 'nullable|string',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'last_id' => 'integer|min:0',
            'limit' => 'integer|min:1|max:100',
            'sort' => 'nullable|string|in:asc,desc,none',
            'child_slugs' => 'nullable|string'
        ]);

        $categories = $this->parseCsv($request->input('child_slugs'));
        if ($categories === null) {
            $categories = array_keys(CategoryMap::$childToParent);
        } else {
            foreach ($categories as $slug) {
                if (!array_key_exists($slug, CategoryMap::$childToParent)) {
                    return response()->json([
                        'message' => "Category slug '$slug' not found"
                    ], 404);
                }
            }
        }

        return $this->productRepository->searchAll(
            keyword: $request->input('keyword'),
            min_price: $request->input('min_price'),
            max_price: $request->input('max_price'),
            last_id: $request->input('last_id', 0),
            limit: $request->input('limit', 20),
            sort: $request->input('sort', 'desc'),
            child_slugs: $categories
        );
    }
    private function parseCsv(?string $value): ?array
    {
        if ($value === null || trim($value) === '') {
            return null;
        }

        return array_values(array_filter(
            array_map('trim', explode(',', $value)),
            fn($v) => $v !== ''
        ));
    }
    public function searchMobile(Request $request)
    {
        $ctpc = CategoryMap::$childToParent;
        $childSlug = $request->route('child_slug');

        if (!isset($ctpc[$childSlug]) || $ctpc[$childSlug] !== 'mobile') {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }

        $request->validate([
            'keyword' => 'nullable|string',
            'color' => 'nullable|string',
            'ram' => 'nullable|string',
            'storage' => 'nullable|string',
            'processor' => 'nullable|string',
            'display' => 'nullable|string',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'last_id' => 'integer|min:0',
            'limit' => 'integer|min:1|max:100',
            'sort' => 'nullable|string|in:asc,desc',
        ]);


        return $this->productRepository->searchMobile(
            slug: $childSlug,
            keyword: $request->input('keyword'),
            color: $this->parseCsv($request->input('color')),
            ram: $this->parseCsv($request->input('ram')),
            storage: $this->parseCsv($request->input('storage')),
            processor: $this->parseCsv($request->input('processor')),
            display: $this->parseCsv($request->input('display')),
            min_price: $request->input('min_price'),
            max_price: $request->input('max_price'),
            last_id: $request->input('last_id', 0),
            limit: $request->input('limit', 20),
            sort: $request->input('sort', 'desc')
        );
    }

    public function searchTVAV(Request $request)
    {
        $ctpc = CategoryMap::$childToParent;
        $childSlug = $request->route('child_slug');

        if (!isset($ctpc[$childSlug]) || $ctpc[$childSlug] !== 'tv-av') {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }

        $request->validate([
            'keyword' => 'nullable|string',
            'resolution' => 'nullable|string',
            'technology' => 'nullable|string',
            'processor' => 'nullable|string',
            'screenSize' => 'nullable|string',  // e.g. "55-inch,65-inch"
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'last_id' => 'integer|min:0',
            'limit' => 'integer|min:1|max:100',
            'sort' => 'nullable|string|in:asc,desc',
        ]);
        return $this->productRepository->searchTV(
            slug: $childSlug,
            keyword: $request->input('keyword'),
            resolution: $this->parseCsv($request->input('resolution')),
            technology: $this->parseCsv($request->input('technology')),
            processor: $this->parseCsv($request->input('processor')),
            screenSize: $this->parseCsv($request->input('screenSize')),
            min_price: $request->input('min_price'),
            max_price: $request->input('max_price'),
            last_id: $request->input('last_id', 0),
            limit: $request->input('limit', 20),
            sort: $request->input('sort', 'desc')
        );
    }
    public function searchComputing(Request $request)
    {
        $ctpc = CategoryMap::$childToParent;
        $childSlug = $request->route('child_slug');

        // Parent category slug – adjust if needed (e.g. 'computing', 'laptops', etc.)
        if (!isset($ctpc[$childSlug]) || $ctpc[$childSlug] !== 'computing-displays') {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }

        $request->validate([
            'keyword'   => 'nullable|string',
            'battery'   => 'nullable|string',
            'graphics'  => 'nullable|string',  // CHANGED: 'graphic' → 'graphics'
            'ram'       => 'nullable|string',
            'storage'   => 'nullable|string',
            'processor' => 'nullable|string',
            'color'     => 'nullable|string',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'last_id'   => 'integer|min:0',
            'limit'     => 'integer|min:1|max:100',
            'sort'      => 'nullable|string|in:asc,desc',
        ]);

        return $this->productRepository->searchComputing(
            slug: $childSlug,
            keyword: $request->input('keyword'),
            battery: $this->parseCsv($request->input('battery')),
            graphics: $this->parseCsv($request->input('graphics')),  // CHANGED: graphic → graphics
            ram: $this->parseCsv($request->input('ram')),
            storage: $this->parseCsv($request->input('storage')),
            processor: $this->parseCsv($request->input('processor')),
            color: $this->parseCsv($request->input('color')),
            min_price: $request->input('min_price'),
            max_price: $request->input('max_price'),
            last_id: $request->input('last_id', 0),
            limit: $request->input('limit', 20),
            sort: $request->input('sort', 'desc')
        );
    }
    // app/Http/Controllers/ProductController.php

public function show($id)
{
    // Phải viết hoa chữ P và đảm bảo đã import Model Product ở đầu file
    $product = Product::with('images')->where('product_id', $id)->first();
    
    return response()->json($product);
}
}
