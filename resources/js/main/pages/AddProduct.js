import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { AddProductMutaion } from "../../graphql/mutations";
import Swal from "sweetalert2";

export default function AddProduct(props) {
    const [prodData, setProdData] = useState({
        name: "",
        price: 0,
        quantity: 0,
    });
    const [add_prod] = useMutation(AddProductMutaion, {
        onError: (err) => {
            console.log(err);
            Swal.fire(
                "Oops!",
                "une erreur s’est produite ! <br> message:" + err.message,
                "error"
            );
        },
    });
    function handleChange(e) {
        if (e.target.name !== "name") {
            setProdData({
                ...prodData,
                [e.target.name]: parseFloat(e.target.value),
            });
        } else {
            setProdData({ ...prodData, [e.target.name]: e.target.value });
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        add_prod({
            variables: prodData,
            onCompleted: (res) => {
                e.target.reset();
                Swal.fire(
                    "Succès",
                    "Produit est ajouté avec succès",
                    "success"
                );
            },
        });
    }

    return (
        <form
            className="row g-3 needs-validation text-dark"
            onSubmit={(e) => {
                handleSubmit(e);
            }}
        >
            <h5>Nouveau produit</h5>
            <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">
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
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="validationCustom02" className="form-label">
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
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="validationCustom02" className="form-label">
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
                />
            </div>

            <div className="col-12">
                <button className="btn btn-primary float-end " type="submit">
                    Ajouter
                </button>
            </div>
        </form>
    );
}
