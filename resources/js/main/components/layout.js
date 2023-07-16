import Sidebar from "./sidebar";

export default function Layout(props) {
    return (
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <Sidebar />
                <div class="col p-5">
                    <div className="row p-4 bg-light rounded-3 shadow-sm">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}
