import { Link } from "react-router-dom";
const Navbar = () => {

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-800 w-screen text-white p-4 z-50 drop-shadow-lg">
            <div className="flex justify-start">
                <img className={"w-20 border-4 border-purple-500"} src="/logo_eloxomp.jpeg" alt="logo"/>

                <ul className={`absolute right-4 top-16 bg-gray-900 p-4 rounded-lg shadow-lg "block" md:flex md:static md:bg-transparent md:shadow-none md:space-x-6`}>
                    <li className={"bg-purple-800 rounded-md hover:bg-purple-400"}>
                        <Link to="/" className="block py-2 px-4 hover:text-purple-800">Home</Link>
                    </li>
                    <li className={"bg-purple-800 rounded-md hover:bg-purple-400"}>
                        <Link to="/services" className="block py-2 px-4 hover:text-purple-800">Serviços</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
