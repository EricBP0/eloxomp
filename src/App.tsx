import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes";
import Navbar from "./components/deafult/Navbar.tsx";
import Footer from "./components/deafult/Footer.tsx";

function App() {
    return (
        <Router>
            <style href={"/styles/global.css"}/>
            <Navbar />
            <AppRoutes />
            <Footer />
        </Router>
    );
}

export default App;
