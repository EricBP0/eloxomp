import Footer from "../components/Footer";
import Navbar from "../components/Navbar.tsx";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">
            <Navbar />
            <header className="text-center py-20 pt-32">
                <h1 className="text-4xl font-bold">Bem-vindo ao EloXomp</h1>
                <p className="text-lg mt-4">O melhor serviço de Elojob e Duo Boost</p>
            </header>
            <Footer />
        </div>
    );
};

export default Home;
