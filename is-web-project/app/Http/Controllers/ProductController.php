<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Enums\ProductType;
use Illuminate\Support\Facades\DB;
use App\Repositories\IProductRepository;
use App\Repositories\ProductRepository;
use App\Enums\CategoryMap;

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
    public function getProductDetails(Request $request)
    {
        $request->merge($request->route()->parameters());
        $request->validate([
            'product_id' => 'required|integer|min:0',
        ]);

        $product =  $this->productRepository->getProductByID(
            $request->input('product_id')
        );
        return $this->productRepository->calculatePriceForListProductVariants($product);
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

        $parseCsv = function (?string $value): ?array {
            if ($value === null || trim($value) === '') {
                return null;
            }

            return array_values(array_filter(
                array_map('trim', explode(',', $value)),
                fn($v) => $v !== ''
            ));
        };
        return $this->productRepository->searchMobile(
            slug: $childSlug,
            keyword: $request->input('keyword'),
            color: $parseCsv($request->input('color')),
            ram: $parseCsv($request->input('ram')),
            storage: $parseCsv($request->input('storage')),
            processor: $parseCsv($request->input('processor')),
            display: $parseCsv($request->input('display')),
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

        $parseCsv = function (?string $value): ?array {
            if ($value === null || trim($value) === '') {
                return null;
            }

            return array_values(array_filter(
                array_map('trim', explode(',', $value)),
                fn($v) => $v !== ''
            ));
        };

        return $this->productRepository->searchTV(
            slug: $childSlug,
            keyword: $request->input('keyword'),
            resolution: $parseCsv($request->input('resolution')),
            technology: $parseCsv($request->input('technology')),
            processor: $parseCsv($request->input('processor')),
            screenSize: $parseCsv($request->input('screenSize')),
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

        $parseCsv = function (?string $value): ?array {
            if ($value === null || trim($value) === '') {
                return null;
            }

            return array_values(array_filter(
                array_map('trim', explode(',', $value)),
                fn($v) => $v !== ''
            ));
        };

        return $this->productRepository->searchComputing(
            slug: $childSlug,
            keyword: $request->input('keyword'),
            battery: $parseCsv($request->input('battery')),
            graphics: $parseCsv($request->input('graphics')),  // CHANGED: graphic → graphics
            ram: $parseCsv($request->input('ram')),
            storage: $parseCsv($request->input('storage')),
            processor: $parseCsv($request->input('processor')),
            color: $parseCsv($request->input('color')),
            min_price: $request->input('min_price'),
            max_price: $request->input('max_price'),
            last_id: $request->input('last_id', 0),
            limit: $request->input('limit', 20),
            sort: $request->input('sort', 'desc')
        );
    }
}
