import { useMutation, useQuery } from "@apollo/client";
import { ProductsQuery } from "../../graphql/queries";
import { DeleteProductMutation } from "../../graphql/mutations";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

export default function Main(props) {
    const params = useParams("page");
    const page_size = 5;
    const page = parseInt(params.page);

    const ProductsQ = useQuery(ProductsQuery, {
        variables: { filter: "", first: page_size, page: page },
        onCompleted: (res) => {},
        onError: (err) => {
            console.log(err);
        },
    });

    const [delete_prod] = useMutation(DeleteProductMutation);
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

    const [search, setSearch] = useState("");
    function handleSearch(e) {
        ProductsQ.refetch({ filter: search, first: page_size });
    }

    var typingTimer;
    var doneTypingInterval = 1000;

    useEffect(() => {
        ProductsQ.refetch();
    }, []);

    return (
        <>
            <div className="row py-4 ">
                <h5 className="col-md-8">Liste des produits</h5>
                <div className=" col-md-4">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control shadow-none"
                            name="search"
                            id=""
                            placeholder="Recherche"
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
                <table className="table text-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prix unitaire</th>
                            <th scope="col">quantité</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ProductsQ.loading ? (
                            <tr>
                                <td>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div
                                            className="spinner-border text-primary spinner-border-sm"
                                            role="status"
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                        ) : ProductsQ.data != undefined ? (
                            ProductsQ.data.searchproduct.data.length == 0 ? (
                                <tr>
                                    <td>Aucun enregistrement</td>
                                </tr>
                            ) : (
                                ProductsQ.data.searchproduct.data.map(
                                    (prod, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{prod.id}</th>
                                                <td>{prod.name}</td>
                                                <td>{prod.price}</td>
                                                <td>{prod.quantity}</td>
                                                <td>
                                                    <div className="d-flex  flex-row justify-content-start align-items-center">
                                                        <NavLink
                                                            className="text-primary fw-bold mx-3"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                            to={
                                                                "/product/edit/" +
                                                                prod.id
                                                            }
                                                        >
                                                            Modifier
                                                        </NavLink>

                                                        <a
                                                            className="text-danger fw-bold fs-4"
                                                            onClick={(e) => {
                                                                handleDelete(
                                                                    prod.id
                                                                );
                                                            }}
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            &times;
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )
                            )
                        ) : ProductsQ.error ? (
                            <tr>
                                <td> {ProductsQ.error.message} </td>
                            </tr>
                        ) : (
                            <>
                                <tr>
                                    <td> Erreur inconnue </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>

                {/* pagination */}
                {!ProductsQ.loading ? (
                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            <li
                                className={`page-item ${
                                    page == 1 ? "disabled" : ""
                                }`}
                            >
                                <NavLink
                                    className="page-link"
                                    to={`/main/${page - 1}`}
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </NavLink>
                            </li>

                            {(() => {
                                let no =
                                    ProductsQ.data.searchproduct.paginatorInfo
                                        .total / page_size;
                                const items = [];
                                for (let j = 0; j < Math.ceil(no); j++) {
                                    items.push(
                                        <li
                                            key={j}
                                            className={`page-item ${
                                                j + 1 == page ? "active" : ""
                                            }`}
                                        >
                                            <NavLink to={`/main/${j + 1}`}>
                                                <span className="page-link">
                                                    {j + 1}
                                                </span>
                                            </NavLink>
                                        </li>
                                    );
                                }
                                return items;
                            })()}

                            <li className="page-item">
                                <NavLink
                                    className={`page-link ${
                                        ProductsQ.data.searchproduct
                                            .paginatorInfo.hasMorePages
                                            ? ""
                                            : "disabled"
                                    }`}
                                    to={`/main/${page + 1}`}
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
