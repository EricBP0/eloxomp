import { useEffect, useState } from "react";
import StepConta from "../components/checkout/StepConta.tsx";
import StepServico from "../components/checkout/StepServico.tsx";
import StepResumo from "../components/checkout/StepResumo.tsx";
import StepPagamento from "../components/checkout/StepPagamento.tsx";
import ProgressBar from "../components/checkout/ProgressBar.tsx";
import {useParams} from "react-router-dom";

const Checkout = () => {
    const [step, setStep] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { orderId } = useParams();
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const orderData = localStorage.getItem(`elojob-order-${orderId}`);
        if (orderData) {
            setOrder(JSON.parse(orderData));
        }
        setIsLoggedIn(!!user);
    }, [orderId]);

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col bg-white items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-purple-700 mb-4">Ops! Pedido não encontrado 😕</h2>
                <p className="text-gray-600 mb-6 max-w-md">
                    Não conseguimos localizar seu pedido. Ele pode ter expirado ou não foi criado corretamente.
                    <br />
                    Você pode iniciar um novo serviço agora mesmo.
                </p>
                <a
                    href="/services"
                    className="px-6 py-3 bg-purple-700 text-white rounded-xl hover:bg-purple-800 transition"
                >
                    Voltar para página de serviços
                </a>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-20 bg-white text-gray-900 px-4 py-10 w-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                {order && (
                    <div>
                        <ProgressBar currentStep={step} />

                        <div className="mt-10">
                            {step === 1 && <StepConta onNext={nextStep} isLoggedIn={isLoggedIn} />}
                            {step === 2 && <StepServico onNext={nextStep} onBack={prevStep} order={order} />}
                            {step === 3 && <StepResumo onNext={nextStep} onBack={prevStep} />}
                            {step === 4 && <StepPagamento onBack={prevStep} />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
