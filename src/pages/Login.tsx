import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // aqui vai a chamada da API de login futuramente
        console.log("Login com", email, senha);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200">
                <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">EloXomp</h1>
                <svg href={"/league-of-legends-svg"}/>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            placeholder="********"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-xl transition duration-200"
                    >
                        Entrar
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Não tem uma conta?{" "}
                    <Link to="/cadastro" className="text-purple-700 hover:underline font-medium">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
}
