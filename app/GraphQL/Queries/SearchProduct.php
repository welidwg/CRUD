<?php

namespace App\GraphQL\Queries;

use App\Models\Product;
use GraphQL\Error\Error;

final class Searchproduct
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $filter = $args["filter"];
            $prods = Product::where("name", "like", "%$filter%")->paginate($args["first"], ['*'], 'page', $args['page']);
            return $prods;
        } catch (\Throwable $th) {
            return new Error($th->getMessage());
        }
    }
}
