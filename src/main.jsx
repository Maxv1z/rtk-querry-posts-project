import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {BrowserRouter} from "react-router-dom";

import {ApiProvider} from "@reduxjs/toolkit/query/react";
import {apiSlice} from "./features/api/apiSlice.js";
import {extendedApiSlice} from "./features/posts/postsSlice.js";

import {store} from "./app/store.js";

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ApiProvider api={apiSlice}>
                <App />
            </ApiProvider>
        </BrowserRouter>
    </React.StrictMode>
);
