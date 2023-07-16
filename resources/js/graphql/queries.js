import { gql } from "@apollo/client";

export const ProductsQuery = gql`
    query ProductsQuery($filter: String!) {
        searchProduct(filter: $filter) {
            id
            name
            price
            quantity
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
