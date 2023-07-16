import { useMutation, useQuery } from "@apollo/client";
import Layout from "../components/layout";
import { ProductsQuery } from "../../graphql/queries";
import { DeleteProductMutation } from "../../graphql/mutations";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import EditProd from "./EditProd";

export default function Main(props) {
    const ProductsQ = useQuery(ProductsQuery, {
        variables: { filter: "" },
        pollInterval: 10000,
    });
    const [delete_prod] = useMutation(DeleteProductMutation);
    const [search, setSearch] = useState("");
    function handleDelete(id) {
        delete_prod({
            variables: { id: id },
            onCompleted: (res) => {
                ProductsQ.refetch();
            },
            onError: (err) => {
                console.log(err);
            },
        });
    }
    function handleSearch(e) {
        ProductsQ.refetch({ filter: search });
    }
    var typingTimer;
    var doneTypingInterval = 1000;
    useEffect(() => {
        ProductsQ.refetch();
    }, []);

    return (
        <>
            <div className="row py-4 ">
                <h5 className="col-md-8">Products list</h5>
                <div className=" col-md-4">
                    <div class="mb-3">
                        <input
                            type="text"
                            class="form-control shadow-none"
                            name="search"
                            id=""
                            placeholder="Search"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            onKeyUp={(e) => {
                                clearTimeout(typingTimer);
                                typingTimer = setTimeout(
                                    handleSearch,
                                    doneTypingInterval
                                );
                            }}
                            onKeyDown={() => {
                                clearTimeout(typingTimer);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="container">
                <table class="table text-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Unit price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ProductsQ.loading ? (
                            <div class="d-flex justify-content-center align-items-center">
                                <div
                                    class="spinner-border text-primary spinner-border-sm"
                                    role="status"
                                >
                                    <span class="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        ) : ProductsQ.data.searchProduct != null ? (
                            ProductsQ.data.searchProduct.map((prod, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{prod.id}</th>
                                        <td>{prod.name}</td>
                                        <td>{prod.price}</td>
                                        <td>{prod.quantity}</td>
                                        <td>
                                            <div className="d-flex  flex-row justify-content-start align-items-center">
                                                {" "}
                                                <NavLink
                                                    className="text-primary fw-bold mx-3"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                    to={
                                                        "/product/edit/" +
                                                        prod.id
                                                    }
                                                >
                                                    edit
                                                </NavLink>
                                                <a
                                                    className="text-danger fw-bold fs-4"
                                                    onClick={(e) => {
                                                        handleDelete(prod.id);
                                                    }}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    &times;
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <th>No records</th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
