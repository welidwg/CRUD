import { gql } from "@apollo/client";

export const AddProductMutaion = gql`
    mutation AddProduct($name: String!, $price: Float!, $quantity: Int) {
        createProduct(name: $name, price: $price, quantity: $quantity) {
            name
        }
    }
`;

export const DeleteProductMutation = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            name
        }
    }
`;

export const updateProductMutation = gql`
    mutation updateProd(
        $id: ID!
        $name: String
        $price: Float
        $quantity: Int
    ) {
        updateProduct(
            id: $id
            name: $name
            price: $price
            quantity: $quantity
        ) {
            name
        }
    }
`;
