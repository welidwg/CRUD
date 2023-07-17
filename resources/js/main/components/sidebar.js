import { NavLink } from "react-router-dom";

export default function Sidebar(props) {
    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a
                    href="/"
                    className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                    <span className="fs-5 d-none d-sm-inline">
                        Gestion des produits
                    </span>
                </a>
                <ul
                    className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                    id="menu"
                >
                    <li className="nav-item">
                        <NavLink className={"nav-link  "} to={"/main/1"}>
                            {" "}
                            <span className="ms-1 d-none d-sm-inline">
                                Listes des produits
                            </span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className={"nav-link  "} to={"/product/add"}>
                            {" "}
                            <span className="ms-1 d-none d-sm-inline">
                                Ajouter un produit
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
