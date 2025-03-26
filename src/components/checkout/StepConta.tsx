interface Props {
    onNext: () => void;
    isLoggedIn: boolean;
}

export default function StepConta({ onNext, isLoggedIn }: Props) {
    return (
        <div className="text-center">
            {isLoggedIn ? (
                <>
                    <h2 className="text-xl font-semibold text-purple-700">Você já está logado!</h2>
                    <p className="text-gray-700 my-4">Vamos começar seu pedido!</p>
                    <button
                        className="bg-purple-700 text-white px-6 py-2 rounded-xl mt-4 hover:bg-purple-800"
                        onClick={onNext}
                    >
                        Continuar
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-semibold text-red-600">Você precisa estar logado para continuar</h2>
                    <p className="text-gray-600 my-4">Faça login ou crie uma conta antes de seguir com o checkout.</p>
                    <div className={"flex items-center justify-center gap-5"}>
                        <a
                            href="/login"
                            className="inline-block mt-4 bg-purple-700 text-white px-6 py-2 rounded-xl hover:bg-purple-800"
                        >
                            Ir para Login
                        </a>
                        <p className="text-gray-600 mt-4 text-lg"> ou </p>
                        <a
                            href="/cadastro"
                            className="inline-block mt-4 bg-purple-700 text-white px-6 py-2 rounded-xl hover:bg-purple-800"
                        >
                            Cadastre-se agora
                        </a>
                    </div>
                </>
            )}
        </div>
    );
}
