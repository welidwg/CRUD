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
                "An error has accured ! <br> message:" + err.message,
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
                    "Success",
                    "Product was successfully added",
                    "success"
                );
            },
        });
    }

    useEffect(() => {
        console.log(prodData);
    }, [prodData]);
    return (
        <form
            className="row g-3 needs-validation text-dark"
            onSubmit={(e) => {
                handleSubmit(e);
            }}
        >
            <h5>New product</h5>
            <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">
                    Product name
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
                <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-4">
                <label htmlFor="validationCustom02" className="form-label">
                    Unit Price
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
                <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-4">
                <label htmlFor="validationCustom02" className="form-label">
                    Quantity
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
                <div className="valid-feedback">Looks good!</div>
            </div>

            <div className="col-12">
                <button className="btn btn-primary float-end " type="submit">
                    Add
                </button>
            </div>
        </form>
    );
}
