<?php

namespace App\GraphQL\Queries;

use App\Models\Product;

final class SearchProduct
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $filter = $args["filter"];
        $prods = Product::where("name", "like", "%$filter%")->get();
        return $prods;
    }
}
