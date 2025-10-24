<?php


namespace app\Repositories\ICategoryRepository;
use App\Models;
interface ICategoryRepository
{
    public function getCategoryInfoBySlug(string $slug);
    
}