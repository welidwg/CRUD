import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { GetProductQuery } from "../../graphql/queries";
import { useEffect, useState } from "react";
import { updateProductMutation } from "../../graphql/mutations";
import Swal from "sweetalert2";

export default function EditProd() {
    const params = useParams("id");
    const GetProd = useQuery(GetProductQuery, {
        variables: { id: parseInt(params.id) },
        onCompleted: (res) => {
            // console.log(res);
        },
        onError: (err) => {
            console.log(err);
        },
    });
    const [updateData, setUpdateData] = useState({
        id: parseInt(params.id),
        name: "",
        price: 0,
        quantity: 0,
    });

    const [update_prod] = useMutation(updateProductMutation);

    function handleChange(e) {
        if (e.target.name !== "name") {
            setUpdateData({
                ...updateData,
                [e.target.name]: parseFloat(e.target.value),
            });
        } else {
            setUpdateData({ ...updateData, [e.target.name]: e.target.value });
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        update_prod({
            variables: updateData,
            onCompleted: (res) => {
                Swal.fire("Succès!", "Produit enregistré", "success");
            },
            onError: (err) => {
                Swal.fire(
                    "Oops!",
                    "une erreur s’est produite ! <br> message:" + err.message,
                    "error"
                );
            },
        });
    }
    useEffect(() => {
        if (!GetProd.loading) {
            const product = GetProd.data.product;
            setUpdateData({
                ...updateData,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
            });
        }
    }, [GetProd.data]);

    return (
        <form
            className="row g-3 needs-validation text-dark"
            onSubmit={(e) => {
                handleSubmit(e);
            }}
        >
            {GetProd.loading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <div
                        className="spinner-border text-primary spinner-border-sm"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : GetProd.data.product != null ? (
                <>
                    <h5>Modifier {GetProd.data.product.name}</h5>
                    <div className="col-md-4">
                        <label
                            htmlFor="validationCustom01"
                            className="form-label"
                        >
                            Nom du produit
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            required
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            defaultValue={GetProd.data.product.name}
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="col-md-4">
                        <label
                            htmlFor="validationCustom02"
                            className="form-label"
                        >
                            Prix unitaire
                        </label>
                        <input
                            type="number"
                            step={0.01}
                            className="form-control"
                            name="price"
                            required
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            defaultValue={GetProd.data.product.price}
                        />
                    </div>
                    <div className="col-md-4">
                        <label
                            htmlFor="validationCustom02"
                            className="form-label"
                        >
                            quantité
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="quantity"
                            required
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            defaultValue={GetProd.data.product.quantity}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn btn-primary float-end "
                            type="submit"
                        >
                            Enregistrer
                        </button>
                    </div>
                </>
            ) : (
                <> Produit introuvable</>
            )}
        </form>
    );
}
