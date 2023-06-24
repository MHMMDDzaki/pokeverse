import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/details";
import Navbar from "./pages/navbar";
import Computer from "./pages/computer";

const Routing = () => {

    return (
        <Router>
            <>
                <Navbar />
                <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path="/details/pokemon/:id" element={<Details />} />
                    <Route path="/computer" element={<Computer />} />
                </Routes>
            </>
        </Router>
    )
}

export default Routing