import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from '../../components/Navbar/Navbar';
import Footer from "../Footer/Footer";


const PageLayOut = () => {
    const handleSearch = (query) => {
       
    };
    return (
        <div>
            <ToastContainer theme="colored" position="top-center" />
            <Navbar onSearch={handleSearch} />
            <Outlet />
            <Footer />
        </div>
    )
}


export default PageLayOut;