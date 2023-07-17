import Sidebar from "./sidebar";

export default function Layout(props) {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />
                <div className="col p-5">
                    <div className="row p-4 bg-light rounded-3 shadow-sm">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}
