import { useEffect, useState } from "react";
import StepConta from "../components/checkout/StepConta.tsx";
import StepServico from "../components/checkout/StepServico.tsx";
import StepResumo from "../components/checkout/StepResumo.tsx";
import StepPagamento from "../components/checkout/StepPagamento.tsx";
import ProgressBar from "../components/checkout/ProgressBar.tsx";

const Checkout = () => {
    const [step, setStep] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Checar se o usuário está logado
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user);
    }, []);

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen mt-20 bg-white text-gray-900 px-4 py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                <ProgressBar currentStep={step} />

                <div className="mt-10">
                    {step === 1 && <StepConta onNext={nextStep} isLoggedIn={isLoggedIn} />}
                    {step === 2 && <StepServico onNext={nextStep} onBack={prevStep} />}
                    {step === 3 && <StepResumo onNext={nextStep} onBack={prevStep} />}
                    {step === 4 && <StepPagamento onBack={prevStep} />}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
