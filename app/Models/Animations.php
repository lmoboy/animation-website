<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Animations extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'params',
        'owner_id'
    ];

}
