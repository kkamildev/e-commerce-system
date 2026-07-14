import type { FC } from "react";

import {BrowserRouter, Routes, Route} from "react-router-dom"
import AdminPanel from "./pages/admin/AdminPanel";
import UsersPanel from "./pages/admin/UsersPanel";
import ConfigPanel from "./pages/admin/ConfigPanel";
import ProductsPanel from "./pages/admin/ProductsPanel";


type Props = {

}

const App : FC<Props> = ({}) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<AdminPanel/>}>
                    <Route index element={<h1>This is a dashboard</h1>}/>
                    <Route path="users" element={<UsersPanel/>}/>
                    <Route path="config" element={<ConfigPanel/>}/>
                    <Route path="products" element={<ProductsPanel/>}/>
                </Route>


                <Route path="/" element={<h1>User Panel</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;