import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 h-full md:w-auto bg-transparent text-white p-4 z-50">
            <div className="flex justify-end">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-white text-3xl p-2 md:hidden"
                >
                    {menuOpen ? <IoClose /> : <IoMenu />}
                </button>
            </div>

            <ul className={`absolute right-4 top-16 bg-gray-900 p-4 rounded-lg shadow-lg ${menuOpen ? "block" : "hidden"} md:flex md:static md:bg-transparent md:shadow-none md:space-x-6`}>
                <li>
                    <Link to="/" className="block py-2 px-4 hover:text-purple-400">Home</Link>
                </li>
                <li>
                    <Link to="/services" className="block py-2 px-4 hover:text-purple-400">Serviços</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
