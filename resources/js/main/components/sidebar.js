import { NavLink } from "react-router-dom";

export default function Sidebar(props) {
    return (
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a
                    href="/"
                    class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                    <span class="fs-5 d-none d-sm-inline">
                        Product management
                    </span>
                </a>
                <ul
                    class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                    id="menu"
                >
                    <li class="nav-item">
                        <NavLink className={"nav-link  "} to={"/"}>
                            {" "}
                            <span class="ms-1 d-none d-sm-inline">
                                Products list
                            </span>
                        </NavLink>
                    </li>

                    <li class="nav-item">
                        <NavLink className={"nav-link  "} to={"/product/add"}>
                            {" "}
                            <span class="ms-1 d-none d-sm-inline">
                                Add product
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
