import {Routes, Route} from "react-router-dom"
/*Import pages/ halaman yang akan ditampilkan */
import Home from "../pages/Home"
import Customers from "../pages/Customers"
import CustomerEdit from "../pages/CustomerEdit"
import DataHewan from "../pages/DataHewan"

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/customers" element={<Customers />}/>
            <Route path="/data-hewan" element={<DataHewan />}/>
            <Route path="/edit-customer/:id" element={<CustomerEdit />}/>
        </Routes>
    )
}