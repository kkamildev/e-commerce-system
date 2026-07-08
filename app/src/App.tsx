import type { FC } from "react";

import {BrowserRouter, Routes, Route} from "react-router-dom"
import AdminPanel from "./pages/AdminPanel";


type Props = {

}

const App : FC<Props> = ({}) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<AdminPanel/>}/>


                <Route path="/" element={<h1>User Panel</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;