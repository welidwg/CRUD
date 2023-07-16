import { React } from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Main from "./pages/main";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import AddProduct from "./pages/AddProduct";
import Layout from "./components/layout";
import EditProd from "./pages/EditProd";
const root = ReactDOM.createRoot(document.getElementById("body"));
const link = new createUploadLink({
    uri: "/graphql",
});
const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
});
root.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/product/add" element={<AddProduct />} />
                    <Route path="/product/edit/:id" element={<EditProd />} />
                </Routes>
            </Layout>
        </ApolloProvider>
    </BrowserRouter>
);
