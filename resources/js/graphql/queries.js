import { gql } from "@apollo/client";

export const ProductsQuery = gql`
    query ProductsQuery($filter: String!, $first: Int!, $page: Int!) {
        searchproduct(filter: $filter, first: $first, page: $page) {
            data {
                id
                name
                price
                quantity
            }
            paginatorInfo {
                hasMorePages
                total
            }
        }
    }
`;

export const GetProductQuery = gql`
    query GetProductQuery($id: ID!) {
        product(id: $id) {
            id
            name
            price
            quantity
        }
    }
`;
