import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    EloXomp
                </Link>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="hover:text-blue-400">Home</Link>
                    </li>
                    <li>
                        <Link to="/services" className="hover:text-blue-400">Serviços</Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:text-blue-400">Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
