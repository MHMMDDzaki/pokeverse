import { Link } from "react-router-dom";
import logo from "../assets/pokemon-logo.jpg";

const Navbar = () => {
    return (
        <section>
            <nav className="px-4 sm:px-10 lg:px-20 pb-8 pt-8 flex items-center justify-between">
                <Link
                    to="/"
                    className="font-mono text-3xl font-semibold tracking-wider"
                >
                    POKEVERSE
                </Link>
                <Link to="/computer" className="float-right mr-4 sm:mr-8">
                    <img className="w-12" src={logo} alt="computer" />
                </Link>
            </nav>
        </section>
    );
};

export default Navbar;
