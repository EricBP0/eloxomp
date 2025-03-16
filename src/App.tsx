import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.tsx";

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
