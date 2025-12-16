<?php


namespace App\Repositories;
use App\Models;
interface ICategoryRepository
{
    public function getCategoryInfoBySlug(string $slug);
    public function getAllChildSlug();
}