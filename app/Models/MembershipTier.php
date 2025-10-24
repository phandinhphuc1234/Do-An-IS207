<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MembershipTier extends Model
{
    protected $primaryKey = 'tier_id';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'tier_id',
        'tier_name',
        'min_points',
        'max_points',
        'points_per_dollar',
        'accessory_discount_percent',
        'care_plus_discount_percent',
        'haul_away_discount_percent',
        'free_care_plus_years',
    ];
}
